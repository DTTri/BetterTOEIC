import { Button } from "@mui/material";
import { useState } from "react";
import { title } from "process";
import React from "react";
import { Link } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import practices from "@/data/practice_test";

const PracticeList = [
  {
    title: "Test 1",
    totalQuestion: 10,
    progress: 5,
  },
  {
    title: "Test 2",
    totalQuestion: 10,
    progress: 5,
  },
  {
    title: "Test 3",
    totalQuestion: 10,
    progress: 5,
  },
  {
    title: "Test 4",
    totalQuestion: 10,
    progress: 5,
  },
  {
    title: "Test 5",
    totalQuestion: 10,
    progress: 10,
  },
];

export default function LeftBar() {
  const [choiced, setChoiced] = useState<String>('practices');
  const [PracticeLists, setPracticeLists] = useState(PracticeList);
  const [practiceTest, setPracticeTest] = useState();
  return (
    <div className="max-w-[300px] w-full flex-col bg-[#fff] h-screen py-5">
      <div className="flex flex-row items-center justify-evenly mb-5">
        <Link to="">
          <Button
            onClick={() => setChoiced('lessons')}
            variant="outlined"
            style={{
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#F6F6F6',
              fontWeight: 'bold',
              color: choiced === 'lessons' ? "#CA4A05" : "#000000",
            }}
          >
            Lessons
          </Button>
        </Link>
        <Link to="">
          <Button
            onClick={() => setChoiced('practices')}
            style={{
                border: 'none',
                borderRadius: '10px',
                backgroundColor: '#F6F6F6',
                fontWeight: 'bold',
                color: choiced === 'practices' ? "#CA4A05" : "#000000", 
            }}
            variant="outlined">Practices</Button>
        </Link>
      </div>
      {choiced === 'practices' && 
        <div className="flex flex-col items-center mx-auto">
            {
              PracticeLists.map((practice, index) => {
                console.log(practice);
                return (
                  (
                    <Link className="w-[80%] mx-auto mb-4" to={``}>
                        <div className="flex min-h-[45px] items-center justify-between px-2 py-2 rounded-[20px] bg-slate-400">
                          <h3 className="text-base font-semibold text-[#202224]">Test 1</h3>
                          {practice.progress !== practice.totalQuestion ? (
                            <span className="font-normal text-[11px] text-[#ffffff] px-[3px] py-[5px] flex items-center justify-center aspect-square bg-[#00205C] rounded-full">
                                {((practice.progress / practice.totalQuestion) * 100).toFixed(0)}%
                            </span>
                            ) : (
                            <DoneIcon className=""/>
                          )}
                        </div>
                    </Link>)
                )
              })
            }
        </div>
      }
    </div>
  );
}
