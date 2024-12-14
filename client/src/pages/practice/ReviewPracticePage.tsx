import {
  LeftBar,
  ListeningAudio,
  QuestionComponent,
  QuestionsGroup,
} from "@/components";
import LoadingProgress from "@/components/LoadingProgress";
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

  const [curQuestionIndex, setCurQuestionIndex] = useState<number>(0);
  const [history, setHistory] = useState<CompletedPracticeTest>();

  const [questions, setQuestions] = useState<Question[]>(
    selectedPracticeTest?.questions || []
  );
  console.log("history" + practiceHistory.length);
  const [questionGroupCount, setQuestionGroupCount] = useState<number[]>([]);
  const [selectedGroupNumber, setSelectedGroupNumber] = useState<number>(0);
  const [selectedQuestionGroup, setSelectedQuestionGroup] = useState<
    Question[]
  >([]);
  const [historyChoices, setHistoryChoices] = useState<number[]>([]);

  useEffect(() => {
    if (selectedPracticeTest) {
      setQuestions(selectedPracticeTest?.questions);
      if (
        Number(part) >= 3 ||
        Number(part) == 4 ||
        Number(part) == 6 ||
        Number(part) == 7
      ) {
        let count: number[] = [];
        selectedPracticeTest.questions.forEach((question, index) => {
          if (index == 0) {
            count.push(question.question_group_number);
          }
          if (
            index > 0 &&
            question.question_group_number !=
              questions[index - 1]?.question_group_number
          ) {
            count.push(question.question_group_number);
          }
        });
        console.log(count);
        setSelectedQuestionGroup(
          selectedPracticeTest.questions.filter(
            (question) => question.question_group_number == count[0]
          )
        );
        setSelectedGroupNumber(count[0]);
        setQuestionGroupCount(count);
      }
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
    if(Number(part) == 1 || Number(part) == 2 || Number(part) == 5){
      setCurQuestionIndex(selectedQuestionNumber);
    }
    else{
      console.log("quesNum" + selectedQuestionNumber);
      setSelectedGroupNumber(selectedQuestionNumber + 1);
      setSelectedQuestionGroup(questions.filter(question => question.question_group_number == questionGroupCount[selectedQuestionNumber]));
    }
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
            {Number(part) == 1 || Number(part) == 2 || Number(part) == 5 ? (
              <QuestionComponent
                question={questions[curQuestionIndex]}
                userChoice={history.choices[curQuestionIndex]}
              />
            ) : (
              <QuestionsGroup
                key={selectedQuestionGroup[0]?.question_group_number}
                questions={selectedQuestionGroup}
                userChoice={history.choices}
              />
            )}
          </div>
          {Number(part) == 1 || Number(part) == 2 || Number(part) == 5 ? (
            <PracticeQuestionPallete
              selectedQuestion={questions[curQuestionIndex].question_number}
              questionNumber={questions.length}
              onQuestionSelectedChange={handleQuestionSelectedChange}
            />
          ) : (
            <PracticeQuestionPallete
              selectedQuestion={selectedGroupNumber}
              questionNumber={questionGroupCount.length}
              onQuestionSelectedChange={handleQuestionSelectedChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
