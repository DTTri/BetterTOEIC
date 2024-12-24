import { Router } from 'express';
import { userControllerInstance } from '~/controllers';
import UserMiddlewareInstance from '~/middlewares/UserMiddleware';

const userRouter = Router();
userRouter.get('/', userControllerInstance.getAllUsers);
userRouter.get('/:userId', userControllerInstance.getUserById);
userRouter.put('/:userId', userControllerInstance.updateUser);
userRouter.get('/totalUsersPerBand', userControllerInstance.getTotalUsersPerBand);
userRouter.put(
  '/change-password/:userId',
  UserMiddlewareInstance.changePassword,
  userControllerInstance.changePassword
);
export default userRouter;
