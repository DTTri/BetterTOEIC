import { swTestStore } from "@/store";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Volume2 } from "lucide-react";
import { CompletedSWTest } from "@/entities";
import { Link, useParams } from "react-router-dom";

const SWTestResultsTable = ({
  completedTest,
}: {
  completedTest: CompletedSWTest[];
}) => {
  const { id } = useParams();
  const handleNavigate = (attemptId: string) => {
    window.location.href = `/review-sw-test/${id}/${attemptId}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-primary text-white">
        <thead>
          <tr className="uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-base text-center border border-white">
              Ngày làm
            </th>
            <th className="py-3 px-6 text-base text-center border border-white">
              Tổng điểm
            </th>
            <th className="py-3 px-6 text-base text-center border border-white"></th>
          </tr>
        </thead>
        <tbody className="text-sm font-light">
          {completedTest.map((item, index) => (
            <motion.tr
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                scale: { type: "spring", bounce: 0.5 },
              }}
              key={index}
              className="border-b border-gray-200"
            >
              <td className="py-3 px-6 text-center whitespace-nowrap border border-white">
                {item.attempted_at.split("T")[0] +
                  " " +
                  item.attempted_at.split("T")[1].toString().split(".")[0]}
              </td>
              <td className="py-3 px-6 text-center border border-white">
                {item.totalScore}/{item.scores.length * 5}
              </td>
              <td className="py-3 px-6 text-center border border-white">
                <button
                  onClick={() => handleNavigate(item.attemptId)}
                  className="hover:text-blue-300 transition-colors"
                >
                  <RemoveRedEyeIcon style={{ color: "white" }} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function SWTestDetailsPage() {
  const { id } = useParams();

  const selectedTest = swTestStore
    .use((pre) => pre.swTestList)
    .find((test) => test._id === id);

  const testHistoryById = swTestStore
    .use((pre) => pre.swTestHistory)
    ?.filter((test) => test.testId === id);

  const totalQuestions = selectedTest?.questions?.length || 0;
  const speakingQuestions =
    selectedTest?.questions?.filter((q) => q.question_number <= 11)?.length ||
    0;
  const writingQuestions = totalQuestions - speakingQuestions;

  return (
    <div className="bg-background w-full">
      <div className="mt-8 w-11/12 mx-auto bg-white rounded-xl p-4">
        <h2 className="text-2xl font-bold">{selectedTest?.title}</h2>
        <p className="text-gray-600 mt-2">{selectedTest?.description}</p>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex gap-1 items-center">
            <AccessAlarmIcon fontSize="small" />
            <span>Time: 120 minutes</span>
          </div>
          <div className="flex gap-1 items-center">
            <AccountTreeIcon fontSize="small" />
            <span>
              Test structure: {speakingQuestions} speaking questions,{" "}
              {writingQuestions} writing questions
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <Volume2 size={20} />
            <span>
              Speaking sections: Read aloud, Describe pictures, Respond to
              questions, Express opinion
            </span>
          </div>
          <div className="flex gap-1 items-center font-bold mt-4">
            <AssignmentIcon fontSize="small" />
            <span>Result record:</span>
          </div>

          {testHistoryById && testHistoryById.length > 0 ? (
            <SWTestResultsTable completedTest={testHistoryById} />
          ) : (
            <div className="text-center py-4 bg-gray-100 rounded-md">
              <p>You haven't taken this test yet.</p>
            </div>
          )}

          <div className="w-full flex justify-center gap-4 mt-4">
            <Button
              variant="outlined"
              style={{
                borderRadius: "8px",
                fontWeight: "700",
                color: "#000",
                borderColor: "#00205C",
              }}
            >
              <Link to={`/taking-sw-test/${selectedTest?._id}`}>
                Start Test
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
