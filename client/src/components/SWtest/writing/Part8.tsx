import { useState } from "react";
import Timer from "../Timer";
import TextEditor from "../TextEditor";
import { SWQuestion } from "@/entities";
import { Part8SWTestTime } from "../SWTestTime";
interface Part8Props {
  question: SWQuestion;
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
      <div className="bg-[#981C1E] text-white text-center w-full font-bold py-3 px-5 text-2xl rounded-t-lg">
        <h2 className="text-lg font-semibold">QUESTION 19 OF 19</h2>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg px-6 pt-3 py-6 space-y-6">
        {stage === "direction" ? (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 w-full text-center block">
              Question 19: Write an essay
            </h2>
            <h3 className="text-lg font-medium mb-4">
              Direction: In this part of the test, you will write an essay
              expressing and supporting your opinion on a given topic. You will
              have 30 minutes to plan, write, and revise your essay. Your essay
              should be between 300-350 words.
            </h3>
            <div className="hidden">
              <Timer
                initialSeconds={Part8SWTestTime.DirectionTime || 10}
                onTimeEnd={() => setStage("writing")}
                isPreparation={false}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="w-full flex justify-center items-center">
              <Timer
                initialSeconds={Part8SWTestTime.RecordingTime || 1800}
                onTimeEnd={handleTimeEnd}
                isPreparation={false}
              />
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">
                  Question: {question.text}
                </h4>
              </div>
            </div>

            <div className="space-y-4">
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
