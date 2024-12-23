import { CompletedTest } from "@/entities";

function getAverageCorrectAnswersPerPart(completedTests: CompletedTest[]) {
  if (completedTests.length === 0) return [0, 0, 0, 0, 0, 0, 0];
  const correctAnswersPerPart = completedTests.reduce(
    (acc, test) => {
      return acc.map((count, i) => count + test.correctAnswersPerPart[i]);
    },
    [0, 0, 0, 0, 0, 0, 0]
  );
  if (completedTests.length === 0) return [0, 0, 0, 0, 0, 0, 0];
  return correctAnswersPerPart.map((count) =>
    Math.round(count / completedTests.length)
  );
}
export default getAverageCorrectAnswersPerPart;
