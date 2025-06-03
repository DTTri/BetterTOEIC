import { ObjectId } from 'mongodb';
import { collections } from '~/config/connectDB';
import { SWTest, SWTestMetadata, SWTestHistoryPartition, SWTestContent } from '~/models';
import s3Service from './S3Service';
import redisService from './RedisService';
import queueService from './QueueService';

class SWTestService {
  async createSWTest(swTest: SWTest): Promise<string | null> {
    try {
      const result = await collections.swTests?.insertOne(swTest);
      return result?.insertedId.toString() || null;
    } catch (error) {
      console.error('Error creating SW test:', error);
      return null;
    }
  }

  async deleteSWTest(swTestId: string): Promise<boolean> {
    try {
      const result = await collections.swTests?.deleteOne({ _id: new ObjectId(swTestId.toString()) });
      return result?.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting SW test:', error);
      return false;
    }
  }

  async getAllSWTests(): Promise<SWTest[]> {
    try {
      const tests = await collections.swTests?.find({}).toArray();
      return (tests as SWTest[]) || [];
    } catch (error) {
      console.error('Error getting all SW tests:', error);
      return [];
    }
  }

  async getSWTestById(swTestId: string): Promise<SWTest | null> {
    try {
      const test = await collections.swTests?.findOne({ _id: new ObjectId(swTestId.toString()) });
      return (test as SWTest) || null;
    } catch (error) {
      console.error('Error getting SW test by ID:', error);
      return null;
    }
  }

