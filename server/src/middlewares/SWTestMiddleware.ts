import { Request, Response, NextFunction } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { SWTest } from '~/models';
import { CreateSWTestDTO, CompleteSWTestDTO } from '~/models/DTOs';

class SWTestMiddleware {
  async createSWTest(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
      title: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Title is required',
      },
      description: {
        isString: true,
        errorMessage: 'Description is required',
      },
      created_by: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Created by is required',
      },
      questions: {
        isArray: true,
        errorMessage: 'Questions is required',
      },
      difficulty: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Difficulty is required',
      },
    }).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        EM:
          'Validation errors: ' +
          errors
            .array()
            .map((error) => error.msg)
            .join(', '),
        EC: 1,
        DT: errors.array(),
      });
      return;
    }
    next();
  }

  async completeSWTest(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
      testId: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Test ID is required',
      },
      answers: {
        isArray: true,
        errorMessage: 'Answers are required',
      },
    }).run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        EM:
          'Validation errors: ' +
          errors
            .array()
            .map((error) => error.msg)
            .join(', '),
        EC: 1,
        DT: errors.array(),
      });
      return;
    }
    next();
  }
}

const swTestMiddlewareInstance = new SWTestMiddleware();
export default swTestMiddlewareInstance;
