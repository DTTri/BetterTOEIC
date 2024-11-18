import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { title } from "process";
import React from "react";
import { Link } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import Practice from "@/entities/PracticeTest";
import { UserPracticeData } from "@/entities/PracticeHisotry";

//should be edited when call api from back-end

export default function LeftBar({
  PracticeLists,
  PracticeResult,
}: {
  PracticeLists: Practice[];
  PracticeResult: UserPracticeData;
}) {
  const [choiced, setChoiced] = useState<String>("practices");
  console.log("left bar");
  console.log(PracticeLists);
  const [selectedTest, setSelectedTest] = useState<string>(
    PracticeLists[0]._id
  );

  return (
    <div className="max-w-[300px] w-full items-center flex-col bg-[#fff] h-screen py-5">
      <div className="flex flex-row items-center justify-evenly mb-5">
        <Link to="">
          <Button
            onClick={() => setChoiced("lessons")}
            variant="outlined"
            style={{
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#F6F6F6",
              fontWeight: "bold",
              color: choiced === "lessons" ? "#CA4A05" : "#000000",
            }}
          >
            Lessons
          </Button>
        </Link>
        <Link to="">
          <Button
            onClick={() => setChoiced("practices")}
            style={{
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#F6F6F6",
              fontWeight: "bold",
              color: choiced === "practices" ? "#CA4A05" : "#000000",
            }}
            variant="outlined"
          >
            Practices
          </Button>
        </Link>
      </div>
      {choiced === "practices" && (
        <div className="flex flex-col items-center mx-auto">
          {PracticeLists.map((practice, index) => {
            console.log("part: " + practice.part);
            return (
              <Link
                key={index}
                className="w-[80%] mx-auto mb-4"
                to={`/taking-practice/${practice.part}/${practice._id}`}
                onClick={() => setSelectedTest(practice._id)}
              >
                <div
                  className="flex min-h-[45px] items-center justify-between px-2 py-2 rounded-[10px]"
                  style={{
                    backgroundColor:
                      selectedTest === practice._id ? "#94a3b8" : "#fff",
                  }}
                >
                  <h3 className="text-base font-semibold text-[#202224]">
                    Test {index + 1}
                  </h3>
                  {PracticeResult.part[index].practice_tests.length !==
                  practice.questions.length ? (
                    <span className="font-normal text-[11px] text-[#ffffff] px-[3px] py-[5px] flex items-center justify-center aspect-square bg-[#00205C] rounded-full">
                      {(
                        (PracticeResult.part[index].practice_tests.length /
                          practice.questions.length) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  ) : (
                    <DoneIcon className="" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
