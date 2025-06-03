type SWCompletedTest = {
  testId: string;
  answers: string[];
  evaluations?: string[];
  sampleAnswers?: string[];
  scores?: number[];
  s3_url?: string;
  attempted_at: string;
};

export default SWCompletedTest;
