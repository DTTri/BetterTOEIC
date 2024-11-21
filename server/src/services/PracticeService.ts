import { ObjectId } from 'mongodb';
import { collections } from '~/config/connectDB';
import {
  PracticeLesson,
  PracticeTest,
  PracticeTestHistory,
  PracticeLessonHistory,
  CompletedPracticeTest,
  CompletedPracticeLesson,
} from '~/models';

class PracticeService {
  async createPracticeTest(practiceTest: PracticeTest): Promise<boolean> {
    const result = await collections.practiceTests?.insertOne(practiceTest);
    return result ? true : false;
  }
  async deletePracticeTest(practiceTestId: string): Promise<boolean> {
    const result = await collections.practiceTests?.deleteOne({ _id: new ObjectId(practiceTestId) });
    return result ? true : false;
  }

  async getAllPracticeTests(): Promise<PracticeTest[] | null> {
    const result = await collections.practiceTests?.find().toArray();
    if (result) {
      return result as PracticeTest[];
    }
    return null;
  }
  async getPracticeTestsByPart(part: number): Promise<PracticeTest[] | null> {
    const result = await collections.practiceTests?.find({ part }).toArray();
    if (result) {
      return result as PracticeTest[];
    }
    return null;
  }
  async getPracticeTestById(practiceTestId: string): Promise<PracticeTest | null> {
    const result = await collections.practiceTests?.findOne({ _id: new ObjectId(practiceTestId) });
    if (result) {
      return result as PracticeTest;
    }
    return null;
  }

  async createPracticeLesson(practiceLesson: PracticeLesson): Promise<boolean> {
    const result = await collections.practiceLessons?.insertOne(practiceLesson);
    return result ? true : false;
  }
  async deletePracticeLesson(practiceLessonId: string): Promise<boolean> {
    const result = await collections.practiceLessons?.deleteOne({ _id: new ObjectId(practiceLessonId) });
    return result ? true : false;
  }
  async getAllPracticeLessons(): Promise<PracticeLesson[] | null> {
    const result = await collections.practiceLessons?.find().toArray();
    if (result) {
      return result as PracticeLesson[];
    }
    return null;
  }
  async getPracticeLessonById(practiceLessonId: string): Promise<PracticeLesson | null> {
    const result = await collections.practiceLessons?.findOne({ _id: new ObjectId(practiceLessonId) });
    if (result) {
      return result as PracticeLesson;
    }
    return null;
  }
  async getPracticeLessonsByPart(part: number): Promise<PracticeLesson[] | null> {
    const result = await collections.practiceLessons?.find({ part }).toArray();
    if (result) {
      return result as PracticeLesson[];
    }
    return null;
  }
  //   async updateTestHistory(userId: string, completedTest: CompletedTest): Promise<boolean> {
  //     const getUserTestHistoryResult = await collections.testHistories?.findOne({ _id: new ObjectId(userId) });
  //     const userTestHistory = getUserTestHistoryResult as TestHistory;
  //     if (userTestHistory) {
  //       //check if the test is already completed
  //       const testIndex = userTestHistory.completedTests.findIndex(
  //         (test: CompletedTest) => test.testId === completedTest.testId
  //       );
  //       if (testIndex !== -1) {
  //         userTestHistory.completedTests[testIndex] = completedTest;
  //         const result = await collections.testHistories?.updateOne(
  //           { _id: new ObjectId(userId) },
  //           { $set: { completedTests: userTestHistory.completedTests, updated_at: new Date().toISOString() } }
  //         );
  //         return result ? true : false;
  //       } else {
  //         userTestHistory.completedTests.push(completedTest);
  //         const result = await collections.testHistories?.updateOne(
  //           { _id: new ObjectId(userId) },
  //           { $set: { completedTests: userTestHistory.completedTests, updated_at: new Date().toISOString() } }
  //         );
  //         return result ? true : false;
  //       }
  //     } else {
  //       const newUserTestHistory: TestHistory = {
  //         _id: new ObjectId(userId),
  //         completedTests: [completedTest],
  //         created_at: new Date().toISOString(),
  //         updated_at: new Date().toISOString(),
  //       };
  //       const result = await collections.testHistories?.insertOne(newUserTestHistory);
  //       return result ? true : false;
  //     }
  //   }

  //   async getTestHistory(userId: string): Promise<TestHistory | null> {
  //     const result = await collections.testHistories?.findOne({ _id: new ObjectId(userId) });
  //     if (result) {
  //       return result as TestHistory;
  //     }
  //     return null;
  //   }
  async updatePracticeTestHistory(userId: string, completedPracticeTest: CompletedPracticeTest): Promise<boolean> {
    const getUserPracticeTestHistoryResult = await collections.practiceTestHistories?.findOne({
      _id: new ObjectId(userId),
    });
    const userPracticeTestHistory = getUserPracticeTestHistoryResult as PracticeTestHistory;
    if (userPracticeTestHistory) {
      userPracticeTestHistory.completedPracticeTests.push(completedPracticeTest);
      const result = await collections.practiceTestHistories?.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            completedTests: userPracticeTestHistory.completedPracticeTests,
            updated_at: new Date().toISOString(),
          },
        }
      );
      return result ? true : false;
    } else {
      const newUserPracticeTestHistory: PracticeTestHistory = {
        _id: new ObjectId(userId),
        completedPracticeTests: [completedPracticeTest],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const result = await collections.practiceTestHistories?.insertOne(newUserPracticeTestHistory);
      return result ? true : false;
    }
  }
  async updatePracticeLessonHistory(
    userId: string,
    completedPracticeLesson: CompletedPracticeLesson
  ): Promise<boolean> {
    const getUserPracticeLessonHistoryResult = await collections.practiceLessonHistories?.findOne({
      _id: new ObjectId(userId),
    });
    const userPracticeLessonHistory = getUserPracticeLessonHistoryResult as PracticeLessonHistory;
    if (userPracticeLessonHistory) {
      userPracticeLessonHistory.completedPracticeLessons.push(completedPracticeLesson);
      const result = await collections.practiceLessonHistories?.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            completedTests: userPracticeLessonHistory.completedPracticeLessons,
            updated_at: new Date().toISOString(),
          },
        }
      );
      return result ? true : false;
    } else {
      const newUserPracticeLessonHistory: PracticeLessonHistory = {
        _id: new ObjectId(userId),
        completedPracticeLessons: [completedPracticeLesson],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const result = await collections.practiceLessonHistories?.insertOne(newUserPracticeLessonHistory);
      return result ? true : false;
    }
  }

  async getPracticeTestHistory(userId: string): Promise<PracticeTestHistory | null> {
    const result = await collections.practiceTestHistories?.findOne({ _id: new ObjectId(userId) });
    if (result) {
      return result as PracticeTestHistory;
    }
    return null;
  }
  async getPracticeLessonHistory(userId: string): Promise<PracticeLessonHistory | null> {
    const result = await collections.practiceLessonHistories?.findOne({ _id: new ObjectId(userId) });
    if (result) {
      return result as PracticeLessonHistory;
    }
    return null;
  }
}

const practiceServiceInstance = new PracticeService();

export default practiceServiceInstance;
