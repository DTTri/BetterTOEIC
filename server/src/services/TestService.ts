import { ObjectId } from 'mongodb';
import { collections } from '~/config/connectDB';
import { CompletedTest, Test, TestHistory, TestsSaved } from '~/models';
import { CreateTestDTO } from '~/models/DTOs';

class TestService {
  async createTest(test: Test): Promise<boolean> {
    const result = await collections.tests?.insertOne(test);
    return result ? true : false;
  }

  async deleteTest(testId: string): Promise<boolean> {
    const result = await Promise.all([
      collections.tests?.deleteOne({ _id: new ObjectId(testId) }),
      async () => {
        const userTestHistory = (await collections.testHistories?.find().toArray()) as TestHistory[];
        if (userTestHistory) {
          userTestHistory.forEach(async (user) => {
            user.completedTests = user.completedTests.filter((test) => test.testId !== testId);
          });
          await collections.testHistories?.deleteMany({});
          await collections.testHistories?.insertMany(userTestHistory);
        }
      },
      async () => {
        const userTestsSaved = (await collections.testsSaved?.find().toArray()) as TestsSaved[];
        if (userTestsSaved) {
          userTestsSaved.forEach(async (user) => {
            user.savedTests = user.savedTests.filter((test) => test.testId !== testId);
          });
          await collections.testsSaved?.deleteMany({});
          await collections.testsSaved?.insertMany(userTestsSaved);
        }
      },
    ]);
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

  async updateTestHistory(userId: string, completedTest: CompletedTest): Promise<boolean> {
    const getUserTestHistoryResult = await collections.testHistories?.findOne({ _id: new ObjectId(userId) });
    const userTestHistory = getUserTestHistoryResult as TestHistory;
    if (userTestHistory) {
      userTestHistory.completedTests.push(completedTest);
      const result = await collections.testHistories?.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { completedTests: userTestHistory.completedTests, updated_at: new Date().toISOString() } }
      );
      return result ? true : false;
    } else {
      const newUserTestHistory: TestHistory = {
        _id: new ObjectId(userId),
        completedTests: [completedTest],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const result = await collections.testHistories?.insertOne(newUserTestHistory);
      return result ? true : false;
    }
  }

  async getTestHistory(userId: string): Promise<TestHistory | null> {
    const result = await collections.testHistories?.findOne({ _id: new ObjectId(userId) });
    if (result) {
      return result as TestHistory;
    }
    return null;
  }

  async getAllTestHistories(): Promise<TestHistory[] | null> {
    const result = await collections.testHistories?.find().toArray();
    if (result) {
      return result as TestHistory[];
    }
    return null;
  }

  async updateTestsSaved(userId: string, testId: string, unsave: boolean): Promise<boolean> {
    const getUserTestsSavedResult = await collections.testsSaved?.findOne({ _id: new ObjectId(userId) });
    const userTestsSaved = getUserTestsSavedResult as TestsSaved;
    if (userTestsSaved) {
      if (unsave) {
        const testIndex = userTestsSaved.savedTests.findIndex((test) => test.testId === testId);
        userTestsSaved.savedTests.splice(testIndex, 1);
        const result = await collections.testsSaved?.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { savedTests: userTestsSaved.savedTests, updated_at: new Date().toISOString() } }
        );
        return result ? true : false;
      } else {
        userTestsSaved.savedTests.push({ testId, saved_at: new Date().toISOString() });
        const result = await collections.testsSaved?.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { savedTests: userTestsSaved.savedTests, updated_at: new Date().toISOString() } }
        );
        return result ? true : false;
      }
    } else {
      const newUserTestsSaved: TestsSaved = {
        _id: new ObjectId(userId),
        savedTests: [{ testId, saved_at: new Date().toISOString() }],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const result = await collections.testsSaved?.insertOne(newUserTestsSaved);
      return result ? true : false;
    }
  }
  async getTestsSaved(userId: string): Promise<TestsSaved | null> {
    const result = await collections.testsSaved?.findOne({ _id: new ObjectId(userId) });
    if (result) {
      return result as TestsSaved;
    }
    return null;
  }
}

const testServiceInstance = new TestService();

export default testServiceInstance;
