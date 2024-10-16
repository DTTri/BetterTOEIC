// This is just a stub code (mock code)
import { useState } from "react";
import Header from "../../components/Header";
import Timer from "../../components/test/Timer";
import ListeningAudio from "../../components/test/ListeningAudio";
import QuestionsListContainer from "../../components/test/QuestionsListContainer";
import QuestionsGroup from "../../components/test/QuestionsGroup";
import QuestionComponent from "../../components/test/QuestionComponent";
import { Button } from "@mui/material";
import dataTest from "../../data/test";
import Question from "@/entities/Question";

export default function TakingTestPage() {
  const [currentPart, setCurrentPart] = useState(1);
  const dataForTest = dataTest;
  const [questionGroup, setQuestionGroup] = useState<Question[]>([]);
  return (
    <div className="bg-background">
      <Header></Header>
      <div className="content py-3 px-12 m-auto">
        <div className="info-test flex flex-row items-center justify-between mb-5">
          <Timer></Timer>
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
          >
            Submit
          </Button>
        </div>
        <div className="test-ui flex flex-row gap-5 w-full ">
          <QuestionsListContainer></QuestionsListContainer>
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

            {dataForTest.questions.map((question, index) => {
              if (currentPart < 6)
                return (
                  question.part === currentPart && (
                    <QuestionComponent key={index} question={question} />
                  )
                );
              else {
                console.log(question.part, question._id);
                let questionGroupForPassing = [...questionGroup];
                if (
                  questionGroup.length < 1 ||
                  question.question_group_id ===
                    dataForTest.questions[index - 1].question_group_id
                ) {
                  setQuestionGroup([...questionGroup, question]);
                } else {
                  questionGroupForPassing = [...questionGroup];
                  console.log(questionGroupForPassing);

                  setQuestionGroup([question]);
                  return (
                    question.part === currentPart && (
                      <QuestionsGroup
                        key={index}
                        questions={questionGroupForPassing}
                      />
                    )
                  );
                }
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
