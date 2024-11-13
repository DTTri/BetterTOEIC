type CompletedTest = {
  testId: string;
  correctAnswersPerPart: number[];
  choices: number[];
  attempted_at: string;
};
export default CompletedTest;
