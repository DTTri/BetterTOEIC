export default function getAccuracyPerPart(
  correctAnswersPerPart: number[]
): number[] {
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
      "Each part's correct answer count must be within the valid range."
    );
  }
  const accuracyPerPart = correctAnswersPerPart.map((count, i) => {
    return Math.round((count / maxQuestionsPerPart[i]) * 100);
  });

  return accuracyPerPart;
}
