import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

//should be edited when call api from back-end

export default function LeftBarPersonal() {
  const [choice, setChoice] = useState<string>('tests');
  return (
    <div className="max-w-[300px] h-screen w-full items-center flex-col bg-[#fff] max-h-screen overflow-y-auto py-5">
      <div className="flex flex-col items-center mx-auto">
        <Link
          className="w-[80%] mx-auto mb-4"
          to={`/test-saved`}
          onClick={() => setChoice('tests')}
        >
          <div
            className="flex min-h-[45px] items-center justify-between px-2 py-2 rounded-[10px]"
            style={{
              backgroundColor: choice === 'tests' ? "#94a3b8" : "#fff",
            }}
          >
            <h3 className="text-base font-semibold text-[#202224]">
              Đề thi
            </h3>
          </div>
        </Link>
        <Link
          className="w-[80%] mx-auto mb-4"
          to={`/word-saved`}
          onClick={() => setChoice('words')}
        >
          <div
            className="flex min-h-[45px] items-center justify-between px-2 py-2 rounded-[10px]"
            style={{
              backgroundColor: choice === 'words' ? "#94a3b8" : "#fff",
            }}
          >
            <h3 className="text-base font-semibold text-[#202224]">
              Từ vựng
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
