import {  useCallback, useEffect, useRef, useState } from "react";
import Timer from "../Timer";
import TextEditor from "../TextEditor";
import { SWQuestion } from "@/entities";
import { TimeForPart7 } from "../SWTestTime";

interface Part7Props {
  question: SWQuestion;
  onComplete: (answer: string) => void;
}

export default function Part7({ question, onComplete }: Part7Props) {
  const [stage, setStage] = useState<"direction" | "writing">("direction");
  useEffect(() => {
    setStage(question.question_number === 17 ? "direction" : "writing");
  }, [question]);
  const answer = useRef<string>("");

  const handleTimeEnd = () => {
    console.log(`Question ${question.question_number} + 1}: ${answer.current}`);
    onComplete(answer.current);
    answer.current = "";
  }

  const handleAnswerChange = (value: string) => {
    answer.current = value;
  };

  const renderTextEditor = () => {
    return (
      <TextEditor
        key={question.question_number}
        initialValue={answer.current}
        onChange={handleAnswerChange}
        placeholder="Write your email response here..."
        minHeight="400px"
      />
    )
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-[#981C1E] text-white text-center w-full font-bold py-3 px-5 text-2xl rounded-t-lg">
        <h2 className="text-lg font-semibold">
          QUESTION {question.question_number} OF 19
        </h2>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg px-6 pt-3 py-6 space-y-6">
        {stage === "direction" ? (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 w-full text-center block">
              Question 17-18: Write an email response
            </h2>
            <h3 className="text-lg font-medium mb-4">
              Direction: In this part of the test, you will read an email and
              write a response. You will have 10 minutes to read the email and
              write your response. Your response should be between 150-200
              words.
            </h3>
            <div className="hidden">
              <Timer
                initialSeconds={TimeForPart7.DirectionTime || 10}
                onTimeEnd={() => setStage("writing")}
                isPreparation={false}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="w-full flex justify-center items-center">
              <Timer
                initialSeconds={TimeForPart7.RecordingTime || 600}
                onTimeEnd={handleTimeEnd}
                isPreparation={false}
              />
            </div>
            <div className="w-full bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-700 text-sm whitespace-pre-wrap">
                    {/* I don't know why the text in this tag cannot be wrapped :"( 
                      So I use the split method to add <br /> tags
                    " */}
                    {question.passage?.split(/\r\n|\\n|\n/g).map((line, index, array) => (
                      <span key={index}>
                        {line}
                        {index < array.length - 1 && <br/>}
                      </span>
                    ))}
                  </p>
                {/* Can replace with the request of the question
              <div className="text-gray-800 whitespace-pre-line">
                {email.content}
              </div> */}
            </div>

            <div className="space-y-4">
              {renderTextEditor()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
