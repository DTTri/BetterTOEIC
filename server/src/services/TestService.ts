import { ObjectId } from 'mongodb';
import { collections } from '~/config/connectDB';
import { Test } from '~/models';

class TestService {
  async createTest(test: Test): Promise<Test | null> {
    const newTest = {
      ...test,
      _id: new ObjectId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const result = await collections.tests?.insertOne(newTest);
    if (result) {
      return newTest;
    }
    return null;
  }

  async deleteTest(testId: string): Promise<boolean> {
    const result = await collections.tests?.deleteOne({ _id: new ObjectId(testId) });
    return result ? true : false;
  }
  async getAllTests(): Promise<Test[] | null> {
    const result = await collections.tests?.find().toArray();
    if (result) {
      return result as Test[];
    }
    return null;
  }
  async getTestById(testId: string): Promise<Test | null> {
    const result = await collections.tests?.findOne({ _id: new ObjectId(testId) });
    if (result) {
      return result as Test;
    }
    return null;
  }
}

const testServiceInstance = new TestService();

export default testServiceInstance;
