import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { SWTest, SWCompletedTest } from '~/models';
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

      const completedTest: SWCompletedTest = {
        ...completeSWTestDTO,
        attempted_at: new Date().toISOString(),
      };
      // call hunggingface api to get evaluations, sampleAnswers, and scores

      const result = await swTestServiceInstance.updateSWTestHistory(req.params.userId, completedTest);
      if (result) {
        res.status(200).json({
          EM: 'SW Test result saved successfully',
          EC: 0,
          DT: completedTest,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to complete SW Test',
          EC: 4,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 4,
      });
    }
  }

  async getSWTestHistory(req: Request, res: Response) {
    try {
      const swTestHistory = await swTestServiceInstance.getSWTestHistory(req.params.userId);
      if (swTestHistory) {
        res.status(200).json({
          EM: 'SW Test history fetched successfully',
          EC: 0,
          DT: swTestHistory.completedTests,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch SW Test history',
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

  async updateSWTestEvaluation(req: Request, res: Response) {
    try {
      const { testId, evaluations, sampleAnswers, scores } = req.body;

      if (!testId || !evaluations || !sampleAnswers || !scores) {
        res.status(400).json({
          EM: 'Missing required fields',
          EC: 1,
        });
        return;
      }

      const result = await swTestServiceInstance.updateSWTestEvaluation(
        req.params.userId,
        testId,
        evaluations,
        sampleAnswers,
        scores
      );

      if (result) {
        res.status(200).json({
          EM: 'SW Test evaluation updated successfully',
          EC: 0,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to update SW Test evaluation',
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
}

const swTestControllerInstance = new SWTestController();
export default swTestControllerInstance;
