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
import CompleteTestDTO from "@/entities/DTOS/CompleteTestDTO";
import QuestionReviewComponent from "@/components/test/QuestionReviewComponent";

export default function ReviewTestPage() {
  const { id } = useParams();
  const selectedTest = testStore
    .use((pre) => pre.testList)
    .find((test) => test._id === id);
  const userId = sUser.use((state) => state.info._id);

  const testHistory = testStore.use((state) => state.testHistory).find((test) => test.testId === id);

  const nav = useNavigate();
  const [currentPart, setCurrentPart] = useState(1);

  const onMoveToChosenQuestion = (question_number: number) => {
    setCurrentPart(selectedTest?.questions[question_number].part || 1);
  };

  if(!testHistory) {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
            <div className="text-2xl font-bold">You haven't taken this test yet</div>
            <Button onClick={() => nav("/test")} variant="contained" color="primary" sx={{ textTransform: "none" }}>Back to test</Button>
        </div>
    )
  }
  return (
    <div className="bg-background">
      <div className="max-w-[1500px] content py-3 px-12 m-auto overflow-hidden">
        <div className="test-ui flex flex-row gap-5 w-full items-start">
          <QuestionsListContainer
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
            {
                selectedTest?.questions.map((question, index) => {
                    if (question.part === currentPart) {
                        return (
                            <QuestionReviewComponent
                                key={index}
                                choice={testHistory?.choices[index]}
                                question={question}
                            />
                        );
                    }
                })
            }
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
                    nav("/test");
                  }
                }}
              >
                {currentPart !== 7 ? "Next part" : "Back"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
