import { TestResultsTable } from "@/components";
import { testService } from "@/services";
import { sUser } from "@/store";
import { testStore } from "@/store/testStore";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function TestDetailsPage() {
  const { id } = useParams();
  
  const selectedTest = testStore
  .use((pre) => pre.testList)
  .find((test) => test._id === id);
  
  const testHistoryById = testStore.use((pre) => pre.testHistory)
  ?.filter((test) => test.testId === id);
  
  const testsSaved = testStore.use((pre) => pre.testsSaved);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    testsSaved.forEach((test) => {
      if (test.testId === selectedTest?._id) {
        setIsSaved(true);
      }
    });
  }, [testsSaved]);

  console.log(isSaved);

  const handleOnSave = async () => {
    try {
      const response = await testService.saveTest(sUser.value.id, selectedTest?._id || '', !isSaved);
      if(response.EC == 0) {
        setIsSaved(!isSaved);
      }
      else{
        console.log(response.EM);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="bg-background w-full">
      <div className="mt-8 w-11/12 mx-auto bg-white rounded-xl p-4">
        <h2 className="text-2xl font-bold">{selectedTest?.title}</h2>
        <div className="flex flex-col gap-2">
          <div>
          <h3>{selectedTest?.title}</h3>
          </div>
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
          <TestResultsTable testHistoryById={testHistoryById || []}/>
          <div className="w-full flex justify-center gap-4 mt-2">
            <button className="bg-primary text-white px-4 py-2 rounded-lg">
              <Link to={`/taking-test/${selectedTest?._id}`}>Bắt đầu thi</Link>
            </button>
            <Button onClick={handleOnSave} variant="contained" style={ { borderRadius: "10px", background: isSaved ? '#FF0000' : '#1976d4'  } } className=" text-white px-4 py-2 rounded-lg ml-2">
              {isSaved ? "Bỏ lưu" : "Lưu đề thi"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
