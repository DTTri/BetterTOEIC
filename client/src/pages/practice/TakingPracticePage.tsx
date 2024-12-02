import { Header, LeftBar, ListeningAudio } from "@/components";
import CountingTimer from "@/components/practice/CountingTimer";
import QuestionPalette from "@/components/vocab/VocabQuestionPalette";
import QuestionComponent from "@/components/test/QuestionComponent";
import { Question } from "@/entities";
import CompletePracticeTestDTO from "@/entities/DTOS/CompletePracticeTestDTO";
import practiceService from "@/services/practiceService";
import { sUser } from "@/store";
import { practiceStore } from "@/store/practiceStore";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PracticeQuestionPallete from "@/components/practice/PracticeQuestionPallete";
import LoadingProgress from "@/components/LoadingProgress";

//Testing for part 1
//If having api, api should return the list of questions for each part (vd: https://bettertoeic.com/api/practice/part1/test1)
export default function TakingPracticePage() {
  const { part, id } = useParams();
  const nav = useNavigate();
  const selectedPracticeTest = practiceStore
    .use((value) => value.practiceTestList)
    .find((practice) => practice._id === id);

    const userId = sUser.use((state) => state.info._id);

    const [questions, setQuestions] = useState<Question[]>(selectedPracticeTest?.questions || []);
    const [selectedQuestion, setSelectedQuestion] = useState<Question>(questions[0]);
  
    const [answers, setAnswers] = useState<number[]>(
      new Array(questions.length).fill(0)
    );

  useEffect(() => {
      if (selectedPracticeTest) {
        setQuestions(selectedPracticeTest?.questions);
        setSelectedQuestion(selectedPracticeTest?.questions[0]);
      }
    }, [selectedPracticeTest]);

  console.log(selectedQuestion)

  console.log(answers);

  const onChoose = (choice: number, question_number: number) => {
    setAnswers((prev) => {
      prev[question_number] = choice;
      return [...prev];
    });
  };

  const handleQuestionSelectedChange = (selectedQuestionNumber: number) => {
    console.log(selectedQuestionNumber);
    setSelectedQuestion(questions[selectedQuestionNumber]);
  };

  const onSubmit = async () => {
    try {
      const completedTest: CompletePracticeTestDTO = {
        practiceTestId: selectedPracticeTest?._id || "",
        choices: answers,
      };
      const response = await practiceService.completePracticeTest(
        userId,
        completedTest
      );
      if (response.EC === 0) {
        console.log("Submit success");
        nav("/practice");
      } else {
        console.log("Submit failed" + response.EM);
      }
    } catch (error) {
      console.log("Submit failed" + error);
    }
  };

  if(!selectedQuestion) {
    return <LoadingProgress />;
  }

  return (
    <div className="">
      <Header />
      <div className="content flex flex-row items-stretch gap-2 overflow-hidden">
        <LeftBar />
        <div className="max-w-[1200px] p-8 w-full flex flex-col gap-2">
          <div className="information w-full flex flex-row justify-between">
            <h3 className="font-normal text-3xl text-[#000]">
              Câu hỏi số {(selectedQuestion?.question_number || 0) + 1}
            </h3>
            <CountingTimer />
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
              onClick={onSubmit}
            >
              Submit
            </Button>
          </div>
          <div className="flex items-center justify-center my-[20px]">
            <ListeningAudio
              audioFile={selectedPracticeTest?.main_audio || ""}
            />
          </div>
          <div className="w-full bg-[#fff] rounded-[20px] px-8 py-7 mb-[20px]">
            <QuestionComponent
              ans={answers}
              onChoose={onChoose}
              question={selectedQuestion || questions[0]}
            />
          </div>
          <PracticeQuestionPallete
            answers={answers}
            selectedQuestion={selectedQuestion?.question_number || 0}
            questionNumber={questions.length}
            onQuestionSelectedChange={handleQuestionSelectedChange}
          />
        </div>
      </div>
    </div>
  );
}
