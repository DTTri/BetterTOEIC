import { useState } from "react";
import Question from "@/entities/Question";
import QuestionComponent from "./QuestionComponent";

// Part 6 & 7 Component with Paragraph and Image Handling
export default function QuestionsGroup({
  questions,
}: {
  questions: Question[];
}) {
  return (
    <div className="max-w-[950px] flex flex-row gap-[32px] mb-5">
      <div className="left-section w-[55%]">
        {questions[0].passage &&
          questions[0].passage?.map((para, idx) => (
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
        {questions[0].image &&
          questions[0].image?.map((img, idx) => (
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
      <div className="right-section w-[45%]">
        {questions.map((question, idx) => (
          <QuestionComponent key={idx} question={question} />
        ))}
      </div>
    </div>
  );
}
