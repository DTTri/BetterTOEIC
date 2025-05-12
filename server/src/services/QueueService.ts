import Bull from 'bull';
import { ObjectId } from 'mongodb';
import { collections } from '~/config/connectDB';
import { SWTest } from '~/models';
import s3Service from './S3Service';
import redisService from './RedisService';

import huggingFaceService from './HuggingFaceService';

class QueueService {
  private evaluationQueue: Bull.Queue | null = null;
  private isQueueEnabled = true;
  private queueInitialized = false;

  constructor() {
    this.isQueueEnabled = process.env.REDIS_ENABLED !== 'false';

    if (this.isQueueEnabled) {
      try {
        this.evaluationQueue = new Bull('sw-test-evaluation', {
          redis: process.env.REDIS_URL || 'redis://localhost:6379',
          defaultJobOptions: {
            attempts: 3,
            backoff: {
              type: 'exponential',
              delay: 1000,
            },
            removeOnComplete: true,
          },
        });

        this.evaluationQueue.on('error', (error: any) => {
          console.error('Queue error:', error);
          if (error.code === 'ECONNREFUSED') {
            console.warn('Redis connection failed. Queue processing disabled.');
            this.isQueueEnabled = false;
          }
        });

        this.setupProcessors();
        this.queueInitialized = true;
      } catch (error) {
        console.error('Error initializing queue:', error);
        this.isQueueEnabled = false;
        this.evaluationQueue = null;
      }
    } else {
      console.log('Queue processing is disabled by configuration.');
    }
  }

  private setupProcessors() {
    if (!this.evaluationQueue) return;

    this.evaluationQueue.process(async (job) => {
      const { userId, testId, contentKey, attemptId } = job.data;

      try {
        console.log(`Processing evaluation for test ${testId} by user ${userId}`);

        const testContent = await s3Service.getTestContent(contentKey);

        if (!attemptId) {
          throw new Error(`No attemptId found for test ${testId} content`);
        }

        const testDoc = await collections.swTests?.findOne({ _id: new ObjectId(testId.toString()) });
        if (!testDoc) {
          throw new Error(`Test not found: ${testId}`);
        }

        const test = testDoc as unknown as SWTest;

        const { evaluations, sampleAnswers, scores } = await huggingFaceService.evaluateSWTest(
          test,
          testContent.answers
        );

        const updatedContent = {
          ...testContent,
          evaluations,
          sampleAnswers,
          updated_at: new Date().toISOString(),
        };

        await s3Service.uploadTestContent(userId, updatedContent);

        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        const averageScore = totalScore / scores.length;

        const date = new Date(testContent.created_at);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        await collections.swTestHistoryPartitions?.updateOne(
          {
            userId: new ObjectId(userId.toString()),
            year,
            month,
            tests: {
              $elemMatch: {
                testId: testId,
                attemptId: attemptId,
              },
            },
          },
          {
            $set: {
              'tests.$[elem].scores': scores,
              'tests.$[elem].totalScore': totalScore,
              'tests.$[elem].averageScore': averageScore,
              updated_at: new Date().toISOString(),
            },
          },
          {
            arrayFilters: [{ 'elem.testId': testId, 'elem.attemptId': attemptId }],
          }
        );

        await redisService.invalidateTestCache(userId, testId);

        console.log(`Completed evaluation for test ${testId} by user ${userId}`);
        return { success: true, testId };
      } catch (error) {
        console.error('Error processing test evaluation:', error);
        throw error;
      }
    });
  }

  private isQueueAvailable(): boolean {
    return this.isQueueEnabled && this.evaluationQueue !== null;
  }

  async queueTestEvaluation(userId: string, testId: string, contentKey: string, attemptId: string): Promise<void> {
    if (!this.isQueueAvailable()) {
      console.log(`Queue disabled. Skipping evaluation for test ${testId} by user ${userId}`);
      await this.evaluateTestSynchronously(userId, testId, contentKey, attemptId);
      return;
    }

    await this.evaluationQueue!.add({
      userId,
      testId,
      contentKey,
      attemptId,
    });
    console.log(`Queued evaluation for test ${testId} by user ${userId}`);
  }

  private async evaluateTestSynchronously(
    userId: string,
    testId: string,
    contentKey: string,
    attemptId: string
  ): Promise<void> {
    try {
      console.log(`Processing evaluation synchronously for test ${testId} by user ${userId}`);

      const testContent = await s3Service.getTestContent(contentKey);
      const testDoc = await collections.swTests?.findOne({ _id: new ObjectId(testId.toString()) });
      if (!testDoc) {
        throw new Error(`Test not found: ${testId}`);
      }

      const test = testDoc as unknown as SWTest;

      const { evaluations, sampleAnswers, scores } = await huggingFaceService.evaluateSWTest(test, testContent.answers);

      const updatedContent = {
        ...testContent,
        evaluations,
        sampleAnswers,
        updated_at: new Date().toISOString(),
      };

      await s3Service.uploadTestContent(userId, updatedContent);

      const totalScore = scores.reduce((sum, score) => sum + score, 0);
      const averageScore = totalScore / scores.length;

      const date = new Date(testContent.created_at);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      await collections.swTestHistoryPartitions?.updateOne(
        {
          userId: new ObjectId(userId.toString()),
          year,
          month,
          tests: {
            $elemMatch: {
              testId: testId,
              attemptId: attemptId,
            },
          },
        },
        {
          $set: {
            'tests.$[elem].scores': scores,
            'tests.$[elem].totalScore': totalScore,
            'tests.$[elem].averageScore': averageScore,
            updated_at: new Date().toISOString(),
          },
        },
        {
          arrayFilters: [{ 'elem.testId': testId, 'elem.attemptId': attemptId }],
        }
      );

      console.log(`Completed synchronous evaluation for test ${testId} by user ${userId}`);
    } catch (error) {
      console.error('Error processing synchronous evaluation:', error);
    }
  }

  async getQueueStats(): Promise<any> {
    if (!this.isQueueAvailable()) {
      return {
        waiting: 0,
        active: 0,
        completed: 0,
        failed: 0,
        total: 0,
        queueDisabled: true,
      };
    }

    const [waiting, active, completed, failed] = await Promise.all([
      this.evaluationQueue!.getWaitingCount(),
      this.evaluationQueue!.getActiveCount(),
      this.evaluationQueue!.getCompletedCount(),
      this.evaluationQueue!.getFailedCount(),
    ]);

    return {
      waiting,
      active,
      completed,
      failed,
      total: waiting + active,
    };
  }
}

const queueServiceInstance = new QueueService();
export default queueServiceInstance;
