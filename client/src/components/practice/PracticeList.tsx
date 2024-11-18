import React from "react";
import { useState } from "react";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import DoneIcon from "@mui/icons-material/Done";
import Practice from "../../entities/PracticeTest";
import book from "../../assets/book.svg";
import arrow_right from "../../assets/arrow_right.svg";
import arrow_down from "../../assets/arrow_down.svg";
import { useNavigate } from "react-router-dom";
import PracticeTest from "../../entities/PracticeTest";
import PracticeTestHistory from "@/entities/PracticeHisotry";
import CompletedPracticeTest from "@/entities/CompletedPracticeTest";

function PracticeTestComponent({
  title,
  completedTest,
  practiceTest,
}: {
  title: string;
  completedTest?: CompletedPracticeTest | null;
  practiceTest: PracticeTest;
}) {
  const navigate = useNavigate();
  // progress is a number descriping the number of test.length
  return (
    <div
      className="max-w-[640px] w-full flex flex-row items-center px-5 py-[8px] bg-[#F6F6F6] rounded-[30px] cursor-pointer"
      onClick={() => navigate(`/taking-practice/${practiceTest.part}/${practiceTest._id}`)}
    >
      <div className="w-[20px] h-[20px] mr-5">
        <img className="w-full h-full" src={book} alt="" />
      </div>
      <div className="flex flex-col flex-1">
        <span className="font-bold text-xl">{title}</span>
        <span className="font-medium text-[16px]">
          {practiceTest.questions.length} questions
        </span>
      </div>
      <div className="">
        {completedTest ?  (
          <DoneIcon />) : (<></>)}
      </div>
    </div>
  );
}
export default function PracticeList({
  title,
  part,
  practiceTests,
  completedTests,
}: {
  title: string;
  part: number;
  practiceTests: PracticeTest[];
  completedTests: CompletedPracticeTest[];
}) {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <div className="w-[54%] rounded-[30px] bg-[#FFF]">
      <div
        className="w-full flex flex-row px-9 py-[16px] items-center cursor-pointer"
        onClick={() => {
          console.log(isShow);
          setIsShow(!isShow);
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
            {practiceTests.length} Practice Tests
          </span>
        </div>
        <div className="">
          <span className="font-bold text-[16px] text-[#FE5507] p-[10px] bg-[#F6F6F6] rounded-[20px]">
            {completedTests.length}/{practiceTests.length} tests
          </span>
        </div>
      </div>

      {isShow && (
        <div className="flex flex-col items-center gap-4 border-t py-4">
          {practiceTests.map((practiceTest, index) => {
            return (
              <PracticeTestComponent
                key={index}
                title={`Practice Test ${index + 1}`}
                //progress wil be replaced in the future when it has own id
                completedTest={completedTests.find((completedTest) => completedTest.practiceTestId === practiceTest._id)}
                practiceTest={practiceTest}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
