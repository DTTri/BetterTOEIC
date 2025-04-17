import { ObjectId } from 'mongodb';
import SWCompletedTest from './SWCompletedTest';

type SWTestHistory = {
  _id: ObjectId;
  completedTests: SWCompletedTest[];
  created_at: string;
  updated_at: string;
};

export default SWTestHistory;
