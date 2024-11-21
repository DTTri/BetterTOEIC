import {
  ChaptersListContainer,
  ListeningAudio,
  QuestionComponent,
  QuestionsGroup,
  Timer,
} from "@/components";
import { useNavigate, useParams } from "react-router-dom";
import { Question, RoadmapExercise } from "@/entities";
import { useEffect, useState } from "react";
import { roadmapService } from "@/services";
import { CompleteRoadmapExerciseDTO } from "@/entities/dtos";
import { Button } from "@mui/material";
import { sUser } from "@/store";
export default function DoingRoadmapExsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionGroupLength, setQuestionGroupLength] = useState(1);
  const [roadmapExercise, setRoadmapExercise] = useState<RoadmapExercise>({
    _id: "",
    phase: 0,
    part: 0,
    chapter: 0,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: "",
    questions: [],
  });
  const [answers, setAnswers] = useState<number[]>([]);
  const params = useParams();
  const nav = useNavigate();
  const roadmapExerciseId = params.roadmapExerciseId;
  const userId = sUser.use((state) => state.id);

  useEffect(() => {
    if (!roadmapExerciseId) {
      nav("/");
    } else {
      const fetchRoadmapExercise = async () => {
        try {
          console.log("fetch roadmap exercise");
          const res = await roadmapService.getRoadmapExerciseById(
            roadmapExerciseId
          );
          if (res.EC === 0) {
            console.log("Roadmap exercise fetched: " + res.DT);
            setRoadmapExercise(res.DT as RoadmapExercise);
            setAnswers(Array(res.DT.questions.length).fill(0));
          } else {
            nav("/");
            console.log(res.EM);
          }
        } catch (err) {
          nav("/");
          console.log(err);
        }
      };
      fetchRoadmapExercise();
    }
  }, [roadmapExerciseId, nav]);

  // Initialize question group length on first render
  useEffect(() => {
    if (!roadmapExercise) return;
    setCurrentQuestion(1);
    if (
      roadmapExercise.part === 3 ||
      roadmapExercise.part === 4 ||
      roadmapExercise.part === 6 ||
      roadmapExercise.part === 7
    ) {
      if (roadmapExercise.questions[0].question_group_number === 1) {
        setQuestionGroupLength(
          roadmapExercise.questions.filter(
            (question) => question.question_group_number === 1
          ).length
        );
      } else {
        setQuestionGroupLength(1);
      }
    }
  }, [roadmapExercise]);

  const onChoose = (choice: number, question_number: number) => {
    setAnswers((prev) => {
      prev[question_number] = choice;
      return [...prev];
    });
  };

  const onSubmit = async () => {
    try {
      const completedRoadmapExercise: CompleteRoadmapExerciseDTO = {
        roadmapExerciseId: roadmapExercise._id,
        choices: answers,
      };
      console.log("Completed roadmap exercise: ", completedRoadmapExercise);
      const response = await roadmapService.completeRoadmapExercise(
        userId,
        completedRoadmapExercise
      );
      if (response.EC === 0) {
        console.log("Submit success");
        nav("/roadmap");
      } else {
        console.log("Submit failed" + response.EM);
      }
    } catch (error) {
      console.log("Submit failed" + error);
    }
  };

  const questionGroup: Question[] = [];

  function QuestionButtonsList() {
    let startIndexOfQuestionGroup = 0;
    const buttons = [];
    if (
      roadmapExercise.part === 3 ||
      roadmapExercise.part === 4 ||
      roadmapExercise.part === 6 ||
      roadmapExercise.part === 7
    ) {
      for (let index = 0; index < roadmapExercise.questions.length; index++) {
        const question = roadmapExercise.questions[index];
        if (
          index !== 0 &&
          roadmapExercise.questions[index - 1].question_group_number !==
            question.question_group_number
        ) {
          const prevStartIndex = startIndexOfQuestionGroup;
          startIndexOfQuestionGroup = index;
          const groupLength = startIndexOfQuestionGroup - prevStartIndex;
          const isCurrentGroup = currentQuestion === prevStartIndex + 1;
          const isGroupAnswered = roadmapExercise.questions
            .slice(prevStartIndex, startIndexOfQuestionGroup)
            .every((q) => answers[q.question_number - 1] !== 0);
          buttons.push(
            <button
              className={`question-item rounded-lg w-8 h-8 ${
                isCurrentGroup
                  ? "bg-blue-400 text-white"
                  : isGroupAnswered
                  ? "bg-primary text-white"
                  : "bg-gray-400 text-black"
              }`}
              key={prevStartIndex}
              onClick={() => {
                setCurrentQuestion(prevStartIndex + 1);
                setQuestionGroupLength(groupLength);
              }}
            >
              {prevStartIndex + 1}-{startIndexOfQuestionGroup}
            </button>
          );
        }
      }
      // Handle the last group
      if (startIndexOfQuestionGroup < roadmapExercise.questions.length) {
        const prevStartIndex = startIndexOfQuestionGroup;
        const groupLength = roadmapExercise.questions.length - prevStartIndex;
        const isCurrentGroup = currentQuestion === prevStartIndex + 1;
        const isGroupAnswered = roadmapExercise.questions
          .slice(prevStartIndex, roadmapExercise.questions.length)
          .every((q) => answers[q.question_number - 1] !== 0);
        buttons.push(
          <button
            className={`question-item rounded-lg w-8 h-8 ${
              isCurrentGroup
                ? "bg-blue-400 text-white"
                : isGroupAnswered
                ? "bg-primary text-white"
                : "bg-gray-400 text-black"
            }`}
            key={roadmapExercise.questions.length}
            onClick={() => {
              setCurrentQuestion(prevStartIndex + 1);
              setQuestionGroupLength(groupLength);
            }}
          >
            {prevStartIndex + 1}-{roadmapExercise.questions.length}
          </button>
        );
      }
      return <>{buttons}</>;
    }
    return (
      <>
        {roadmapExercise.questions.map((_, index) => {
          const isCurrentQuestion = currentQuestion === index + 1;
          const isQuestionAnswered = answers[index] !== 0;
          return (
            <button
              className={`question-item rounded-lg w-8 h-8 ${
                isCurrentQuestion
                  ? "bg-blue-400 text-white"
                  : isQuestionAnswered
                  ? "bg-primary text-white"
                  : "bg-gray-400 text-black"
              }`}
              key={index}
              onClick={() => setCurrentQuestion(index + 1)}
            >
              {index + 1}
            </button>
          );
        })}
      </>
    );
  }

  return (
    <div className="bg-background w-full h-screen flex justify-between p-4">
      <ChaptersListContainer
        phase={roadmapExercise.phase}
        part={roadmapExercise.part}
        chapter={roadmapExercise.chapter}
        unlockedChapters={4}
      />
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="w-full flex items-center gap-4">
          <Timer onEnd={onSubmit} />
          {roadmapExercise.part < 5 && <ListeningAudio />}
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Submit
          </Button>
        </div>
        <div className="questions-container w-full bg-white rounded-xl p-4 h-[70vh] overflow-y-auto overflow-x-hidden">
          {roadmapExercise.part === 3 ||
          roadmapExercise.part === 4 ||
          roadmapExercise.part === 6 ||
          roadmapExercise.part === 7
            ? roadmapExercise.questions.map((question, index) => {
                if (
                  index + 1 >= currentQuestion &&
                  index + 1 < currentQuestion + questionGroupLength
                ) {
                  questionGroup.push(question);
                }
                if (index + 1 === currentQuestion + questionGroupLength - 1) {
                  console.log("Current question: ", currentQuestion);
                  console.log("QuestionGroupLength: ", questionGroupLength);
                  console.log("questionGroup.length: ", questionGroup.length);
                  return (
                    <QuestionsGroup
                      key={index}
                      questions={questionGroup}
                      ans={answers}
                      onChoose={onChoose}
                    />
                  );
                }
                return null;
              })
            : roadmapExercise.questions.map((question, index) => {
                if (index + 1 === currentQuestion) {
                  return (
                    <QuestionComponent
                      key={index}
                      question={question}
                      ans={answers}
                      onChoose={onChoose}
                    />
                  );
                }
                return null;
              })}
        </div>
        <div className="w-full bg-white rounded-xl p-4">
          <h3 className="text-xl font-semibold text-black mb-4">Questions</h3>
          <div className="questions-list flex items-center gap-1">
            <QuestionButtonsList />
          </div>
        </div>
      </div>
    </div>
  );
}
