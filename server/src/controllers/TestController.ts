import { Request, Response } from 'express';
import { testServiceInstance } from '~/services';
class TestController {
  async createTest(req: Request, res: Response) {
    try {
      const test = await testServiceInstance.createTest(req.body);
      if (test) {
        res.status(201).json({
          EM: 'Test created successfully',
          EC: 0,
          DT: { ...test, _id: test._id?.toString() },
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
}

const testControllerInstance = new TestController();
export default testControllerInstance;
