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
    <div className="w-full flex justify-around mb-4 bg-[#f1f1f1] p-2 gap-[24px]">
      <div className="left-section w-[50%]">
        {questions[0].passages &&
          questions[0].passages?.map((para, idx) => (
            <div
              key={idx}
              className="paragraph-container mb-2  max-h-[450px] overflow-auto"
            >
              {para.split("\n").map((line, lineIdx) => (
                <p
                  key={lineIdx}
                  className="border-slate-500 bg-[#cccccc] p-[12px] shadow text- font-normal text-wrap"
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        {questions[0].images &&
          questions[0].images?.map((img, idx) => (
            <div className="img mb-2">
              <img
                key={idx}
                className="w-full h-full max-h-[400px] block object-contain object-center"
                src={img}
                alt="Question Illustration"
              />
            </div>
          ))}
      </div>

      {/* Right section: Questions */}
      <div className="right-section w-[45%]">

        {questions.map((question, idx) => (
          <QuestionComponent ans={ans} onChoose={onChoose} key={idx} question={question} />
        ))}
      </div>
    </div>
  );
}
