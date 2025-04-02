import { useState } from "react";
import Timer from "../Timer";
import TextEditor from "../TextEditor";
import { Question } from "@/entities";

interface Part6Props {
  questions: Question[];
  onComplete: (answers: string[]) => void;
}

export default function Part6({ questions, onComplete }: Part6Props) {
  const [stage, setStage] = useState<"direction" | "writing">("direction");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const [timeRemaining, setTimeRemaining] = useState(8 * 60); // 8 minutes in seconds

  const handleTimeEnd = () => {
    onComplete(answers);
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((curr) => curr + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((curr) => curr - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-red-800 text-white py-3 px-6 rounded-t-lg">
        <h2 className="text-lg font-semibold">
          QUESTION {questions[currentQuestion].question_number} OF 19
        </h2>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-6">
        {stage === "direction" ? (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 w-full text-center block">
              Question 12-16: Write ONE sentence based on a picture
            </h2>
            <h3 className="text-lg font-semibold mb-4">Direction:</h3>
            <p className="text-gray-700">
              In this part of the test, you will write ONE sentence that is
              based on a picture. With each picture, you will be given TWO words
              or phrases that you must use in your sentence. You can change the
              forms of the words and you can use the words in any order.
            </p>
            <div className="hidden">
              <Timer
                initialSeconds={10}
                onTimeEnd={() => setStage("writing")}
                isPreparation={false}
              />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <img
                  src={questions[currentQuestion]?.images?.[0]}
                  alt={`Question ${currentQuestion + 1}`}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">
                    Keywords: {questions[currentQuestion]?.passages?.[0]}
                  </h4>
                </div>
                <TextEditor
                  initialValue={answers[currentQuestion]}
                  onChange={handleAnswerChange}
                  placeholder="Write your sentence here..."
                  minHeight="150px"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <Timer
                initialSeconds={timeRemaining}
                onTimeEnd={handleTimeEnd}
                isPreparation={false}
              />
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestion === 16}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
