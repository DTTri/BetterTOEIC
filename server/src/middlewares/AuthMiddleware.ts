import { Request, Response, NextFunction } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userServiceInstance } from '~/services';
import UserStatus from '~/constants/UserStatus';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || '';
class AuthMiddleware {
  async register(req: Request, res: Response, next: NextFunction) {
    await checkSchema({
      name: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Name is required',
      },
      email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: 'Email is required',
        custom: {
          options: async (email: string) => {
            const user = await userServiceInstance.findUserByEmail(email);
            if (user) {
              if (user.status === UserStatus.PENDING) {
                throw new Error("Your email has been registered but hasn't been verified yet");
              } else throw new Error('Email already exists');
            }
            return true;
          },
        },
      },
      password: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Password is required',
        custom: {
          options: (password: string) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
            if (!passwordRegex.test(password)) {
              throw new Error(
                'Password must contain at least 12 characters, including at least one uppercase letter, one lowercase letter, one number and one special character'
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
  async login(req: Request, res: Response, next: NextFunction) {
    await checkSchema({
      email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: 'Email is required',
        custom: {
          options: async (email: string) => {
            const user = await userServiceInstance.findUserByEmail(email);
            if (user) {
              if (user.status === UserStatus.PENDING) {
                throw new Error("Your email has been registered but hasn't been verified yet");
              }
            } else {
              throw new Error('Email not found');
            }
            return true;
          },
        },
      },
      password: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Password is required',
        custom: {
          options: (password: string) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
            if (!passwordRegex.test(password)) {
              throw new Error(
                'Password must contain at least 12 characters, including at least one uppercase letter, one lowercase letter, one number and one special character'
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
  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.token;
      if (!token) {
        res.status(400).json({
          EM: 'Token is required',
          EC: 1,
        });
      }
      const decodedToken: any = jwt.verify(token, JWT_SECRET);

      const userEmail = decodedToken.email;
      const user = await userServiceInstance.findUserByEmail(userEmail);
      if (!user) {
        res.status(400).json({
          EC: 1,
          EM: 'User not found',
        });
        return;
      }
      if (user.status === UserStatus.ACTIVE) {
        res.status(400).json({
          EC: 2,
          EM: 'Email already verified',
        });
        return;
      }
      if (user.verifiedEmailToken !== token) {
        res.status(400).json({
          EC: 3,
          EM: 'Invalid token',
        });
        return;
      }
      req.body.email = userEmail;
      next();
    } catch (error) {
      res.status(400).json({
        EC: 4,
        EM: 'Invalid token',
      });
      return;
    }
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    await checkSchema({
      email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: 'Email is required',
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
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    await checkSchema({
      newPassword: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Password is required',
        custom: {
          options: (newPassword: string) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
            if (!passwordRegex.test(newPassword)) {
              throw new Error(
                'Password must contain at least 12 characters, including at least one uppercase letter, one lowercase letter, one number and one special character'
              );
            }
            return true;
          },
        },
      },
      confirmNewPassword: {
        notEmpty: true,
        errorMessage: 'Confirm password is required',
        custom: {
          options: (confirmNewPassword: string, { req }) => {
            if (confirmNewPassword !== req.body.newPassword) {
              throw new Error("Passwords don't match");
            }
            return true;
          },
        },
      },

      token: {
        notEmpty: true,
        errorMessage: 'Token is required',
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
    const { token } = req.body;
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;
    const user = await userServiceInstance.findUserByEmail(email);
    if (user) {
      if (user.forgotPasswordToken === token) {
        req.body.email = email;
        next();
      } else {
        res.status(400).json({
          EC: 2,
          EM: 'Invalid token',
        });
        return;
      }
    } else {
      res.status(400).json({
        EC: 3,
        EM: 'User not found',
      });
      return;
    }
  }
  async validateAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({
          EM: 'Access token is required',
          EC: 1,
        });
        return;
      }

      const token = authHeader.split(' ')[1];
      const decoded: any = jwt.verify(token, JWT_SECRET);
      req.body.userId = decoded.userId;
      next();
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({
          EM: 'Access token expired',
          EC: 3,
        });
      } else
        res.status(403).json({
          EM: 'Invalid access token',
          EC: 2,
        });
      return;
    }
  }
  async checkGoogleLoginUser(req: Request, res: Response, next: NextFunction) {
    const { code } = req.query;
    try {
      const data = await userServiceInstance.getOauthGoogleToken(code as string);
      const { id_token } = data;
      const googleUser = await userServiceInstance.getUserByGoogleToken(id_token);
      const user = await userServiceInstance.findUserByEmail(googleUser?.email);
      if (!user) {
        req.body.existUser = false;
        req.body.user = {
          ...googleUser,
          isAdmin: false,
          password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
        };
      } else {
        req.body.existUser = true;
        req.body.user = { ...user };
      }
      next();
    } catch (err: any) {
      res.status(400).json({
        EC: 1,
        EM: err,
      });
      //redirect(`${process.env.APP_URL}/oauth?accessToken=xxx&userId=xxx`);
      return;
    }
  }
}
const authMiddlewareInstance = new AuthMiddleware();
export default authMiddlewareInstance;
