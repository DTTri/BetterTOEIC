import { ObjectId } from 'mongodb';
import CompletedTest from './CompletedTest';

type TestHistory = {
  _id: ObjectId;
  completedTests: CompletedTest[];
  created_at: string;
  updated_at: string;
};
export default TestHistory;
