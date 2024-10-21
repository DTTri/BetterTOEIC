import React from "react";
import { useState } from "react";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import DoneIcon from "@mui/icons-material/Done";
import Practice from "../../entities/Practice";
import book from "../../assets/book.svg";
import arrow_right from "../../assets/arrow_right.svg";
import arrow_down from "../../assets/arrow_down.svg";
import { PracticePart } from "@/entities/PracticeHisotry";

function PracticeTest({
  title,
  progress,
  totalQuestion,
}: {
  title: string;
  progress: number;
  totalQuestion: number;
}) {
  // progress is a number descriping the number of test.length
  return (
    <div className="max-w-[640px] w-full flex flex-row items-center px-5 py-[8px] bg-[#F6F6F6] rounded-[30px]">
      <div className="w-[20px] h-[20px] mr-5">
        <img className="w-full h-full" src={book} alt="" />
      </div>
      <div className="flex flex-col flex-1">
        <span className="font-bold text-xl">{title}</span>
        <span className="font-medium text-[16px]">
          {totalQuestion} questions
        </span>
      </div>
      <div className="">
        {progress !== totalQuestion ? (
          <span className="font-normal text-[16px] text-[#ffffff] px-[8px] py-[13px] aspect-square bg-[#00205C] rounded-full">
            {((progress / totalQuestion) * 100).toFixed(0)}%
          </span>
        ) : (
          <DoneIcon />
        )}
      </div>
    </div>
  );
}
export default function PracticeLists({
  part,
  title,
  practices,
  PracticePart,
}: {
  part: number;
  title: string;
  practices: Practice[];
  PracticePart: PracticePart;
}) {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <div className="w-[54%] rounded-[30px] bg-[#FFF]">
      <div
        className="w-full flex flex-row px-9 py-[16px] items-center"
        onClick={() => setIsShow(!isShow)}
      >
        <div className="w-[24px] h-[24px] mr-5">
          <img
            className="w-full h-full"
            src={isShow === false ? arrow_right : arrow_down}
            alt="arrow"
          />
        </div>
        <div className="flex flex-col flex-1">
          <span className="font-bold text-xl">
            Part {part}: {title}
          </span>
          <span className="font-medium text-[16px]">
            {practices.length} Practice Tests
          </span>
        </div>
        <div className="">
          <span className="font-bold text-[16px] text-[#FE5507] p-[10px] bg-[#F6F6F6] rounded-[20px]">
            {PracticePart.practice_tests.length}/{practices.length} tests
          </span>
        </div>
      </div>

      {isShow &&
        <div className="flex flex-col items-center gap-4 border-t py-4">
          {practices.map((practice, index) => (
            <PracticeTest
              key={index}
              title={`Practice Test ${index + 1}`}
              progress={2}
              totalQuestion={practice.questions.length}
            />
          ))}
        </div>
      }
    </div>
  );
}
