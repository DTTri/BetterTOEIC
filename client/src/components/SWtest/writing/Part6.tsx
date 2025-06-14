import { useCallback, useRef, useState } from "react";
import Timer from "../Timer";
import TextEditor from "../TextEditor";
import { SWQuestion } from "@/entities";
import { TimeForPart6 } from "../SWTestTime";

interface Part6Props {
  questions: SWQuestion[];
  onComplete: (answers: string[]) => void;
}

export default function Part6({ questions, onComplete }: Part6Props) {
  const [stage, setStage] = useState<"direction" | "writing">("direction");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const answers = useRef<string[]>(new Array(questions.length).fill(""));

  const handleTimeEnd = useCallback(() => {
    answers.current.forEach((answer, index) => {
      console.log(
        `Part6 - TimeEnd - Question ${questions[index]?.question_number}: ${answer}`
      );
    });
    onComplete(answers.current);
  }, [onComplete, questions, answers]);

  const handleAnswerChange = useCallback(
    (value: string) => {
      const newAnswers = [...answers.current];
      newAnswers[currentQuestion] = value;
      answers.current = newAnswers;
    },
    [currentQuestion, answers]
  );

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((curr) => curr + 1);
    } else {
      onComplete(answers.current);
    }
  }, [currentQuestion, questions.length, onComplete, answers]);

  const handlePrevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((curr) => curr - 1);
    }
  }, [currentQuestion]);

  // useEffect(() => {
  //   console.log("Part6 re-rendered, currentQuestion:", currentQuestion);
  // }, [currentQuestion]);

  return (
    <div className="max-w-5xl mx-auto p-6">
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
            <h3 className="text-lg font-medium mb-4">
              Direction: In this part of the test, you will write ONE sentence
              that is based on a picture. With each picture, you will be given
              TWO words or phrases that you must use in your sentence. You can
              change the forms of the words and you can use the words in any
              order.
            </h3>
            <div className="hidden">
              <Timer
                initialSeconds={TimeForPart6.DirectionTime || 10}
                onTimeEnd={() => setStage("writing")}
                isPreparation={false}
              />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-2 gap-6 ">
              <div className="w-full h-[265px] rounded-lg">
                <img
                  src={questions[currentQuestion]?.image?.[0]}
                  alt={`Question ${currentQuestion + 1}`}
                  className="w-full h-full object-fill rounded-lg shadow-md"
                />
              </div>
              <div className="space-y-6 h-full">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <h4 className="text-sm font-bold text-gray-600 mb-2">
                    Keywords: {questions[currentQuestion]?.passage}
                  </h4>
                </div>
                <TextEditor
                  key={questions[currentQuestion].question_number}
                  initialValue={answers.current[currentQuestion]}
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
                initialSeconds={TimeForPart6.RecordingTime || 480}
                onTimeEnd={handleTimeEnd}
                isPreparation={false}
              />
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
