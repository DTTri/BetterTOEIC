import { Header, LeftBar, ListeningAudio, QuestionsGroup } from "@/components";
import CountingTimer from "@/components/practice/CountingTimer";
import QuestionPalette from "@/components/practice/QuestionPalette";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Question from "@/entities/Question";
import { practiceForPart1 } from "@/data/practice_test";
import QuestionComponent from "@/components/test/QuestionComponent";

//Testing for part 1
//If having api, api should return the list of questions for each part (vd: https://bettertoeic.com/api/practice/part1/test1)
export default function TakingPracticePage() {
  const [questions, setQuestions] = useState<Question[]>(
    practiceForPart1[0].questions
  );
  const [selectedQuestion, setSelectedQuestion] = useState<number>(1);

  const handleQuestionSelectedChange = (selectedQuestion: number) => {
    console.log(selectedQuestion + "from TakingPracticePage");
    setSelectedQuestion(selectedQuestion);
  };
  const { id, part } = useParams<{ id: string; part: string }>();
  console.log(id, part);
  console.log(questions);
  return (
    <div className="">
      <Header />
      <div className="content flex flex-row items-stretch gap-2 overflow-hidden">
        <LeftBar />
        <div className="max-w-[1200px] p-8 w-full flex flex-col gap-2">
          <div className="information w-full flex flex-row ">
            <h3 className="font-normal text-3xl text-[#000] w-[45%]">
              Câu hỏi số{selectedQuestion}
            </h3>
            <CountingTimer />
          </div>
          <div className="flex items-center justify-center my-[20px]">
            <ListeningAudio />
          </div>
          <div className="w-full bg-[#fff] rounded-[20px] px-8 py-7 mb-[20px]">
            <QuestionComponent question={questions[selectedQuestion - 1]} />
          </div>
          <QuestionPalette questionNumber={questions.length} onQuestionSelectedChange={handleQuestionSelectedChange} />
        </div>
      </div>
    </div>
  );
}
