import { Request, Response } from 'express';
import { TestHistory, User } from '~/models';
import { testServiceInstance, userServiceInstance } from '~/services';
import getAverageCorrectAnswersPerPart from '~/utils/CalculateAverageCorrectAnswersPerPart';
import getTestScore from '~/utils/CalculateTestScore';
class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userServiceInstance.getAllUsers();
      //   _id: ObjectId;
      // email: string;
      // password: string;
      // name: string;
      // avatar: string;
      // forgotPasswordToken?: string;
      // verifiedEmailToken?: string;
      // status: UserStatus;
      // refreshToken?: string;
      // created_at: string;
      // updated_at: string;
      // isAdmin: boolean;
      if (users) {
        res.status(200).json({
          EC: 0,
          EM: 'Users fetched successfully',
          DT: users.map((user) => ({
            ...user,
            _id: user._id.toString(),
            password: '',
            forgotPasswordToken: '',
            verifiedEmailToken: '',
            refreshToken: '',
          })),
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
  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const user = await userServiceInstance.findUserById(userId);
      if (user) {
        res.status(200).json({
          EC: 0,
          EM: 'User fetched successfully',
          DT: {
            ...user,
            _id: user._id.toString(),
            password: '',
            forgotPasswordToken: '',
            verifiedEmailToken: '',
            refreshToken: '',
          },
        });
      } else {
        res.status(400).json({
          EC: 2,
          EM: 'User not found',
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

  async getTotalUsersPerBand(req: Request, res: Response) {
    const totalUsersPerBand: number[] = [0, 0, 0, 0, 0];
    const userTestHistories = (await testServiceInstance.getAllTestHistories()) as TestHistory[];
    userTestHistories.forEach((userTestHistory) => {
      const avgScore = getTestScore(getAverageCorrectAnswersPerPart(userTestHistory.completedTests));
      if (avgScore < 215) {
        totalUsersPerBand[0]++;
      } else if (avgScore < 465) {
        totalUsersPerBand[1]++;
      } else if (avgScore < 725) {
        totalUsersPerBand[2]++;
      } else if (avgScore < 855) {
        totalUsersPerBand[3]++;
      } else {
        totalUsersPerBand[4]++;
      }
    });
    res.status(200).json({
      EC: 0,
      EM: 'Total users per band fetched successfully',
      DT: totalUsersPerBand,
    });
  }
  async changePassword(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const currentUser = await userServiceInstance.findUserById(userId);
      if (!currentUser) {
        res.status(400).json({
          EC: 1,
          EM: 'User not found',
        });
        return;
      }
      const { oldPassword, newPassword } = req.body;
      if (oldPassword === newPassword) {
        res.status(400).json({
          EC: 2,
          EM: 'Old password and new password must be different',
        });
        return;
      }
      const user = await userServiceInstance.findUserWithPassword(currentUser.email, oldPassword);
      if (!user) {
        res.status(400).json({
          EC: 3,
          EM: 'Old password is incorrect',
        });
        return;
      }
      await userServiceInstance.updateUserPassword(currentUser.email, newPassword);

      res.status(200).json({
        EC: 0,
        EM: 'Password changed successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        EC: 4,
        EM: error.message,
      });
    }
  }
}
const userControllerInstance = new UserController();
export default userControllerInstance;
