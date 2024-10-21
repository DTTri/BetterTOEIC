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
  // <Route
  //       path="/doing-roadmap/:phase/:part/:chapter"
  //       element={<DoingRoadmapExsPage />}
  //     />
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionGroupLength, setQuestionGroupLength] = useState(1);
  const params = useParams();
  // parse the params to get the phase, part, chapter
  if (!params.phase || !params.part || !params.chapter) {
    return <div>Invalid params</div>;
  }
  const phase = parseInt(params.phase, 10);
  const part = parseInt(params.part, 10);
  const chapter = parseInt(params.chapter, 10);
  if (isNaN(phase) || isNaN(part) || isNaN(chapter)) {
    return <div>Invalid params</div>;
  }
  console.log(phase, part, chapter);

  // const unlockedChapters = useSelector(...)

  // const roadmapExercises = useSelector(...) base on phase and part
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
    if (part === 3 || part === 4 || part === 6 || part === 7) {
      return (
        <>
          {questions.map((question, index) => {
            if (
              (index !== 0 &&
                questions[index - 1].question_group_id !==
                  question.question_group_id) ||
              index === questions.length - 1
            ) {
              const prevStartIndex = startIndexOfQuestionGroup;
              startIndexOfQuestionGroup = index;
              setQuestionGroupLength(
                startIndexOfQuestionGroup - prevStartIndex
              );
              return (
                <button
                  className={`question-item bg-gray-400 text-black rounded-lg w-8 h-8 ${
                    currentQuestion === prevStartIndex + 1
                      ? "bg-primary text-white"
                      : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setCurrentQuestion(index + 1);
                    setQuestionGroupLength(
                      startIndexOfQuestionGroup - prevStartIndex - 1
                    );
                    questionGroup.length = 0;
                  }}
                >
                  {prevStartIndex + 1}-
                  {prevStartIndex + 1 + questionGroupLength}
                </button>
              );
            }
          })}
        </>
      );
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
        <div className="w-full bg-white rounded-xl p-4">
          {part === 3 || part === 4 || part === 6 || part === 7
            ? questions.map((question, index) => {
                if (part < 5) {
                  if (
                    index + 1 >= currentQuestion &&
                    index + 1 <= currentQuestion + questionGroupLength
                  ) {
                    return <Question key={index} question={question} />;
                  }
                  return null;
                } else {
                  if (
                    index + 1 >= currentQuestion &&
                    index + 1 <= currentQuestion + questionGroupLength
                  ) {
                    questionGroup.push(question);
                  }
                  if (questionGroup.length === questionGroupLength) {
                    console.log("Current question: ", currentQuestion);
                    console.log("QuestionGroupLength: ", questionGroupLength);

                    return (
                      <QuestionsGroup key={index} questions={questionGroup} />
                    );
                  }
                }
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
            {/* specifically with part 3,4,6,7; those are questionGroups -> so each element in the
            roadmapExercises.chapters[chapter - 1].questions not rendered as a button, but a questionGroup is a button
            questionGroup is created by combining multiple questions have the same question_group_id */}
            {/* create a QuestionButtonsList component to handle this */}
            {/* {Array.from({
              length: roadmapExercises.chapters[chapter - 1].questions.length,
            }).map((_, index) => (
              <button
                className={`question-item bg-gray-400 text-black rounded-lg w-8 h-8 ${
                  currentQuestion === index + 1 ? "bg-primary text-white" : ""
                }`}
                key={index}
                onClick={() => setCurrentQuestion(index + 1)}
              >
                {index + 1}
              </button>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
