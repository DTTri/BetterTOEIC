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
      _id: {
        isString: true,
        notEmpty: true,
        errorMessage: 'ID is required',
      },
      topicId: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Topic ID is required',
      },
      topicName: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Topic Name is required',
      },
      word: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Word is required',
      },
      meaning_en: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Meaning in English is required',
      },
      meaning_vi: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Meaning in Vietnamese is required',
      },
      image: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Image is required',
      },
      audio: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Audio is required',
      },
      example: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Example is required',
      },
      spelling: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Spelling is required',
      },
      isSaving: {
        isBoolean: true,
        notEmpty: true,
        errorMessage: 'Is saving is required',
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
