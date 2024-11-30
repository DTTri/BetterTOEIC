import { Router } from 'express';
import { userControllerInstance } from '~/controllers';

const userRouter = Router();
userRouter.get('/', userControllerInstance.getAllUsers);
userRouter.put('/:userId', userControllerInstance.updateUser);
userRouter.get('/totalUsersPerBand', userControllerInstance.getTotalUsersPerBand);
export default userRouter;
