import Question from "@/entities/Question";
import { testStore } from "@/store/testStore";
import { sCreatingPersonalRoadmap, sUser } from "@/store";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListeningAudio from "../../components/LRtest/ListeningAudio";
import QuestionComponent from "../../components/LRtest/QuestionComponent";
import QuestionsGroup from "../../components/LRtest/QuestionsGroup";
import QuestionsListContainer from "../../components/LRtest/QuestionsListContainer";
import Timer from "../../components/LRtest/Timer";
import { testService } from "@/services";

import ClassifyTestScore from "@/utils/ClassifyTestScore";
import CompleteTestDTO from "@/entities/DTOS/CompleteTestDTO";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { QuestionComponentSkeleton } from "@/components/LRtest/skeletons";

export default function TakingTestPage({ isEvaluation = false }) {
  const { id } = useParams();
  const selectedTest = testStore
    .use((pre) => pre.testList)
    .find((test) => test._id === id);
  const userId = sUser.use((state) => state.info._id);

  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState<number[]>(Array(200).fill(0));

  const nav = useNavigate();

  const onChoose = (choice: number, question_number: number) => {
    setAnswers((prev) => {
      prev[question_number] = choice;
      return [...prev];
    });
  };

  // const countCorrectAnswerPerPart = () => {
  //   const correctAnswerPerPart: number[] = Array(7).fill(0);
  //   for (let i = 1; i <= 7; i++) {
  //     let correctAnswer = 0;
  //     selectedTest?.questions.forEach((question, index) => {
  //       if (question.part === i) {
  //         if (question.correct_choice === answers[index]) {
  //           console.log(question.correct_choice);
  //           console.log(answers[index]);
  //           correctAnswer++;
  //         }
  //       }
  //     });
  //     correctAnswerPerPart[i - 1] = correctAnswer;
  //   }
  //   return correctAnswerPerPart;
  // };

  const onSubmit = async () => {
    try {
      const completedTest: CompleteTestDTO = {
        testId: selectedTest?._id || "",
        choices: answers,
      };
      const response = await testService.completeTest(userId, completedTest);
      if (response.EC === 0) {
        console.log("Success: " + response.DT);
        if (isEvaluation) {
          sCreatingPersonalRoadmap.set((prev) => {
            prev.value.startLevel = ClassifyTestScore(response.DT.score);
            prev.value.evaluationTestScore = response.DT.score;
          });
          nav("/creating-roadmap");
        } else {
          testStore.set((prev) => prev.value.testHistory.push(response.DT));
          nav("/test/" + selectedTest?._id);
        }
      } else {
        console.log("Submit failed" + response.EM);
      }
    } catch (error) {
      console.log("Submit failed" + error);
    }
  };

  const onMoveToChosenQuestion = (question_number: number) => {
    setCurrentPart(selectedTest?.questions[question_number].part || 1);
    setTimeout(() => {
      document
        .getElementById((question_number + 1).toString())
        ?.scrollIntoView();
    }, 150);
  };

  const singleQuestionParts = selectedTest?.questions.filter(
    (question) => question.part < 3 || question.part === 5
  );
  const questionGroupParts = selectedTest?.questions.filter(
    (question) => question.part >= 3 && question.part !== 5
  );

  let questionGroup: Question[] = [];

  return (
    <div className="bg-background">
      <div className="max-w-[1500px] content py-3 px-12 m-auto overflow-hidden">
        <div className="info-test flex flex-row items-center justify-between mb-5">
          <Timer onEnd={onSubmit}></Timer>
          <ListeningAudio
            audioFile={selectedTest?.main_audio || ""}
          ></ListeningAudio>
          <Button
            style={{
              backgroundColor: "#00C552",
              padding: "7px 20px 7px",
              fontSize: "18px",
              fontWeight: "700",
              borderRadius: "10px",
              marginRight: "24px",
              color: "#FFFFFF",
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
              {[...Array(7)].map((_, i) => (
                <Button
                  key={i}
                  onClick={() => setCurrentPart(i + 1)}
                  variant="contained"
                  style={{
                    backgroundColor: currentPart === i + 1 ? "#0063F3" : "#EEE",
                    color: currentPart === i + 1 ? "#FFFFFF" : "#000000",
                    padding: "5px 10px 5px",
                    fontSize: "16px",
                    fontWeight: "600",
                    borderRadius: "10px",
                    textWrap: "nowrap",
                  }}
                >
                  Part {i + 1}
                </Button>
              ))}
            </div>
            {/* Map questions until part 2 */}
            {singleQuestionParts?.map((question, index) => {
              return (
                question.part === currentPart && (
                  <LazyLoadComponent
                    placeholder={<QuestionComponentSkeleton />}
                  >
                    <QuestionComponent
                      ans={answers}
                      onChoose={onChoose}
                      key={index}
                      question={question}
                    />
                  </LazyLoadComponent>
                )
              );
            })}
            {questionGroupParts?.map((question, index) => {
              if (
                index > 0 &&
                questionGroupParts[index - 1].question_group_number !==
                  question.question_group_number
              ) {
                questionGroup = [];
              }
              questionGroup.push(question);
              if (
                index === questionGroupParts.length - 1 ||
                questionGroupParts[index + 1].question_group_number !==
                  question.question_group_number
              ) {
                const questionGroupForPassing = [...questionGroup];
                questionGroup = [];
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
              return null;
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
                  color: "#FFFFFF",
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
