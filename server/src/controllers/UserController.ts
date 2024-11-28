import { Request, Response } from 'express';
import { User } from '~/models';
import { userServiceInstance } from '~/services';
class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userServiceInstance.getAllUsers();
      if (users) {
        res.status(200).json({
          EC: 0,
          EM: 'Users fetched successfully',
          DT: users,
        });
      } else {
        res.status(400).json({
          EC: 2,
          EM: 'Failed to fetch users',
        });
      }
    } catch (error: any) {
      res.status(500).json({
        EC: 1,
        EM: error.message,
      });
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const currentUser = await userServiceInstance.findUserById(userId);
      if (!currentUser) {
        res.status(400).json({
          EC: 1,
          EM: 'User not found',
        });
      } else {
        const { name, avatar } = req.body;
        if (!name || !avatar || name === '' || avatar === '') {
          res.status(400).json({
            EC: 2,
            EM: 'Name and avatar are required',
          });
          return;
        }
        const user: User = {
          ...currentUser,
          name,
          avatar,
          updated_at: new Date().toISOString(),
        };
        await userServiceInstance.updateUserInfo(user);
        res.status(200).json({
          EC: 0,
          EM: 'User updated successfully',
        });
      }
    } catch (error: any) {
      res.status(500).json({
        EC: 3,
        EM: error.message,
      });
    }
  }
}
const userControllerInstance = new UserController();
export default userControllerInstance;
