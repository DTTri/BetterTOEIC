type CompletedPracticeTest = {
  practiceTestId: string;
  part: number;
  choices: number[];
  totalCorrectAnswers: number;
  attempted_at: string;
};
export default CompletedPracticeTest;
