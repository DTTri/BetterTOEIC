import Question from '~/models/Question';

export default function getTestScore(correctAnswersPerPart: number[], questions: Question[]) {
  const maxQuestionsPerPart = [0, 0, 0, 0, 0, 0, 0];
  questions.forEach((question) => {
    maxQuestionsPerPart[question.part - 1]++;
  });

  if (correctAnswersPerPart.length !== 7) {
    throw new Error('Input must have 7 numbers corresponding to 7 parts of the test.');
  }
  if (!correctAnswersPerPart.every((count, i) => count >= 0 && count <= maxQuestionsPerPart[i])) {
    throw new Error("Each part's correct answer count must be within the valid range.");
  }

  const listeningCorrect = correctAnswersPerPart.slice(0, 4).reduce((a, b) => a + b, 0);
  const readingCorrect = correctAnswersPerPart.slice(4).reduce((a, b) => a + b, 0);
  const totalListeningQuestions = maxQuestionsPerPart.slice(0, 4).reduce((a, b) => a + b, 0);
  const totalReadingQuestions = maxQuestionsPerPart.slice(4).reduce((a, b) => a + b, 0);
  const rawToScaledScore = (rawScore: number, maxRawScore: number): number => {
    const scaledMax = 495;
    const scaledMin = 5;
    return Math.round((rawScore / maxRawScore) * (scaledMax - scaledMin) + scaledMin);
  };

  const listeningScore = rawToScaledScore(listeningCorrect, totalListeningQuestions);
  const readingScore = rawToScaledScore(readingCorrect, totalReadingQuestions);

  return listeningScore + readingScore;
}
