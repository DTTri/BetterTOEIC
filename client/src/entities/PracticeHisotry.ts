import CompletedPracticeTest from './CompletedPracticeTest';

type PracticeTestHistory = {
  _id: string;
  completedPracticeTests: CompletedPracticeTest[];
  created_at: string;
  updated_at: string;
};
export default PracticeTestHistory;
