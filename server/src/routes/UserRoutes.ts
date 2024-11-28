import { Router } from 'express';
import { authMiddlewareInstance } from '~/middlewares';
import { authControllerInstance } from '~/controllers';
const authRouter = Router();
authRouter.post('/register', authMiddlewareInstance.register, authControllerInstance.register);
authRouter.post('/login', authMiddlewareInstance.login, authControllerInstance.login);
authRouter.post('/google-login', authControllerInstance.googleLogin);
authRouter.post('/forgot-password', authMiddlewareInstance.forgotPassword, authControllerInstance.forgotPassword);
authRouter.post('/reset-password', authMiddlewareInstance.resetPassword, authControllerInstance.resetPassword);
authRouter.post('/verify-email', authMiddlewareInstance.verifyEmail, authControllerInstance.verify);
authRouter.post('/refresh-token', authControllerInstance.refreshAccessToken);

// Protected routes
authRouter.post(
  '/send-verification-email',

  authControllerInstance.sendVerificationEmail
);

export default authRouter;
