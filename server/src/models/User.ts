import { ObjectId } from 'mongodb';
import UserStatus from '~/constants/UserStatus';

type User = {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  avatar: string;
  forgotPasswordToken?: string;
  verifiedEmailToken?: string;
  status: UserStatus;
  refreshToken?: string;
  created_at: string;
  updated_at: string;
  isAdmin: boolean;
};
export default User;
