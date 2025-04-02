import { useState } from "react";
import Timer from "../Timer";
import TextEditor from "../TextEditor";
import { Question } from "@/entities";

interface Part7Props {
  question: Question;
  onComplete: (answer: string) => void;
}

export default function Part7({ question, onComplete }: Part7Props) {
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
        <h2 className="text-lg font-semibold">
          QUESTION {question.question_number} OF 19
        </h2>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-6">
        {stage === "direction" ? (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 w-full text-center block">
              Question 17-20: Write an email response
            </h2>
            <h3 className="text-lg font-semibold mb-4">Direction:</h3>
            <p className="text-gray-700">
              In this part of the test, you will read an email and write a
              response. You will have 10 minutes to read the email and write
              your response. Your response should be between 150-200 words.
            </p>
            <div className="hidden">
              <Timer
                initialSeconds={10 * 60}
                onTimeEnd={() => setStage("writing")}
                isPreparation={false}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="text-gray-600">{question.text}</div>
                </div>
                {/* Can replace with the request of the question
              <div className="text-gray-800 whitespace-pre-line">
                {email.content}
              </div> */}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Your Response:</h4>
                <Timer
                  initialSeconds={10 * 60}
                  onTimeEnd={handleTimeEnd}
                  isPreparation={false}
                />
              </div>
              <TextEditor
                onChange={handleAnswerChange}
                placeholder="Write your email response here..."
                minHeight="400px"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
