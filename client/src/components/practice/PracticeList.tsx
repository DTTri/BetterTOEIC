import React from "react";
import { useState } from "react";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import DoneIcon from "@mui/icons-material/Done";
import Practice from "../../entities/Practice";
import book from "../../assets/book.svg";
import arrow_right from "../../assets/arrow_right.svg";
import arrow_down from "../../assets/arrow_down.svg";
import { PracticePart } from "@/entities/PracticeHisotry";
import { useNavigate } from "react-router-dom";


function PracticeTest({
  title,
  part,
  progress,
  practice,
}: {
  title: string;
  part: number;
  progress: number;
  practice: Practice;
}) {
  const navigate = useNavigate();
  // progress is a number descriping the number of test.length
  return (
    <div className="max-w-[640px] w-full flex flex-row items-center px-5 py-[8px] bg-[#F6F6F6] rounded-[30px] cursor-pointer"
         onClick={() => navigate(`taking-practice/${part}/${practice._id}`)}>
      <div className="w-[20px] h-[20px] mr-5">
        <img className="w-full h-full" src={book} alt="" />
      </div>
      <div className="flex flex-col flex-1">
        <span className="font-bold text-xl">{title}</span>
        <span className="font-medium text-[16px]">
          {practice.questions.length} questions
        </span>
      </div>
      <div className="">
        {progress !== practice.questions.length ? (
          <span className="font-normal text-[16px] text-[#ffffff] px-[8px] py-[13px] aspect-square bg-[#00205C] rounded-full">
            {((progress / practice.questions.length) * 100).toFixed(0)}%
          </span>
        ) : ( 
          <DoneIcon />
        )}
      </div>
    </div>
  );
}
export default function PracticeList({
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
        className="w-full flex flex-row px-9 py-[16px] items-center cursor-pointer"
        onClick={() => {
          console.log(isShow);
          setIsShow(!isShow)
        }}
      >
        <div className="w-[24px] h-[24px] mr-5 ">
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
          {practices.map((practice, index) => {
            console.log(practice);
            return (
              <PracticeTest
                key={index}
                part={practice.part}
                title={`Practice Test ${index + 1}`}
                //progress wil be replaced in the future when it has own id
                progress={PracticePart.practice_tests[index].choices.length}
                practice={practice}
              />
            );
          })}
        </div>
      }
    </div>
  );
}
