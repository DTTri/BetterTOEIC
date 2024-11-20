import { useState } from "react";
import Question from "@/entities/Question";
import QuestionComponent from "./QuestionComponent";

// Part 6 & 7 Component with Paragraph and Image Handling
export default function QuestionsGroup({
  questions,
  ans,
  onChoose,
}: {
  questions: Question[];
  ans: number[];
  onChoose: (choice: number, question_number: number) => void;
}) {
  return (
    <div className="w-full flex justify-around mb-5">
      <div className="left-section w-1/3">

        {questions[0].passages &&
          questions[0].passages?.map((para, idx) => (
            <div
              key={idx}
              className="paragraph-container mb-4  max-h-[450px] overflow-auto"
            >
              {para.split("\n").map((line, lineIdx) => (
                <p
                  key={lineIdx}
                  className="border-slate-500 bg-[#fbfafa] p-[12px] shadow text- font-normal text-wrap"
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        {questions[0].images &&
          questions[0].images?.map((img, idx) => (
            <div className="img mb-4">
              <img
                key={idx}
                className="w-[350px] h-full max-h-[300px] object-cover"
                src={img}
                alt="Question Illustration"
              />
            </div>
          ))}
      </div>

      {/* Right section: Questions */}
      <div className="right-section w-[55%]">

        {questions.map((question, idx) => (
          <QuestionComponent ans={ans} onChoose={onChoose} key={idx} question={question} />
        ))}
      </div>
    </div>
  );
}
