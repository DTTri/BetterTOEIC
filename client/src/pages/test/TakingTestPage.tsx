// This is just a stub code (mock code)
import Question from "@/entities/Question";
import { testStore } from "@/store/testStore";
import { sUser } from "@/store";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListeningAudio from "../../components/test/ListeningAudio";
import QuestionComponent from "../../components/test/QuestionComponent";
import QuestionsGroup from "../../components/test/QuestionsGroup";
import QuestionsListContainer from "../../components/test/QuestionsListContainer";
import Timer from "../../components/test/Timer";
import { testService } from "@/services";
import CompleteTestDTO from "@/entities/dtos/CompleteTestDTO";

export default function TakingTestPage() {
  const { id } = useParams();
  const selectedTest = testStore
    .use((pre) => pre.testList)
    .find((test) => test._id === id);
  const userId = sUser.use((state) => state.id);

  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState<number[]>(Array(200).fill(0));

  const nav = useNavigate();

  const onChoose = (choice: number, question_number: number) => {
    setAnswers((prev) => {
      prev[question_number] = choice;
      return [...prev];
    });
  };

  const countCorrectAnswerPerPart = () => {
    let correctAnswerPerPart: number[] = Array(7).fill(0);
    for (let i = 1; i <= 7; i++) {
      let correctAnswer = 0;
      selectedTest?.questions.forEach((question) => {
        if (question.part === i) {
          if (
            question.correct_choice === answers[question.question_number - 1]
          ) {
            correctAnswer++;
          }
        }
      });
      correctAnswerPerPart[i - 1] = correctAnswer;
    }
    return correctAnswerPerPart;
  };

  const onSubmit = async () => {
    try {
      const correctAnswersPerPart = countCorrectAnswerPerPart();
      const completedTest: CompleteTestDTO = {
        testId: selectedTest?._id || "",
        correctAnswersPerPart: correctAnswersPerPart,
        choices: answers,
      };
      const response = await testService.completeTest(userId, completedTest);
      if (response.EC === 0) {
        console.log("Submit success");
        nav("/test/:" + selectedTest?._id);
      } else {
        console.log("Submit failed" + response.EM);
      }
    } catch (error) {
      console.log("Submit failed" + error);
    }
  };

  const onMoveToChosenQuestion = (question_number: number) => {
    setCurrentPart(selectedTest?.questions[question_number].part || 1);
  };

  const questionsPart1To5 = selectedTest?.questions.filter(
    (question) => question.part < 6
  );
  const questionsPart6AndAbove = selectedTest?.questions.filter(
    (question) => question.part >= 6
  );
  //console.log(questionsPart6AndAbove);
  let questionGroup: Question[] = [];
  return (
    <div className="bg-background">
      <div className="max-w-[1500px] content py-3 px-12 m-auto overflow-hidden">
        <div className="info-test flex flex-row items-center justify-between mb-5">
          {/* Add  break when time out*/}
          <Timer onEnd={onSubmit}></Timer>
          {/* Add link to audio*/}
          <ListeningAudio></ListeningAudio>
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
        <div className="test-ui flex flex-row gap-5 w-full items-start">
          <QuestionsListContainer
            ans={answers}
            onMoveToChosenQuestion={onMoveToChosenQuestion}
          ></QuestionsListContainer>
          <div className="Question-lists w-full bg-[#ffffff] rounded-[20px] py-8 px-10">
            <div className="parts flex flex-row gap-4 mb-5">
              <Button
                onClick={() => setCurrentPart(1)}
                variant="contained"
                style={{
                  backgroundColor: currentPart === 1 ? "#0063F3" : "#EEE",
                  color: currentPart === 1 ? "#FFFFFF" : "#000000",
                  padding: "5px 10px 5px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "10px",
                  textWrap: "nowrap",
                }}
              >
                Part 1
              </Button>
              <Button
                onClick={() => setCurrentPart(2)}
                variant="contained"
                style={{
                  backgroundColor: currentPart === 2 ? "#0063F3" : "#EEE",
                  color: currentPart === 2 ? "#FFFFFF" : "#000000",
                  padding: "5px 10px 5px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "10px",
                  textWrap: "nowrap",
                }}
              >
                Part 2
              </Button>
              <Button
                onClick={() => setCurrentPart(3)}
                variant="contained"
                style={{
                  backgroundColor: currentPart === 3 ? "#0063F3" : "#EEE",
                  color: currentPart === 3 ? "#FFFFFF" : "#000000",
                  padding: "5px 10px 5px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "10px",
                  textWrap: "nowrap",
                }}
              >
                Part 3
              </Button>
              <Button
                onClick={() => setCurrentPart(4)}
                variant="contained"
                style={{
                  backgroundColor: currentPart === 4 ? "#0063F3" : "#EEE",
                  color: currentPart === 4 ? "#FFFFFF" : "#000000",
                  padding: "5px 10px 5px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "10px",
                  textWrap: "nowrap",
                }}
              >
                Part 4
              </Button>
              <Button
                onClick={() => setCurrentPart(5)}
                variant="contained"
                style={{
                  backgroundColor: currentPart === 5 ? "#0063F3" : "#EEE",
                  color: currentPart === 5 ? "#FFFFFF" : "#000000",
                  padding: "5px 10px 5px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "10px",
                  textWrap: "nowrap",
                }}
              >
                Part 5
              </Button>
              <Button
                onClick={() => setCurrentPart(6)}
                variant="contained"
                style={{
                  backgroundColor: currentPart === 6 ? "#0063F3" : "#EEE",
                  color: currentPart === 6 ? "#FFFFFF" : "#000000",
                  padding: "5px 10px 5px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "10px",
                  textWrap: "nowrap",
                }}
              >
                Part 6
              </Button>
              <Button
                onClick={() => setCurrentPart(7)}
                variant="contained"
                style={{
                  backgroundColor: currentPart === 7 ? "#0063F3" : "#EEE",
                  color: currentPart === 7 ? "#FFFFFF" : "#000000",
                  padding: "5px 10px 5px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "10px",
                  textWrap: "nowrap",
                }}
              >
                Part 7
              </Button>
            </div>
            {/* // Map questions until part 5 */}
            {questionsPart1To5?.map((question, index) => {
              //console.log(question.part, question._id);
              return (
                question.part === currentPart && (
                  <QuestionComponent
                    ans={answers}
                    onChoose={onChoose}
                    key={index}
                    question={question}
                  />
                )
              );
            })}
            {questionsPart6AndAbove?.map((question, index) => {
              if (
                index > 0 &&
                questionsPart6AndAbove[index - 1].part !== currentPart
              ) {
                questionGroup = [];
              }
              let questionGroupForPassing = [...questionGroup];
              if (
                (questionGroup.length < 1 ||
                  question.question_group_number ===
                    selectedTest?.questions[
                      questionsPart1To5?.length || 0 + index - 1
                    ].question_group_number) &&
                index < questionsPart6AndAbove.length - 1 &&
                questionsPart6AndAbove[index + 1].part === currentPart
              ) {
                questionGroup.push(question);
              } else {
                questionGroupForPassing = [...questionGroup];

                questionGroup = [];
                if (
                  index < questionsPart6AndAbove.length - 1 &&
                  questionsPart6AndAbove[index + 1].part === currentPart
                ) {
                  questionGroup.push(question);
                }
                //console.log(questionGroupForPassing);
                return (
                  question.part === currentPart && (
                    <QuestionsGroup
                      ans={answers}
                      onChoose={onChoose}
                      key={index}
                      questions={questionGroupForPassing}
                    />
                  )
                );
              }
            })}
            <div className="w-full flex ">
              <Button
                style={{
                  backgroundColor: currentPart !== 7 ? "#0063F3" : "#00C552",
                  padding: "5px 15px 5px",
                  fontSize: "18px",
                  fontWeight: "500",
                  borderRadius: "10px",
                  marginTop: "24px",
                  marginLeft: "auto",
                }}
                variant="contained"
                color="success"
                sx={{ textTransform: "none" }}
                onClick={() => {
                  if (currentPart < 7) {
                    setCurrentPart((prev) => prev + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    onSubmit();
                  }
                }}
              >
                {currentPart !== 7 ? "Next part" : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
