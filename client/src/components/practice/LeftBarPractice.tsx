import Practice from "@/entities/PracticeTest";
import { practiceStore } from "@/store/practiceStore";
import DoneIcon from "@mui/icons-material/Done";
import { Button } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

//should be edited when call api from back-end

export default function LeftBar() {
  const { part, id } = useParams();
  const practiceTests = practiceStore.use((s) => s.practiceTestList).filter((practice) => practice.part == Number.parseInt(part || '1'));
  const completedPracticeTests = practiceStore.use((s) => s.completedPracticeTests).filter((practice) => practice.part == Number.parseInt(part || '1'));
  const [choiced, setChoiced] = useState<String>("practices");
  const [selectedTest, setSelectedTest] = useState<string>(
    id?.toString() || practiceTests[0]._id
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
          {practiceTests.map((practice, index) => {
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
                  {completedPracticeTests.find((completedTest) => completedTest.practiceTestId === practice._id) ? (
                    <DoneIcon className="" />
                  ) : (<></>)}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
