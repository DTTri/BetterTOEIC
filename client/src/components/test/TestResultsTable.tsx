// This is just a stub code (mock code)
import { CompletedTest } from "@/entities/TestHistory";
import getTestScore from "@/utils/CalculateTestScore";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate, useParams } from "react-router-dom";
import * as motion from "motion/react-client";

export default function TestResultsTable( { testHistoryById } : {  testHistoryById: CompletedTest[] }) {
  // const data = [
  //   {
  //     date: "01/10/2024",
  //     totalTime: "01:50:25",
  //     correctAnswers: 185,
  //     result: 880,
  //   },
  //   {
  //     date: "01/10/2024",
  //     totalTime: "01:50:25",
  //     correctAnswers: 185,
  //     result: 880,
  //   },
  //   {
  //     date: "01/10/2024",
  //     totalTime: "01:50:25",
  //     correctAnswers: 185,
  //     result: 880,
  //   },
  //   {
  //     date: "01/10/2024",
  //     totalTime: "01:50:25",
  //     correctAnswers: 185,
  //     result: 880,
  //   },
  // ];

  const nav = useNavigate();
  const {id} = useParams();
  return (
    <div 
     className="overflow-x-auto">
      <table className="min-w-full bg-primary text-white">
        <thead>
          <tr className="uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left border border-white">
              Ngày làm
            </th>
            <th className="py-3 px-6 text-left border border-white">
              Thời gian làm bài
            </th>
            <th className="py-3 px-6 text-left border border-white">
              Số câu đúng
            </th>
            <th className="py-3 px-6 text-left border border-white">Kết quả</th>
            <th className="py-3 px-6 text-left border border-white"></th>
          </tr>
        </thead>
        <tbody className="text-sm font-light">
          {testHistoryById.map((item, index) => (
            <motion.tr 
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                duration: 0.3,
                scale: { type: "spring", bounce: 0.5 },
              }}
              key={index} className="border-b border-gray-200 ">
              <td className="py-3 px-6 text-center whitespace-nowrap border border-white">
                {item.attempted_at.split("T")[0] + " " + item.attempted_at.split("T")[1].toString().split(".")[0]}
              </td>
              <td className="py-3 px-6 text-center border border-white">
                {item.attempted_at}
              </td>
              <td className="py-3 px-6 text-center border border-white">
                {item.correctAnswersPerPart.reduce((acc, cur) => acc + cur)}
              </td>
              <td className="py-3 px-6 text-center border border-white">
                {getTestScore(item.correctAnswersPerPart)}
              </td>
              <td className="py-3 px-6 text-center border border-white">
                <button onClick={() => nav(`/review-test/${id}/${item.attempted_at}`)}>
                  <RemoveRedEyeIcon style={{color: "white"}} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