  async completeSWTest(
    userId: string,
    testId: string,
    speakingAudioBlobs: Buffer[],
    writingAnswers: string[]
  ): Promise<boolean> {
    try {
      console.log(`Completing test ${testId} for user ${userId}`);

      const audioUploadPromises = speakingAudioBlobs.map((blob, index) =>
        s3Service.uploadAudio(userId, testId, index + 1, blob)
      );

      const audioUrls = await Promise.all(audioUploadPromises);
      console.log(`Uploaded ${audioUrls.length} audio files to S3`);

      const answers = [...audioUrls, ...writingAnswers];

      const attemptId = new ObjectId().toString();

      const testContent: SWTestContent = {
        testId,
        userId,
        answers,
        evaluations: [],
        sampleAnswers: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const contentKey = await s3Service.uploadTestContent(userId, testContent);
      console.log(`Uploaded test content to S3 with key ${contentKey}`);

      const testMetadata: SWTestMetadata = {
        testId,
        attemptId,
        contentKey,
        scores: [],
        totalScore: 0,
        averageScore: 0,
        attempted_at: new Date().toISOString(),
      };

      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const partition = await collections.swTestHistoryPartitions?.findOne({
        userId: new ObjectId(userId.toString()),
        year,
        month,
      });

      if (partition) {
        await collections.swTestHistoryPartitions?.updateOne(
          { userId: new ObjectId(userId.toString()), year, month },
          {
            $push: { tests: testMetadata } as any,
            $set: { updated_at: new Date().toISOString() },
          }
        );
        console.log(`Updated existing partition for year ${year}, month ${month}`);
      } else {
        const newPartition: SWTestHistoryPartition = {
          userId: new ObjectId(userId.toString()),
          year,
          month,
          tests: [testMetadata],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        await collections.swTestHistoryPartitions?.insertOne(newPartition);
        console.log(`Created new partition for year ${year}, month ${month}`);
      }

      console.log(`Updated MongoDB partition for year ${year}, month ${month}`);

      await queueService.queueTestEvaluation(userId, testId, contentKey, attemptId);

      return true;
    } catch (error) {
      console.error('Error completing SW test');
      return false;
    }
  }

  async getSWTestHistory(userId: string, page = 1, limit = 10): Promise<any> {
    try {
      const cachedHistory = await redisService.getUserHistory(userId, page, limit);
      if (cachedHistory) {
        console.log(`Retrieved test history for user ${userId} from cache`);
        return cachedHistory;
      }

      const skip = (page - 1) * limit;

      const partitions =
        ((await collections.swTestHistoryPartitions
          ?.find({ userId: new ObjectId(userId.toString()) })
          .toArray()) as SWTestHistoryPartition[]) || [];

      if (partitions.length === 0) {
        return {
          tests: [],
          pagination: {
            currentPage: page,
            totalPages: 0,
            totalItems: 0,
            hasNextPage: false,
            hasPrevPage: false,
          },
        };
      }

      let allTests: SWTestMetadata[] = [];
      partitions.forEach((partition) => {
        allTests = [...allTests, ...partition.tests];
      });

      allTests.sort((a, b) => new Date(b.attempted_at).getTime() - new Date(a.attempted_at).getTime());

      const paginatedTests = allTests.slice(skip, skip + limit);

      const testsWithDetails = await Promise.all(
        paginatedTests.map(async (test) => {
          if (test.scores && test.scores.length > 0) {
            try {
              let content = await redisService.getTestContent(userId, test.testId);

              if (!content) {
                content = await s3Service.getTestContent(test.contentKey);
                await redisService.cacheTestContent(userId, test.testId, content);
              }
              const testWithoutContentKey = { ...test, contentKey: undefined };
              return {
                ...testWithoutContentKey,
                evaluations: content.evaluations,
                sampleAnswers: content.sampleAnswers,
                answers: content.answers,
              };
            } catch (error) {
              console.error(`Error getting content for test ${test.testId}:`, error);
              return test;
            }
          }
          return test;
        })
      );

      const totalTests = allTests.length;
      const totalPages = Math.ceil(totalTests / limit);

      const result = {
        tests: testsWithDetails,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalTests,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
      console.log(`Retrieved test history for user ${userId} from MongoDB`);

      await redisService.cacheUserHistory(userId, page, limit, result);

      return result;
    } catch (error) {
      console.error('Error getting SW test history:', error);
      return { tests: [], pagination: { currentPage: page, totalPages: 0, totalItems: 0 } };
    }
  }

  async getCompletedTest(userId: string, testId: string, attemptId?: string): Promise<any> {
    try {
      console.log(`Getting completed test for user ${userId}, test ${testId}, attempt ${attemptId || 'latest'}`);

      if (attemptId) {
        const cacheKey = `test:${userId}:${testId}:${attemptId}`;
        const cachedTest = await redisService.get(cacheKey);

        if (cachedTest) {
          console.log(`Retrieved test from Redis cache with key ${cacheKey}`);
          return JSON.parse(cachedTest);
        }

        const partitions =
          ((await collections.swTestHistoryPartitions
            ?.find({
              userId: new ObjectId(userId.toString()),
              tests: {
                $elemMatch: {
                  testId: testId,
                  attemptId: attemptId,
                },
              },
            })
            .toArray()) as SWTestHistoryPartition[]) || [];

        if (partitions.length === 0) {
          console.log(`No partitions found for user ${userId}, test ${testId}, attempt ${attemptId}`);
          return null;
        }

        let testMetadata = null;
        for (const partition of partitions) {
          const test = partition.tests.find((t) => t.testId === testId && t.attemptId === attemptId);
          if (test) {
            testMetadata = test;
            break;
          }
        }

        if (!testMetadata) {
          console.log(`No test metadata found for user ${userId}, test ${testId}, attempt ${attemptId}`);
          return null;
        }

        const content = await s3Service.getTestContent(testMetadata.contentKey);

        const testDoc = await collections.swTests?.findOne({ _id: new ObjectId(testId.toString()) });
        const test = testDoc as unknown as SWTest;

        const result = {
          ...testMetadata,
          content,
          questions: test?.questions || [],
        };

        await redisService.set(cacheKey, JSON.stringify(result), 3600); // 1 hour

        return result;
      } else {
        const cachedTest = await redisService.getTestMetadata(userId, testId);
        let testMetadata = cachedTest;

        if (!testMetadata) {
          const partitions =
            ((await collections.swTestHistoryPartitions
              ?.find({ userId: new ObjectId(userId.toString()), 'tests.testId': testId })
              .toArray()) as SWTestHistoryPartition[]) || [];

          if (partitions.length === 0) {
            return null;
          }

          let latestTest = null;
          for (const partition of partitions) {
            const testsForThisId = partition.tests.filter((t) => t.testId === testId);
            if (testsForThisId.length > 0) {
              const sortedTests = testsForThisId.sort(
                (a, b) => new Date(b.attempted_at).getTime() - new Date(a.attempted_at).getTime()
              );

              if (
                !latestTest ||
                new Date(sortedTests[0].attempted_at).getTime() > new Date(latestTest.attempted_at).getTime()
              ) {
                latestTest = sortedTests[0];
              }
            }
          }

          testMetadata = latestTest;

          if (!testMetadata) {
            return null;
          }

          await redisService.cacheTestMetadata(userId, testId, testMetadata);
        }

        let content = await redisService.getTestContent(userId, testId);

        if (!content) {
          content = await s3Service.getTestContent(testMetadata.contentKey);
          await redisService.cacheTestContent(userId, testId, content);
        }

        const testDoc = await collections.swTests?.findOne({ _id: new ObjectId(testId.toString()) });
        const test = testDoc as unknown as SWTest;

        return {
          ...testMetadata,
          content,
          questions: test?.questions || [],
        };
      }
    } catch (error) {
      console.error('Error getting completed test:', error);
      return null;
    }
  }

  async getUserStatistics(userId: string): Promise<any> {
    try {
      const cachedStats = await redisService.getUserStats(userId);
      if (cachedStats) {
        return cachedStats;
      }

      const partitions =
        ((await collections.swTestHistoryPartitions
          ?.find({ userId: new ObjectId(userId.toString()) })
          .toArray()) as SWTestHistoryPartition[]) || [];

      if (partitions.length === 0) {
        return {
          totalTests: 0,
          averageScore: 0,
          highestScore: 0,
          recentTests: [],
        };
      }

      let allTests: SWTestMetadata[] = [];
      partitions.forEach((partition) => {
        allTests = [...allTests, ...partition.tests];
      });

      const totalTests = allTests.length;

      let totalScore = 0;
      let highestScore = 0;

      allTests.forEach((test) => {
        if (test.totalScore) {
          totalScore += test.totalScore;
          highestScore = Math.max(highestScore, test.totalScore);
        }
      });

      const averageScore = totalTests > 0 ? totalScore / totalTests : 0;

      const recentTests = allTests
        .sort((a, b) => new Date(b.attempted_at).getTime() - new Date(a.attempted_at).getTime())
        .slice(0, 5);

      const stats = {
        totalTests,
        averageScore,
        highestScore,
        recentTests,
      };

      await redisService.cacheUserStats(userId, stats);

      return stats;
    } catch (error) {
      console.error('Error getting user statistics:', error);
      return {
        totalTests: 0,
        completedTests: 0,
        averageScore: 0,
        highestScore: 0,
        recentTests: [],
      };
    }
  }
}

const swTestServiceInstance = new SWTestService();
export default swTestServiceInstance;
