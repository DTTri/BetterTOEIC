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

  const testHistoryById = testStore
    .use((pre) => pre.testHistory)
    ?.filter((test) => test.testId === id);

  console.log(testHistoryById);
  console.log(selectedTest);
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
      const response = await testService.saveTest(
        sUser.value.info._id,
        selectedTest?._id || "",
        !isSaved
      );
      if (response.EC == 0) {
        setIsSaved(!isSaved);
      } else {
        console.log(response.EM);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-background w-full">
      <div className="mt-8 w-11/12 mx-auto rounded-xl p-4">
        <h2 className="text-2xl font-bold">{selectedTest?.title}</h2>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-center">
            <AccessAlarmIcon fontSize="small" />
            <span>Time: 120 minutes</span>
          </div>
          <div className="flex gap-1 items-center">
            <AccountTreeIcon fontSize="small" />
            <span>Test structure: 7 sections | 200 questions</span>
          </div>
          <div className="flex gap-1 items-center font-bold">
            <AssignmentIcon fontSize="small" />
            <span>Result record:</span>
          </div>
          <TestResultsTable testHistoryById={testHistoryById || []} />
          <div className="w-full flex justify-center gap-4 mt-2">
            <Button
              variant="outlined"
              style={{
                borderRadius: "8px",
                fontWeight: "700",
                color: "#000",
                borderColor: "#00205C",
              }}
              className="px-4 py-2 rounded-lg ml-2 shadow-lg"
            >
              <Link to={`/taking-test/${selectedTest?._id}`}>Start</Link>
            </Button>
            <Button
              onClick={handleOnSave}
              variant="contained"
              style={{
                borderRadius: "8px",
                background: isSaved ? "#FF0000" : "#1976d4",
              }}
              className=" text-white px-4 py-2 rounded-lg ml-2"
            >
              {isSaved ? "Unsave" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
