import { useState } from "react";
import Timer from "../Timer";
import TextEditor from "../TextEditor";
import { Question } from "@/entities";
interface Part8Props {
  question: Question;
  onComplete: (answer: string) => void;
}

export default function Part8({ question, onComplete }: Part8Props) {
  const [stage, setStage] = useState<"direction" | "writing">("direction");
  const [answer, setAnswer] = useState("");

  const handleTimeEnd = () => {
    onComplete(answer);
  };

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-red-800 text-white py-3 px-6 rounded-t-lg">
        <h2 className="text-lg font-semibold">QUESTION 19 OF 19</h2>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-6">
        {stage === "direction" ? (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 w-full text-center block">
              Question 19: Write an essay
            </h2>
            <h3 className="text-lg font-semibold mb-4">Direction:</h3>
            <p className="text-gray-700">
              In this part of the test, you will write an essay expressing and
              supporting your opinion on a given topic. You will have 30 minutes
              to plan, write, and revise your essay. Your essay should be
              between 300-350 words.
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
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">Question:</h4>
                <p className="text-lg leading-relaxed">{question.text}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Your Essay:</h4>
                <Timer
                  initialSeconds={30 * 60}
                  onTimeEnd={handleTimeEnd}
                  isPreparation={false}
                />
              </div>
              <TextEditor
                onChange={handleAnswerChange}
                placeholder="Write your essay here..."
                minHeight="600px"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
