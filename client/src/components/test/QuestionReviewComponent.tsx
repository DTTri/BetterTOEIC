// This is just a stub code (mock code)
import Question from "@/entities/Question";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Button } from "@mui/material";

export default function QuestionReviewComponent({
  question,
  choice,
}: {
  question: Question;
  choice: number;
}) {
  const [showExplanation, setShowExplanation] = useState(false);
  console.log(question.correct_choice);
  console.log(choice);
  return (
    <div className="mb-4">
      <h4 className="text-[18px] w-full font-bold mb-2 text-wrap">
        Question {question.question_number}: {question.text}
      </h4>
      <div className="content flex flex-row w-full gap-[24px] items-center mb-2">
        {question.images && question.part === 1 && (
          <div className="img w-[50%]">
            <img
              className="max-w-full w-full max-h-[400px] block object-contain object-center "
              src={question.images[0]}
              alt=""
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          {question.choices.map((optionValue, index) => {
            return (
              <div
                key={index}
                className="flex justify-start items-center gap-2"
              >
                <input
                  type="radio"
                  name={`question-${question.question_number}`}
                  id={`optionValue-${question.question_number}-${index}`}
                  className="w-[20px] h-[20px] border-solid border-[1px] border-gray-400"
                  value={index + 1}
                  checked={index + 1 === choice}
                  disabled={true}
                />
                <label
                  htmlFor={`optionValue-${question.question_number}-${index}`}
                  className="text-[16px] font-medium text-wrap"
                >
                  ({String.fromCharCode(65 + index)}) {optionValue && ":"}{" "}
                  {optionValue}
                </label>
                {index + 1 === choice && choice !== question.correct_choice && (
                  <CloseIcon color="error" />
                )}
                {index + 1 === question.correct_choice && (
                  <DoneIcon className="text-green-500" />
                )}
              </div>
            );
          })}
        </div>
      </div>
        <div className="flex flex-col">
          <Button
            onClick={() => setShowExplanation(!showExplanation)}
            variant="contained"
            style={{ width: "fit-content" }}
          >
            {!showExplanation ? "Show Explanation" : "Hide Explanation"}
          </Button>
          {showExplanation && (
            <div
              className={`mt-2 bg-slate-500 rounded-md p-4 transition-all ease-in-out ${
                showExplanation ? "fade-in" : ""
              }`}
            >
              <p className="text-[16px] text-[#fff] font-medium">
                {question.explanation || "No explanation"}
              </p>
            </div>
          )}
        </div>
    </div>
  );
}
