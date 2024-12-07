import http from "./http";

class UserService {
  baseURI = "user";
  private getURI(uri: string) {
    return `${this.baseURI}/${uri}`;
  }
  async getUsers() {
    return await http.get(this.getURI(""));
  }

  async updateUser(id: string, data: object) {
    return await http.put(this.getURI(id), data);
  }

  async getTotalUsersPerBand() {
    return await http.get(this.getURI("totalUsersPerBand"));
  }
  async changePassword(id: string, data: object) {
    return await http.put(this.getURI(`change-password/${id}`), data);
  }
  // userRouter.put('/change-password/userId', UserMiddlewareInstance.changePassword, userControllerInstance.changePassword);
}
const userService = new UserService();
export default userService;

// import { Router } from 'express';
// import { userControllerInstance } from '~/controllers';

// const userRouter = Router();
// userRouter.get('/', userControllerInstance.getAllUsers);
// userRouter.patch('/:userId', userControllerInstance.updateUser);
// userRouter.get('/totalUsersPerBand', userControllerInstance.getTotalUsersPerBand);
// export default userRouter;
