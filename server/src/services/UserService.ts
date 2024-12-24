import { collections } from '~/config/connectDB';
import { User } from '~/models';
import { sendForgotPasswordEmail, sendVerificationEmail } from '~/utils/Mailer';
import bcrypt from 'bcrypt';
import UserStatus from '~/constants/UserStatus';
import { ObjectId } from 'mongodb';
import { decodeStringUTF8 } from '~/utils/decodeUTF8';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
class UserService {
  async addUser(user: User): Promise<boolean> {
    const result = await collections.users?.insertOne(user);
    return result ? true : false;
  }
  async sendResetPasswordEmail(email: string, forgotPasswordToken: string): Promise<void> {
    await collections.users?.updateOne({ email }, { $set: { forgotPasswordToken } });
    await sendForgotPasswordEmail(email, forgotPasswordToken);
  }

  async sendEmail(user: User): Promise<void> {
    await sendVerificationEmail(user.email, user.verifiedEmailToken as string, user.name);
  }

  async findUserWithPassword(email: string, password: string): Promise<User | null> {
    const user = (await collections.users?.findOne({ email })) as User;
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
  async updateLoginTokens(email: string, refreshToken: string): Promise<void> {
    await collections.users?.updateOne({ email }, { $set: { refreshToken } });
  }

  async updateUserStatus(email: string): Promise<void> {
    await collections.users?.updateOne({ email }, { $set: { status: UserStatus.ACTIVE, verifiedEmailToken: '' } });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return (await collections.users?.findOne({ email })) as User;
  }

  async findUserById(id: string): Promise<User | null> {
    return (await collections.users?.findOne({ _id: new ObjectId(id) })) as User;
  }
  async updateUserPassword(email: string, password: string): Promise<void> {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    await collections.users?.updateOne({ email }, { $set: { password: hashedPassword } });
  }
  async deleteForgotPasswordToken(email: string): Promise<void> {
    await collections.users?.updateOne({ email }, { $set: { forgotPasswordToken: '' } });
  }

  async checkUserStatus(email: string): Promise<UserStatus | null> {
    const user = (await collections.users?.findOne({ email })) as User;
    if (user) {
      return user.status;
    }
    return null;
  }

  async getAllUsers(): Promise<User[]> {
    const users = (await collections.users?.find().toArray()) as User[];
    return users;
  }
  async updateUserInfo(user: User): Promise<void> {
    await collections.users?.updateOne({ email: user.email }, { $set: user });
  }
  async getOauthGoogleToken(code: string) {
    const body = {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    };
    console.log(body);
    const { data } = await axios.post('https://oauth2.googleapis.com/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log(data);
    return data;
  }
  async getUserByGoogleToken(token: string) {
    console.log(token);
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    const { email, name, picture } = decoded;
    return { email, name: decodeStringUTF8(name), profileImg: picture };
  }
}
const userServiceInstance = new UserService();
export default userServiceInstance;
