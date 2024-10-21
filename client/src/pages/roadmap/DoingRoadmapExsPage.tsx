import {
  ChaptersListContainer,
  ListeningAudio,
  Question,
  QuestionsGroup,
  Timer,
} from "@/components";
import { useParams } from "react-router-dom";
import {
  roadmapExPhase1Part1,
  roadmapExPhase1Part2,
  roadmapExPhase1Part3,
  roadmapExPhase1Part4,
  roadmapExPhase1Part5,
  roadmapExPhase1Part6,
  roadmapExPhase1Part7,
} from "@/data/RoadmapExercise";
import { RoadmapExercise } from "@/entities";
import { useEffect, useState } from "react";

export default function DoingRoadmapExsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionGroupLength, setQuestionGroupLength] = useState(1);
  const params = useParams();

  // Reset state when URL parameters change
  useEffect(() => {
    setCurrentQuestion(1);
    setQuestionGroupLength(1);
    console.log("Reset state", params.chapter);
  }, [params.phase, params.part, params.chapter]);

  // Parse the params to get the phase, part, chapter
  if (!params.phase || !params.part || !params.chapter) {
    return <div>Invalid params</div>;
  }
  const phase = parseInt(params.phase, 10);
  const part = parseInt(params.part, 10);
  const chapter = parseInt(params.chapter, 10);
  if (isNaN(phase) || isNaN(part) || isNaN(chapter)) {
    return <div>Invalid params</div>;
  }
  console.log(phase, part, chapter, currentQuestion, questionGroupLength);

  let roadmapExercises: RoadmapExercise;
  switch (part) {
    case 1:
      roadmapExercises = roadmapExPhase1Part1;
      break;
    case 2:
      roadmapExercises = roadmapExPhase1Part2;
      break;
    case 3:
      roadmapExercises = roadmapExPhase1Part3;
      break;
    case 4:
      roadmapExercises = roadmapExPhase1Part4;
      break;
    case 5:
      roadmapExercises = roadmapExPhase1Part5;
      break;
    case 6:
      roadmapExercises = roadmapExPhase1Part6;
      break;
    default:
      roadmapExercises = roadmapExPhase1Part7;
  }
  const questions = roadmapExercises.chapters[chapter - 1].questions;

  const questionGroup: Question[] = [];

  function QuestionButtonsList() {
    let startIndexOfQuestionGroup = 0;
    let buttons = [];
    if (part === 3 || part === 4 || part === 6 || part === 7) {
      for (let index = 0; index < questions.length; index++) {
        const question = questions[index];
        if (
          index !== 0 &&
          questions[index - 1].question_group_id !== question.question_group_id
        ) {
          const prevStartIndex = startIndexOfQuestionGroup;
          startIndexOfQuestionGroup = index;
          const groupLength = startIndexOfQuestionGroup - prevStartIndex;
          buttons.push(
            <button
              className={`question-item bg-gray-400 text-black rounded-lg w-8 h-8 ${
                currentQuestion === prevStartIndex + 1
                  ? "bg-primary text-white"
                  : ""
              }`}
              key={index}
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
      if (startIndexOfQuestionGroup < questions.length) {
        const prevStartIndex = startIndexOfQuestionGroup;
        const groupLength = questions.length - prevStartIndex;
        buttons.push(
          <button
            className={`question-item bg-gray-400 text-black rounded-lg w-8 h-8 ${
              currentQuestion === prevStartIndex + 1
                ? "bg-primary text-white"
                : ""
            }`}
            key={questions.length}
            onClick={() => {
              setCurrentQuestion(prevStartIndex + 1);
              setQuestionGroupLength(groupLength);
            }}
          >
            {prevStartIndex + 1}-{questions.length}
          </button>
        );
      }
      return <>{buttons}</>;
    }
    return (
      <>
        {questions.map((_, index) => (
          <button
            className={`question-item bg-gray-400 text-black rounded-lg w-8 h-8 ${
              currentQuestion === index + 1 ? "bg-primary text-white" : ""
            }`}
            key={index}
            onClick={() => setCurrentQuestion(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </>
    );
  }

  return (
    <div className="bg-background w-full flex justify-between p-4">
      <ChaptersListContainer
        phase={phase}
        part={part}
        chapter={chapter}
        unlockedChapters={4}
      />
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="w-full flex items-center gap-4">
          <Timer />
          {part < 5 && <ListeningAudio />}
        </div>
        <div className="questions-container w-full bg-white rounded-xl p-4">
          {part === 3 || part === 4 || part === 6 || part === 7
            ? questions.map((question, index) => {
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
                    <QuestionsGroup key={index} questions={questionGroup} />
                  );
                }
                return null;
              })
            : questions.map((question, index) => {
                if (index + 1 === currentQuestion) {
                  return <Question key={index} question={question} />;
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
