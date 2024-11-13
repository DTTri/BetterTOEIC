import { ObjectId } from 'mongodb';
import CompletedPracticeTest from './CompletedPracticeTest';

type PracticeTestHistory = {
  _id: ObjectId;
  completedPracticeTests: CompletedPracticeTest[];
  created_at: string;
  updated_at: string;
};
export default PracticeTestHistory;
