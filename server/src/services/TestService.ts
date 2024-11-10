import { ObjectId } from 'mongodb';
import { collections } from '~/config/connectDB';
import { CompletedTest, Test, TestHistory, TestsSaved } from '~/models';

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

  async updateTestHistory(userId: string, completedTest: CompletedTest): Promise<boolean> {
    const getUserTestHistoryResult = await collections.testHistories?.findOne({ _id: new ObjectId(userId) });
    const userTestHistory = getUserTestHistoryResult as TestHistory;
    if (userTestHistory) {
      //check if the test is already completed
      const testIndex = userTestHistory.completedTests.findIndex(
        (test: CompletedTest) => test.testId === completedTest.testId
      );
      if (testIndex !== -1) {
        userTestHistory.completedTests[testIndex] = completedTest;
        const result = await collections.testHistories?.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { completedTests: userTestHistory.completedTests, updated_at: new Date().toISOString() } }
        );
        return result ? true : false;
      } else {
        userTestHistory.completedTests.push(completedTest);
        const result = await collections.testHistories?.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { completedTests: userTestHistory.completedTests, updated_at: new Date().toISOString() } }
        );
        return result ? true : false;
      }
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
}

const testServiceInstance = new TestService();

export default testServiceInstance;
