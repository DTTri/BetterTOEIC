type SWCompletedTest = {
  testId: string;
  answers: string[];
  evaluations?: string[];
  sampleAnswers?: string[];
  scores?: number[];
  attempted_at: string;
};

export default SWCompletedTest;
