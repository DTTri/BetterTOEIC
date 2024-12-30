export type CompletedTest = {
  testId: string;
  correctAnswersPerPart: number[];
  choices: number[];
  attempted_at: string;
  score?: number;
};

type TestHistory = {
  _id: string;
  completedTests: CompletedTest[];
  created_at: string;
  updated_at: string;
};

export default TestHistory;
