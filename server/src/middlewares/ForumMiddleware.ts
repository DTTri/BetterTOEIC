import { NextFunction, Request, Response } from 'express';
import { check, checkSchema, validationResult } from 'express-validator';

class ForumMiddleware {
  async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
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
  async createComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
        content: {
            isString: true,
            notEmpty: true,
            errorMessage: 'Content is required',
        }
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
  async likePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
        userId: {
            isString: true,
            notEmpty: true,
            errorMessage: 'User ID is required',
        },
        isLike: {
          isBoolean: true,
          notEmpty: true,
          errorMessage: 'isLike is required',
        }
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
  async likeComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
      userId: {
            isString: true,
            notEmpty: true,
            errorMessage: 'User ID is required',
        },
      isLike: {
        isBoolean: true,
        notEmpty: true,
        errorMessage: 'isLike is required',
      }
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

export const forumMiddlewareInstance = new ForumMiddleware();