export default function getTestScore(correctAnswersPerPart: number[]) {
  const maxQuestionsPerPart = [6, 25, 39, 30, 30, 16, 54];

  if (correctAnswersPerPart.length !== 7) {
    throw new Error(
      "Input must have 7 numbers corresponding to 7 parts of the test."
    );
  }
  if (
    !correctAnswersPerPart.every(
      (count, i) => count >= 0 && count <= maxQuestionsPerPart[i]
    )
  ) {
    throw new Error(
      "Each part's correct answer count must be within the valid range, " +
        correctAnswersPerPart
    );
  }

  const listeningCorrect = correctAnswersPerPart
    .slice(0, 4)
    .reduce((a, b) => a + b, 0);
  const readingCorrect = correctAnswersPerPart
    .slice(4)
    .reduce((a, b) => a + b, 0);

  const rawToScaledScore = (rawScore: number, maxRawScore: number): number => {
    const scaledMax = 495;
    const scaledMin = 5;
    return Math.round(
      (rawScore / maxRawScore) * (scaledMax - scaledMin) + scaledMin
    );
  };

  const listeningScore = rawToScaledScore(listeningCorrect, 100);
  const readingScore = rawToScaledScore(readingCorrect, 100);

  return listeningScore + readingScore;
}
