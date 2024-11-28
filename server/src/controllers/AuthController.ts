import { ObjectId } from 'mongodb';
import UserStatus from '~/constants/UserStatus';
import { User } from '~/models';
import { userServiceInstance } from '~/services';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || '';
class AuthController {
  async register(req: Request, res: Response) {
    try {
      console.log('Register request body:', req.body);
      const newUser: User = {
        ...req.body,
        _id: new ObjectId(),
        avatar:
          'https://static.vecteezy.com/system/resources/thumbnails/013/360/247/small/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg',
        status: UserStatus.PENDING,
        verifiedEmailToken: '',
        forgotPasswordToken: '',
        refreshToken: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        isAdmin: false,
      };

      const hashedPassword: string = await bcrypt.hash(newUser.password, 10);
      const verifiedEmailToken = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: '1d' });
      newUser.password = hashedPassword;
      newUser.verifiedEmailToken = verifiedEmailToken;
      const result = await userServiceInstance.addUser(newUser);
      if (result) {
        //await AuthenticationServiceInstance.sendEmail(user);

        res.status(201).json({
          EC: 0,
          EM: 'User registered successfully. Please check your email to verify your account',
          DT: newUser._id,
        });
      } else {
        res.status(400).json({
          EC: 2,
          EM: 'Internal server error',
        });
      }
    } catch (error: any) {
      res.status(400).json({
        EC: 3,
        EM: error.message,
      });
    }
  }
  async sendVerificationEmail(req: Request, res: Response) {
    try {
      const userId = req.body._id;
      const user = await userServiceInstance.findUserById(userId);
      if (user) {
        if (user.status === UserStatus.PENDING) {
          await userServiceInstance.sendEmail(user);
          res.status(200).json({
            EC: 0,
            EM: 'Verification email sent successfully',
          });
        } else {
          res.status(400).json({
            EC: 1,
            EM: 'Email already verified',
          });
        }
      } else {
        res.status(400).json({
          EC: 2,
          EM: 'User not found',
        });
      }
    } catch (error: any) {
      res.status(400).json({
        EC: 3,
        EM: error.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      console.log('Login request body:', req.body);
      const { email, password } = req.body;
      const user = await userServiceInstance.findUserWithPassword(email, password);
      if (user) {
        //accesstoken last for 15 minutes
        //refreshtoken last for 1 year
        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1y' });
        await userServiceInstance.updateLoginTokens(email, refreshToken);
        user.refreshToken = '';
        const { password, ...userWithoutPassword } = user;
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
          EC: 0,
          EM: 'Login successful',
          DT: {
            ...userWithoutPassword,
            accessToken,
          },
        });
      } else {
        res.status(400).json({
          EC: 2,
          EM: 'Password is incorrect',
        });
      }
    } catch (error: any) {
      res.status(400).json({
        EC: 3,
        EM: error.message,
      });
    }
  }
  async googleLogin(req: Request, res: Response) {
    try {
      console.log('Google login request body:', req.body);
      const { email } = req.body;
      const user = await userServiceInstance.findUserByEmail(email);
      if (!user) {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword: string = await bcrypt.hash(generatedPassword, 10);
        const newUser: User = {
          name: req.body.name,
          email,
          password: hashedPassword,
          status: UserStatus.ACTIVE,
          avatar: req.body.profileImg,
          verifiedEmailToken: '',
          forgotPasswordToken: '',
          refreshToken: '',
          _id: new ObjectId(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          isAdmin: false,
        };
        const result = await userServiceInstance.addUser(newUser);
        if (!result) {
          res.status(400).json({
            EC: 1,
            EM: 'Internal server error',
          });
        }
      }
      if (user) {
        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1y' });
        await userServiceInstance.updateLoginTokens(email, refreshToken);
        const { password, ...userWithoutPassword } = user;
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          // 1 year
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
          EC: 0,
          EM: 'Login successful',
          DT: {
            ...userWithoutPassword,
            accessToken,
          },
        });
      } else {
        res.status(400).json({
          EC: 2,
          EM: 'Internal server error',
        });
      }
    } catch (error: any) {
      res.status(400).json({
        EC: 3,
        EM: error.message,
      });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const user = await userServiceInstance.findUserByEmail(email);
      if (user) {
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
        await userServiceInstance.sendResetPasswordEmail(email, token);
        res.status(200).json({
          EC: 0,
          EM: 'Reset password email sent successfully',
        });
      } else {
        res.status(400).json({
          EC: 2,
          EM: 'User not found',
        });
      }
    } catch (error: any) {
      res.status(400).json({
        EC: 3,
        EM: error.message,
      });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { email, newPassword } = req.body;
      const user = await userServiceInstance.findUserByEmail(email);
      if (user) {
        await Promise.all([
          userServiceInstance.updateUserPassword(email, newPassword),
          userServiceInstance.deleteForgotPasswordToken(email),
        ]);

        res.status(200).json({
          EC: 0,
          EM: 'Password reset successfully',
        });
      } else {
        res.status(400).json({
          EC: 2,
          EM: 'User not found',
        });
      }
    } catch (error: any) {
      res.status(400).json({
        EC: 3,
        EM: error.message,
      });
    }
  }
  async verify(req: Request, res: Response) {
    try {
      const email = req.body.email;
      await userServiceInstance.updateUserStatus(email);
      res.status(200).json({
        EC: 0,
        EM: 'Email verified successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        EC: 2,
        EM: error.message,
      });
    }
  }
  async refreshAccessToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        res.status(401).json({
          EM: 'Refresh token is required',
          EC: 1,
        });
      } else {
        const decoded: any = jwt.verify(refreshToken, JWT_SECRET);
        const userId = decoded.userId;

        const user = await userServiceInstance.findUserById(userId);
        if (!user || user.refreshToken !== refreshToken) {
          res.status(403).json({
            EM: 'Invalid refresh token',
            EC: 2,
          });
        } else {
          const newAccessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15m' });

          res.status(200).json({
            EC: 0,
            EM: 'Access token refreshed successfully',
            DT: { accessToken: newAccessToken },
          });
        }
      }
    } catch (error: any) {
      res.status(403).json({
        EM: 'Invalid refresh token',
        EC: 3,
      });
    }
  }
}
const authControllerInstance = new AuthController();
export default authControllerInstance;
