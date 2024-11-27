import { ObjectId } from 'mongodb';

type User = {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  isAdmin: boolean;
};
export default User;
