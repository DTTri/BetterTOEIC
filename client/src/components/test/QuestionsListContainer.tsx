
const QuestionsListContainer = ( { ans, onMoveToChosenQuestion } : { ans?: number[], onMoveToChosenQuestion: (question_number: number) => void }) => {
  const numberOfQuestionsPerPart = [6, 24, 38, 30, 30, 30, 30];

  const handleQuestionClick = (index: number) => {
    onMoveToChosenQuestion(index);
    // Scroll to question
  };

  let runningTotal = 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg min-w-[220px]">
      {numberOfQuestionsPerPart.map((numberOfQuestions, partIndex) => {
        runningTotal += numberOfQuestions;
        return (
          <div key={partIndex} className="w-full p-4">
            <p className="text-xl font-medium">Part {partIndex + 1}</p>{" "}
            {/* Adjust part number */}
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: numberOfQuestions }).map(
                (_, questionIndex) => {
                  const globalIndex =
                    runningTotal - numberOfQuestions + questionIndex + 1;
                  return (
                    <div
                      key={globalIndex}
                      className={`question-item w-10 h-10 text-center flex justify-center items-center rounded-xl cursor-pointer ${
                        (ans?.[globalIndex - 1] ?? 0) !== 0
                          ? "bg-primary text-white"
                          : "bg-gray-300 text-black"
                      }`}
                      onClick={() => handleQuestionClick(globalIndex - 1)}
                    >
                      {globalIndex}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsListContainer;
