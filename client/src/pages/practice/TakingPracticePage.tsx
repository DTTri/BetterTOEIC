import { LeftBar, ListeningAudio, QuestionsGroup } from "@/components";
import LoadingProgress from "@/components/LoadingProgress";
import CountingTimer from "@/components/practice/CountingTimer";
import PracticeQuestionPallete from "@/components/practice/PracticeQuestionPallete";
import QuestionComponent from "@/components/test/QuestionComponent";
import { Question } from "@/entities";
import CompletePracticeTestDTO from "@/entities/DTOS/CompletePracticeTestDTO";
import practiceService from "@/services/practiceService";
import { sUser } from "@/store";
import { practiceStore } from "@/store/practiceStore";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Testing for part 1
//If having api, api should return the list of questions for each part (vd: https://bettertoeic.com/api/practice/part1/test1)
export default function TakingPracticePage() {
  const { part, id } = useParams();
  const nav = useNavigate();
  const selectedPracticeTest = practiceStore
    .use((value) => value.practiceTestList)
    .find((practice) => practice._id === id);

  const userId = sUser.use((state) => state.info._id);

  const [questions, setQuestions] = useState<Question[]>(
    selectedPracticeTest?.questions || []
  );
  const [selectedQuestion, setSelectedQuestion] = useState<Question>(
    questions[0]
  );

  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(0)
  );
  //handle for part 3 4 6 7
  const [questionGroupCount, setQuestionGroupCount] = useState<number[]>([]);
  const [selectedGroupNumber, setSelectedGroupNumber] = useState<number>(0);
  const [selectedQuestionGroup, setSelectedQuestionGroup] = useState<
    Question[]
  >([]);
  useEffect(() => {
    if (selectedPracticeTest) {
      setQuestions(selectedPracticeTest?.questions);
      if ((Number(part) >= 1 && Number(part) <= 2) || Number(part) == 5) {
        setSelectedQuestion(selectedPracticeTest?.questions[0]);
      } else {
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

  const onChoose = (choice: number, question_number: number) => {
    setAnswers((prev) => {
      prev[question_number] = choice;
      return [...prev];
    });
  };

  const handleQuestionSelectedChange = (selectedQuestionNumber: number) => {
    if (Number(part) == 1 || Number(part) == 2 || Number(part) == 5) {
      setSelectedQuestion(questions[selectedQuestionNumber]);
    } else {
      console.log("quesNum" + selectedQuestionNumber);
      setSelectedGroupNumber(selectedQuestionNumber + 1);
      setSelectedQuestionGroup(
        questions.filter(
          (question) =>
            question.question_group_number ==
            questionGroupCount[selectedQuestionNumber]
        )
      );
    }
  };

  const handlePreviousButtonClick = () => {
    if(Number(part) == 1 || Number(part) == 2 || Number(part) == 5){
      console.log(selectedQuestion.question_number);
      setSelectedQuestion(questions[selectedQuestion.question_number - 2]);
    }
    else{
      setSelectedGroupNumber(selectedGroupNumber - 1);
      setSelectedQuestionGroup(questions.filter(question => question.question_group_number == questionGroupCount[selectedGroupNumber - 2]));
    }
  }

  const handleNextButtonClick = () => {
    if(Number(part) == 1 || Number(part) == 2 || Number(part) == 5){
      setSelectedQuestion(questions[selectedQuestion.question_number]);
    }
    else{
      setSelectedGroupNumber(selectedGroupNumber + 1);
      setSelectedQuestionGroup(questions.filter(question => question.question_group_number == questionGroupCount[selectedGroupNumber]));
    }
  }

  console.log(questionGroupCount.length);
  console.log(answers);
  console.log(selectedQuestionGroup[0]?.question_group_number);
  
  const onSubmit = async () => {
    try {
      const completedTest: CompletePracticeTestDTO = {
        practiceTestId: selectedPracticeTest?._id || "",
        choices: answers,
      };
      console.log(completedTest);
      console.log(userId);
      const response = await practiceService.completePracticeTest(
        userId,
        completedTest
      );
      if (response.EC === 0) {
        console.log("Submit success");
        practiceStore.set(
          (state) =>
            (state.value.completedPracticeTests = [
              ...state.value.completedPracticeTests,
              response.DT,
            ])
        );
        nav("/practice");
      } else {
        console.log("Submit failed" + response.EM);
      }
    } catch (error) {
      console.log("Submit failed" + error);
    }
  };
  
  if((Number(part) == 1 || Number(part) == 2 || Number(part) == 5) && !selectedQuestion){ 
    return <LoadingProgress />;
  }
  
  if((Number(part) == 3 || Number(part) == 4 || Number(part) == 6 || Number(part) == 7) && selectedQuestionGroup.length == 0){
    return <LoadingProgress />;
  }

  return (
    <div className="">
      <div className="content flex flex-row items-stretch gap-2 overflow-hidden">
        <LeftBar />
        <div className="max-w-[1200px] p-6 w-full min-h-screen flex flex-col gap-2">
          <div className="information w-full flex flex-row justify-between">
            <h3 className="font-normal text-3xl text-[#000]">
              {(Number(part) == 1 || Number(part) == 2 || Number(part) == 5) ? `
                Question ${(selectedQuestion?.question_number || 0)}` : `Question group ${selectedGroupNumber}`}
            </h3>
            <CountingTimer key={id} />
            <Button
              style={{
                backgroundColor: "#00C552",
                padding: "7px 20px 7px",
                fontSize: "18px",
                fontWeight: "700",
                borderRadius: "10px",
                marginRight: "24px",
                color: "#fff",
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
          <div className="w-full bg-[#fff] rounded-[20px] px-7 py-6 mb-[16px]">
            {Number(part) == 1 || Number(part) == 2 || Number(part) == 5 ? (
              <QuestionComponent
                ans={answers}
                key={selectedQuestion.question_number}
                question={selectedQuestion}
                onChoose={onChoose}
              />
            ) : (
              <QuestionsGroup
                key={selectedQuestionGroup[0]?.question_group_number}
                ans={answers}
                questions={selectedQuestionGroup}
                onChoose={onChoose}
              />)
            }
            <div className="w-full flex flex-row justify-between">
              {
                selectedGroupNumber > 1 || selectedQuestion?.question_number > 1 ? (
                  <Button
                    style={{
                      padding: "7px 20px 7px",
                      backgroundColor: "#00205C",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderRadius: "10px",
                      marginRight: "24px",
                      textTransform: "none",
                      color: "#fff",
                    }}
                    variant="contained"
                    color="success"
                    onClick={handlePreviousButtonClick}
                  >
                    Previous
                  </Button>
                ) : (
                  <div></div>)
              }
              {
                selectedGroupNumber < questionGroupCount.length ||  (selectedQuestion && selectedQuestion.question_number < questions.length) ? (
                  <Button
                    style={{
                      padding: "7px 20px 7px",
                      backgroundColor: "#00205C",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderRadius: "10px",
                      marginRight: "24px",
                      textTransform: "none",
                      color: "#fff",
                    }}
                    variant="contained"
                    color="success"
                    onClick={handleNextButtonClick}
                  >
                    Next
                  </Button>
                ) : (
                  <div></div>
                )
              }
            </div>
          </div>
          {Number(part) == 1 || Number(part) == 2 || Number(part) == 5 ? (
            <PracticeQuestionPallete
              answers={answers}
              selectedQuestion={selectedQuestion?.question_number || 0}
              questionNumber={questions.length}
              onQuestionSelectedChange={handleQuestionSelectedChange}
            />
          ) : (
            <PracticeQuestionPallete
              answers={answers}
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
