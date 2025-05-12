import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { SWTest } from '~/models';
import { CompleteSWTestDTO } from '~/models/DTOs';
import { swTestServiceInstance } from '~/services';

class SWTestController {
  async createSWTest(req: Request, res: Response) {
    try {
      const newSWTest: SWTest = {
        ...req.body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        _id: new ObjectId(),
      };
      const result = await swTestServiceInstance.createSWTest(newSWTest);
      if (result) {
        res.status(201).json({
          EM: 'SW Test created successfully',
          EC: 0,
          DT: newSWTest,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to create SW Test',
          EC: 3,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 4,
      });
    }
  }

  async deleteSWTest(req: Request, res: Response) {
    try {
      const swTestId = req.params.swTestId;
      const result = await swTestServiceInstance.deleteSWTest(swTestId);
      if (result) {
        res.status(200).json({
          EM: 'SW Test deleted successfully',
          EC: 0,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to delete SW Test',
          EC: 2,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 3,
      });
    }
  }

  async getAllSWTests(req: Request, res: Response) {
    try {
      const swTests = await swTestServiceInstance.getAllSWTests();
      if (swTests) {
        res.status(200).json({
          EM: 'SW Tests fetched successfully',
          EC: 0,
          DT: swTests.map((test) => ({ ...test, _id: test._id?.toString() })),
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch SW Tests',
          EC: 1,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 2,
      });
    }
  }

  async getSWTestById(req: Request, res: Response) {
    try {
      const swTestId = req.params.swTestId;
      const swTest = await swTestServiceInstance.getSWTestById(swTestId);
      if (swTest) {
        res.status(200).json({
          EM: 'SW Test fetched successfully',
          EC: 0,
          DT: { ...swTest, _id: swTest._id?.toString() },
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch SW Test',
          EC: 2,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 3,
      });
    }
  }

  async completeSWTest(req: Request, res: Response) {
    try {
      const completeSWTestDTO: CompleteSWTestDTO = req.body;
      const swTest = await swTestServiceInstance.getSWTestById(completeSWTestDTO.testId);
      if (!swTest) {
        res.status(400).json({
          EM: 'SW Test not found',
          EC: 2,
        });
        return;
      }

      const speakingAudioBlobs: Buffer[] = [];
      const writingAnswers: string[] = [];

      completeSWTestDTO.answers.forEach((answer, index) => {
        if (index < 11) {
          if (typeof answer === 'string' && answer.startsWith('data:audio')) {
            const base64Data = answer.split(',')[1];
            const audioBuffer = Buffer.from(base64Data, 'base64');
            speakingAudioBlobs.push(audioBuffer);
          } else {
            speakingAudioBlobs.push(Buffer.from(answer));
          }
        } else {
          writingAnswers.push(answer);
        }
      });

      const result = await swTestServiceInstance.completeSWTest(
        req.params.userId,
        completeSWTestDTO.testId,
        speakingAudioBlobs,
        writingAnswers
      );

      if (result) {
        res.status(200).json({
          EM: 'SW Test submitted successfully and queued for evaluation',
          EC: 0,
          DT: {},
        });
      } else {
        res.status(400).json({
          EM: 'Failed to submit SW Test',
          EC: 4,
        });
      }
    } catch (err: any) {
      console.error('Error in completeSWTest:', err);
      res.status(500).json({
        EM: err.message,
        EC: 4,
      });
    }
  }

  async getSWTestHistory(req: Request, res: Response) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const swTestHistory = await swTestServiceInstance.getSWTestHistory(req.params.userId, page, limit);

      res.status(200).json({
        EM: 'SW Test history fetched successfully',
        EC: 0,
        DT: swTestHistory,
      });
    } catch (err: any) {
      console.error('Error in getSWTestHistory:', err);
      res.status(500).json({
        EM: err.message,
        EC: 2,
      });
    }
  }

  async getUserStatistics(req: Request, res: Response) {
    try {
      const stats = await swTestServiceInstance.getUserStatistics(req.params.userId);

      res.status(200).json({
        EM: 'User statistics fetched successfully',
        EC: 0,
        DT: stats,
      });
    } catch (err: any) {
      console.error('Error in getUserStatistics:', err);
      res.status(500).json({
        EM: err.message,
        EC: 2,
      });
    }
  }

  async getCompletedTest(req: Request, res: Response) {
    try {
      const { userId, testId, attemptId } = req.params;

      const completedTest = await swTestServiceInstance.getCompletedTest(userId, testId, attemptId);

      if (completedTest) {
        res.status(200).json({
          EM: 'Completed test fetched successfully',
          EC: 0,
          DT: completedTest,
        });
      } else {
        res.status(404).json({
          EM: 'Completed test not found',
          EC: 1,
        });
      }
    } catch (err: any) {
      console.error('Error in getCompletedTest:', err);
      res.status(500).json({
        EM: err.message,
        EC: 2,
      });
    }
  }
}

const swTestControllerInstance = new SWTestController();
export default swTestControllerInstance;
