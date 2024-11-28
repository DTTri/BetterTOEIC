import { collections } from '~/config/connectDB';
import { User } from '~/models';
import { sendForgotPasswordEmail, sendVerificationEmail } from '~/utils/Mailer';
import bcrypt from 'bcrypt';
import UserStatus from '~/constants/UserStatus';
import { ObjectId } from 'mongodb';

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
}
const userServiceInstance = new UserService();
export default userServiceInstance;
