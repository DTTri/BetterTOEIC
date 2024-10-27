import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import Vocab from "@/entities/Vocab";
import VocabByTopic from "@/entities/VocabByTopic";

//should be edited when call api from back-end

export default function LeftBarPersonal() {
  const [selectedTest, setSelectedTest] = useState<number>(0);
  // return (
  //   <div className="max-w-[300px] w-full items-center flex-col bg-[#fff] max-h-screen overflow-y-auto py-5">
  //     <div className="flex flex-col items-center mx-auto">
  //       {VocabLists.map((vocab, index) => {
  //         console.log(vocab);
  //         return (
  //           <Link
  //             key={index}
  //             className="w-[80%] mx-auto mb-4"
  //             to={``}
  //             onClick={() => setSelectedTest(index)}
  //           >
  //             <div
  //               className="flex min-h-[45px] items-center justify-between px-2 py-2 rounded-[10px]"
  //               style={{
  //                 backgroundColor: selectedTest === index ? "#94a3b8" : "#fff",
  //               }}
  //             >
  //               <h3 className="text-base font-semibold text-[#202224]">
  //                 Test 1
  //               </h3>
  //               {/* {practiceResult.part[index].practice_tests.length !== practice.questions.length ? (
  //                   <span className="font-normal text-[11px] text-[#ffffff] px-[3px] py-[5px] flex items-center justify-center aspect-square bg-[#00205C] rounded-full">
  //                     {(
  //                       (practiceResult.part[index].practice_tests.length / practice.questions.length) *
  //                       100
  //                     ).toFixed(0)}
  //                     %
  //                   </span>
  //                 ) : (
  //                   <DoneIcon className="" />
  //                 )} */}
  //             </div>
  //           </Link>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
}
