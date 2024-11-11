import { NextFunction, Request, Response } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { CreatePracticeTestDTO, CompletePracticeTestDTO } from '~/models/DTOs';

class PracticeMiddleware {
  async createPracticeTest(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
      part: {
        isInt: true,
        notEmpty: true,
        errorMessage: 'Part is required',
      },
      questions: {
        isArray: true,
        errorMessage: 'Questions is required',
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
    const newPracticeTest: CreatePracticeTestDTO = req.body as CreatePracticeTestDTO;
    if (newPracticeTest.part < 5 && (newPracticeTest.main_audio === null || newPracticeTest.main_audio === '')) {
      res.status(400).json({
        EM: 'Main audio is required',
        EC: 1,
      });
      return;
    }
    next();
  }

  async completePracticeTest(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
      practiceTestId: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Practice test id is required',
      },
      choices: {
        isArray: true,
        errorMessage: 'Answers is required',
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

  async createPracticeLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
      part: {
        isInt: true,
        notEmpty: true,
        errorMessage: 'Part is required',
      },
      title: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Title is required',
      },
      content: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Content is required',
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

  async completePracticeLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
    const practiceLessonId = req.body.practiceLessonId;
    if (!practiceLessonId) {
      res.status(400).json({
        EM: 'Practice lesson id is required',
        EC: 1,
      });
      return;
    }
    next();
  }
}

const practiceMiddlewareInstance = new PracticeMiddleware();

export default practiceMiddlewareInstance;
