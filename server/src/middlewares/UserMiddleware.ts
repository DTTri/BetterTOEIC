import { Request, Response, NextFunction } from 'express';
import { checkSchema, validationResult } from 'express-validator';
class UserMiddleware {
  async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    await checkSchema({
      oldPassword: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Old password is required',
        custom: {
          options: (password: string) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
            if (!passwordRegex.test(password)) {
              throw new Error(
                'Old password must contain at least 12 characters, including at least one uppercase letter, one lowercase letter, one number and one special character'
              );
            }
            return true;
          },
        },
      },
      newPassword: {
        isString: true,
        notEmpty: true,
        errorMessage: 'New password is required',
        custom: {
          options: (password: string) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
            if (!passwordRegex.test(password)) {
              throw new Error(
                'New password must contain at least 12 characters, including at least one uppercase letter, one lowercase letter, one number and one special character'
              );
            }
            return true;
          },
        },
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

const UserMiddlewareInstance = new UserMiddleware();
export default UserMiddlewareInstance;
