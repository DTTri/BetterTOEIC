import { NextFunction, Request, Response } from 'express';
import { check, checkSchema, validationResult } from 'express-validator';

class VocabMiddleware {
  async createVocabTopic(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
      name: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Name is required',
      },
      vocabs: {
        isArray: true,
        errorMessage: 'Vocabs is required',
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

  async completeVocabTopic(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
      topicId: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Topic ID is required',
      },
      completedVocabs: {
        isArray: true,
        errorMessage: 'Completed vocabs is required',
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
  async saveVocab(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
      vocabId: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Vocab ID is required',
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
const vocabMiddlewareInstance = new VocabMiddleware();
export default vocabMiddlewareInstance;
