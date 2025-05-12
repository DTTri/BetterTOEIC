type CompletedSWTest = {
  testId: string;
  attemptId: string;
  answers: string[];
  evaluations: string[];
  sampleAnswers: string[];
  scores: number[];
  totalScore: number;
  averageScore: number;
  attempted_at: string;
};

export default CompletedSWTest;
