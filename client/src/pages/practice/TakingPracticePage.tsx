import { Header, LeftBar, ListeningAudio, QuestionsGroup } from "@/components";
import CountingTimer from "@/components/practice/CountingTimer";
import QuestionPalette from "@/components/practice/QuestionPalette";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Question from "@/entities/Question";
import QuestionComponent from "@/components/test/QuestionComponent";
import practiceResult from "@/data/practice_result";
import { practiceStore } from "@/store/practiceStore";
import { Button } from "@mui/material";
import CompletePracticeTestDTO from "@/entities/DTOS/CompletePracticeTestDTO";
import practiceService from "@/services/practiceService";
import { sUser } from "@/store";

//Testing for part 1
//If having api, api should return the list of questions for each part (vd: https://bettertoeic.com/api/practice/part1/test1)
export default function TakingPracticePage() {
  const { part, id } = useParams();
  const selectedPracticeTest =
    practiceStore
      .use((value) => value.practiceTestList)
      .find((practice) => practice._id === id);
  const questions = selectedPracticeTest?.questions || [];
  const userId = sUser.use((state) => state.id);

  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(0)
  );

  console.log(answers);

  console.log(questions);

  const onChoose = (choice: number, question_number: number) => {
    setAnswers((prev) => {
      prev[question_number] = choice;
      return [...prev];
    });
  };

  const handleQuestionSelectedChange = (selectedQuestion: number) => {
    setSelectedQuestion(selectedQuestion);
  };

  const onSubmit = async () => {
    try {
      const completedTest: CompletePracticeTestDTO = {
        practiceTestId: selectedPracticeTest?._id || '',
        choices: answers,
      }
      const response = await practiceService.completePracticeTest(userId, completedTest);
      if(response.EC === 0){
        console.log('Submit success');
      }
      else{
        console.log('Submit failed' + response.EM);
      }
    } catch (error) {
      console.log('Submit failed' + error);
    }
  }

  return (
    <div className="">
      <Header />
      <div className="content flex flex-row items-stretch gap-2 overflow-hidden">
        <LeftBar />
        <div className="max-w-[1200px] p-8 w-full flex flex-col gap-2">
          <div className="information w-full flex flex-row justify-between">
            <h3 className="font-normal text-3xl text-[#000]">
              Câu hỏi số {selectedQuestion + 1}
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
            <ListeningAudio />
          </div>
          <div className="w-full bg-[#fff] rounded-[20px] px-8 py-7 mb-[20px]">
            <QuestionComponent
              ans={answers}
              onChoose={onChoose}
              question={questions[selectedQuestion]}
            />
          </div>
          <QuestionPalette
            selectedQuestion={selectedQuestion}
            questionNumber={questions.length}
            onQuestionSelectedChange={handleQuestionSelectedChange}
          />
        </div>
      </div>
    </div>
  );
}
