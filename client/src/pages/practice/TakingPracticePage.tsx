import { Header, LeftBar, ListeningAudio, QuestionsGroup } from "@/components";
import CountingTimer from "@/components/practice/CountingTimer";
import QuestionPalette from "@/components/practice/QuestionPalette";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import Question from "@/entities/Question";
import { practiceForPart1 } from "@/data/practice_test";
import QuestionComponent from "@/components/test/QuestionComponent";
import practiceResult from "@/data/practice_result";

//Testing for part 1
//If having api, api should return the list of questions for each part (vd: https://bettertoeic.com/api/practice/part1/test1)
export default function TakingPracticePage() {
  const navigate = useNavigate();
  const { part, id } = useParams();

  const [questions, setQuestions] = useState<Question[]>(
    practiceForPart1[0].questions
  );

  const handleTestPracticeChange = (practiceId: string) => {
    if(practiceId !== id) {
      navigate(`/taking-practice/${part}/${practiceId}`);
      setQuestions(practiceForPart1.find((practice) => practice._id === practiceId)?.questions || []);
    }
  };


  const [selectedQuestion, setSelectedQuestion] = useState<number>(1);
  
  const handleQuestionSelectedChange = (selectedQuestion: number) => {
    setSelectedQuestion(selectedQuestion);
  };

  return (
    <div className="">
      <Header />
      <div className="content flex flex-row items-stretch gap-2 overflow-hidden">
        <LeftBar PracticeResult={practiceResult} PracticeLists={practiceForPart1} onHandleTestPracticeChange={handleTestPracticeChange}/>
        <div className="max-w-[1200px] p-8 w-full flex flex-col gap-2">
          <div className="information w-full flex flex-row ">
            <h3 className="font-normal text-3xl text-[#000] w-[45%]">
              Câu hỏi số {selectedQuestion + 1}
            </h3>
            <CountingTimer />
          </div>
          <div className="flex items-center justify-center my-[20px]">
            <ListeningAudio />
          </div>
          <div className="w-full bg-[#fff] rounded-[20px] px-8 py-7 mb-[20px]">
            <QuestionComponent question={questions[selectedQuestion]} />
          </div>
          <QuestionPalette questionNumber={questions.length} onQuestionSelectedChange={handleQuestionSelectedChange} />
        </div>
      </div>
    </div>
  );
}
