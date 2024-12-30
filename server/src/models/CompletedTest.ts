type CompletedTest = {
  testId: string;
  correctAnswersPerPart: number[];
  choices: number[];
  attempted_at: string;
  score?: number;
};
export default CompletedTest;
