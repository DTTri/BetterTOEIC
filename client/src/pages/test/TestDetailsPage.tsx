import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Test } from "@/entities";
import { TestResultsTable } from "@/components";

export default function TestDetailsPage({ test }: { test: Test }) {
  return (
    <div className="bg-background w-full">
      <div className="mt-8 w-11/12 mx-auto bg-white rounded-xl p-4">
        <h2 className="text-2xl font-bold">{test.title}</h2>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center">
            <AccessAlarmIcon fontSize="small" />
            <span>Thời gian làm bài: 120 phút</span>
          </div>
          <div className="flex gap-1 items-center">
            <AccountTreeIcon fontSize="small" />
            <span>Cấu trúc đề thi: 7 phần | 200 câu hỏi</span>
          </div>
          <div className="flex gap-1 items-center">
            <AssignmentIcon fontSize="small" />
            <span>Kết quả làm bài:</span>
          </div>
          <TestResultsTable />
          <div className="w-full flex justify-center">
            <button className="bg-primary text-white px-4 py-2 rounded-lg">
              Bắt đầu thi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
