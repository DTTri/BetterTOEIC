import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { CompletedTest, Test } from '~/models';
import { CompleteTestDTO } from '~/models/DTOs';
import { testServiceInstance } from '~/services';
import getTestScore from '~/utils/CalculateTestScore';
class TestController {
  async createTest(req: Request, res: Response) {
    try {
      const newTest: Test = {
        ...req.body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        _id: new ObjectId(),
      };
      const result = await testServiceInstance.createTest(newTest);
      if (result) {
        res.status(201).json({
          EM: 'Test created successfully',
          EC: 0,
          DT: newTest,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to create test',
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
  async deleteTest(req: Request, res: Response) {
    try {
      const testId = req.params.testId;
      const result = await testServiceInstance.deleteTest(testId);
      if (result) {
        res.status(200).json({
          EM: 'Test deleted successfully',
          EC: 0,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to delete test',
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
  async getAllTests(req: Request, res: Response) {
    try {
      const tests = await testServiceInstance.getAllTests();
      if (tests) {
        res.status(200).json({
          EM: 'Tests fetched successfully',
          EC: 0,
          DT: tests.map((test) => ({ ...test, _id: test._id?.toString() })),
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch tests',
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
  async getTestById(req: Request, res: Response) {
    try {
      const testId = req.params.testId;
      const test = await testServiceInstance.getTestById(testId);
      if (test) {
        res.status(200).json({
          EM: 'Test fetched successfully',
          EC: 0,
          DT: { ...test, _id: test._id?.toString() },
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch test',
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

  async completeTest(req: Request, res: Response) {
    try {
      const completeTestDTO: CompleteTestDTO = req.body;
      const test = (await testServiceInstance.getTestById(completeTestDTO.testId)) as Test;
      if (!test) {
        res.status(400).json({
          EM: 'Test not found',
          EC: 2,
        });
        return;
      }
      if (completeTestDTO.choices.length !== test.questions.length) {
        res.status(400).json({
          EM: 'Number of choices is not equal to the number of questions',
          EC: 3,
        });
        return;
      }
      const correctAnswersPerPart: number[] = [0, 0, 0, 0, 0, 0, 0];
      test.questions.forEach((question, index) => {
        if (question.correct_choice === completeTestDTO.choices[index]) {
          correctAnswersPerPart[question.part - 1]++;
        }
      });
      const completedTest: CompletedTest = {
        ...completeTestDTO,
        correctAnswersPerPart,
        attempted_at: new Date().toISOString(),
        score: getTestScore(correctAnswersPerPart, test.questions),
      };
      const result = await testServiceInstance.updateTestHistory(req.params.userId, completedTest);
      if (result) {
        res.status(200).json({
          EM: 'Test result saved successfully',
          EC: 0,
          DT: completedTest,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to complete test',
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

  async getTestHistory(req: Request, res: Response) {
    try {
      const testHistory = await testServiceInstance.getTestHistory(req.params.userId);
      if (testHistory) {
        res.status(200).json({
          EM: 'Test history fetched successfully',
          EC: 0,
          DT: testHistory.completedTests,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch test history',
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

  async saveTest(req: Request, res: Response) {
    try {
      const result = await testServiceInstance.updateTestsSaved(req.params.userId, req.body.testId, req.body.unsave);
      if (result) {
        res.status(200).json({
          EM: 'Test saved successfully',
          EC: 0,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to save test',
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

  async getTestsSaved(req: Request, res: Response) {
    try {
      const testsSaved = await testServiceInstance.getTestsSaved(req.params.userId);
      if (testsSaved) {
        res.status(200).json({
          EM: 'Tests saved fetched successfully',
          EC: 0,
          DT: testsSaved.savedTests,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch saved tests',
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
}

const testControllerInstance = new TestController();
export default testControllerInstance;
