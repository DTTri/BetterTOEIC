import { ObjectId } from 'mongodb';
import { collections } from '~/config/connectDB';
import { SWTest, SWCompletedTest, SWTestHistory } from '~/models';

class SWTestService {
  async createSWTest(swTest: SWTest): Promise<boolean> {
    const result = await collections.swTests?.insertOne(swTest);
    return result ? true : false;
  }

  async deleteSWTest(swTestId: string): Promise<boolean> {
    const result = await collections.swTests?.deleteOne({ _id: new ObjectId(swTestId) });
    return result ? true : false;
  }

  async getAllSWTests(): Promise<SWTest[] | null> {
    const result = await collections.swTests?.find().toArray();
    if (result) {
      return result as SWTest[];
    }
    return null;
  }

  async getSWTestById(swTestId: string): Promise<SWTest | null> {
    const result = await collections.swTests?.findOne({ _id: new ObjectId(swTestId) });
    if (result) {
      return result as SWTest;
    }
    return null;
  }

  async updateSWTestHistory(userId: string, completedTest: SWCompletedTest): Promise<boolean> {
    const getUserSWTestHistoryResult = await collections.swTestHistories?.findOne({ _id: new ObjectId(userId) });
    const userSWTestHistory = getUserSWTestHistoryResult as SWTestHistory;
    if (userSWTestHistory) {
      userSWTestHistory.completedTests.push(completedTest);
      const result = await collections.swTestHistories?.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { completedTests: userSWTestHistory.completedTests, updated_at: new Date().toISOString() } }
      );
      return result ? true : false;
    } else {
      const newUserSWTestHistory: SWTestHistory = {
        _id: new ObjectId(userId),
        completedTests: [completedTest],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const result = await collections.swTestHistories?.insertOne(newUserSWTestHistory);
      return result ? true : false;
    }
  }

  async getSWTestHistory(userId: string): Promise<SWTestHistory | null> {
    const result = await collections.swTestHistories?.findOne({ _id: new ObjectId(userId) });
    if (result) {
      return result as SWTestHistory;
    }
    return null;
  }

  async updateSWTestEvaluation(
    userId: string,
    testId: string,
    evaluations: string[],
    sampleAnswers: string[],
    scores: number[]
  ): Promise<boolean> {
    const getUserSWTestHistoryResult = await collections.swTestHistories?.findOne({ _id: new ObjectId(userId) });
    const userSWTestHistory = getUserSWTestHistoryResult as SWTestHistory;

    if (userSWTestHistory) {
      // Find the completed test by testId
      const completedTestIndex = userSWTestHistory.completedTests.findIndex((test) => test.testId === testId);

      if (completedTestIndex !== -1) {
        // Update the evaluations, sampleAnswers, and scores
        userSWTestHistory.completedTests[completedTestIndex].evaluations = evaluations;
        userSWTestHistory.completedTests[completedTestIndex].sampleAnswers = sampleAnswers;
        userSWTestHistory.completedTests[completedTestIndex].scores = scores;

        const result = await collections.swTestHistories?.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { completedTests: userSWTestHistory.completedTests, updated_at: new Date().toISOString() } }
        );
        return result ? true : false;
      }
    }
    return false;
  }

  async getAllSWTestHistories(): Promise<SWTestHistory[] | null> {
    const result = await collections.swTestHistories?.find().toArray();
    if (result) {
      return result as SWTestHistory[];
    }
    return null;
  }
}

const swTestServiceInstance = new SWTestService();
export default swTestServiceInstance;
