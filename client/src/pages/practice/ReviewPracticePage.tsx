import { LeftBar, ListeningAudio, QuestionComponent } from "@/components";
import LoadingProgress from "@/components/LoadingProgress";
import CountingTimer from "@/components/practice/CountingTimer";
import PracticeQuestionPallete from "@/components/practice/PracticeQuestionPallete";
import { Question } from "@/entities";
import CompletedPracticeTest from "@/entities/CompletedPracticeTest";
import { practiceStore } from "@/store/practiceStore";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Testing for part 1
//If having api, api should return the list of questions for each part (vd: https://bettertoeic.com/api/practice/part1/test1)
export default function ReviewPracticePage() {
  const { part, id } = useParams();
  const nav = useNavigate();
  const selectedPracticeTest = practiceStore
    .use((value) => value.practiceTestList)
    .find((practice) => practice._id === id);

  const practiceHistory = practiceStore
    .use((value) => value.completedPracticeTests)
    .filter((history) => history.practiceTestId === id);

  const [questions, setQuestions] = useState<Question[]>(
    selectedPracticeTest?.questions || []
  );
  const [curQuestionIndex, setCurQuestionIndex] = useState<number>(0);
  const [history, setHistory] = useState<CompletedPracticeTest>();
  console.log("history" + practiceHistory.length);

  useEffect(() => {
    if (selectedPracticeTest) {
      setQuestions(selectedPracticeTest?.questions);
    }
  }, [selectedPracticeTest]);

  useEffect(() => {
    if (practiceHistory) {
      const lastPracticeHistoryById = practiceHistory.sort(
        (a, b) =>
          new Date(b.attempted_at).getTime() -
          new Date(a.attempted_at).getTime()
      )[0];
      setHistory(lastPracticeHistoryById);
    }
  }, [practiceHistory]);

  if (questions.length === 0 || !history?.choices) {
    return <LoadingProgress />;
  }

  const handleQuestionSelectedChange = (selectedQuestionNumber: number) => {
    console.log("selectedQuestionNumber" + selectedQuestionNumber);
    setCurQuestionIndex(selectedQuestionNumber);
  };

  return (
    <div className="">
      <div className="content flex flex-row items-stretch gap-2 overflow-hidden">
        <LeftBar />
        <div className="max-w-[1200px] p-8 w-full flex flex-col gap-2">
          <div className="information w-full flex flex-row justify-between">
            <h3 className="font-normal text-3xl text-[#000]">
              Câu hỏi số {curQuestionIndex + 1}
            </h3>
            <Button
              style={{
                backgroundColor: "#00C552",
                padding: "7px 20px 7px",
                fontSize: "18px",
                fontWeight: "700",
                borderRadius: "10px",
                marginRight: "24px",
              }}
              variant="contained"
              color="success"
              onClick={() => {
                nav("/taking-practice/" + part + "/" + id);
              }}
            >
              RETRY
            </Button>
          </div>
          <div className="flex items-center justify-center my-[20px]">
            <ListeningAudio
              audioFile={selectedPracticeTest?.main_audio || ""}
            />
          </div>
          <div className="w-full bg-[#fff] rounded-[20px] px-8 py-7 mb-[20px]">
            <QuestionComponent
              userChoice={history.choices[curQuestionIndex]}
              question={questions[curQuestionIndex]}
            />
          </div>
          <PracticeQuestionPallete
            selectedQuestion={curQuestionIndex + 1}
            questionNumber={questions.length}
            onQuestionSelectedChange={handleQuestionSelectedChange}
          />
        </div>
      </div>
    </div>
  );
}
