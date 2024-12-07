import React, { useState, useEffect } from "react";

export default function PracticeQuestionPallete({
  questionNumber,
  onQuestionSelectedChange,
  selectedQuestion,
  answers,
}: {
  questionNumber: number;
  onQuestionSelectedChange: (selectedQuestion: number) => void;
  selectedQuestion: number;
  answers?: number[];
}) {
  console.log(selectedQuestion);
  return (
    <div className="w-full px-8 py-6 bg-[#fff] rounded-2xl ">
      <h3 className="text-2xl font-normal text-[#000] mb-3">
        Question Palette
      </h3>

      <div className="flex flex-row gap-2 scroll-m-2 overflow-auto">
        {Array.from(Array(questionNumber).keys()).map((question, index) => (
          <div
            className="min-w-[32px] min-h-[32px] flex items-center justify-center text-sm bg-[#F6F6F6] rounded-[10px] text-center hover:bg-slate-300 cursor-pointer"
            onClick={() => onQuestionSelectedChange(index)}
            key={index}
            style={{
              backgroundColor:
                (answers?.[index] ?? 0) > 0 ? '#FF0000' : selectedQuestion - 1 === index ? "#3A7EE1" : "#F6F6F6",
              color: (answers?.[index] ?? 0) > 0 ? '#fff' : selectedQuestion - 1 === index ? "#fff" : "#000",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
