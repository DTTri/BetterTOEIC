import { Request, Response, NextFunction } from 'express';
import { checkSchema, validationResult } from 'express-validator';

class TestMiddleware {
  async createTest(req: Request, res: Response, next: NextFunction): Promise<void> {
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
      main_audio: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Main audio is required',
      },
      created_by: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Created by is required',
      },
      isMiniTest: {
        isBoolean: true,
        errorMessage: 'Is mini test is required',
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
    const { isMiniTest, questions } = req.body;
    if (isMiniTest === false) {
      let invalidTestFormat = false;
      if (questions.length !== 200) {
        invalidTestFormat = true;
      }
      // TOEIC test format: 200 questions
      // part 1: 6 questions, part 2: 25 questions, part 3: 39 questions, part 4: 30 questions, part 5: 30 questions, part 6: 16 questions, part 7: 54 questions
      else {
        for (let i = 0; i < 200; i++) {
          if (i < 6 && questions[i].part !== 1) {
            invalidTestFormat = true;
            break;
          } else if (i >= 6 && i < 31 && questions[i].part !== 2) {
            invalidTestFormat = true;
            break;
          } else if (i >= 31 && i < 70 && questions[i].part !== 3) {
            invalidTestFormat = true;
            break;
          } else if (i >= 70 && i < 100 && questions[i].part !== 4) {
            invalidTestFormat = true;
            break;
          } else if (i >= 100 && i < 130 && questions[i].part !== 5) {
            invalidTestFormat = true;
            break;
          } else if (i >= 130 && i < 146 && questions[i].part !== 6) {
            invalidTestFormat = true;
            break;
          } else if (i >= 146 && i < 200 && questions[i].part !== 7) {
            invalidTestFormat = true;
            break;
          }
        }
      }
      if (invalidTestFormat) {
        res.status(400).json({
          EM: 'Invalid test format',
          EC: 2,
        });
        return;
      }
    }
    next();
  }

  async deleteTest(req: Request, res: Response, next: NextFunction): Promise<void> {
    const testId = req.params.testId;
    if (!testId) {
      res.status(400).json({
        EM: 'Test ID is required',
        EC: 1,
      });
      return;
    }
    next();
  }

  async getTestById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const testId = req.params.testId;
    if (!testId) {
      res.status(400).json({
        EM: 'Test ID is required',
        EC: 1,
      });
      return;
    }
    next();
  }
}

const testMiddlewareInstance = new TestMiddleware();
export default testMiddlewareInstance;
