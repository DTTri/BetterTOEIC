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
  const params = useParams();
  const nav = useNavigate();
  const roadmapExerciseId = params.roadmapExerciseId;
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
            setRoadmapExercise(res.DT as RoadmapExercise);
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
      if (startIndexOfQuestionGroup < roadmapExercise.questions.length) {
        const prevStartIndex = startIndexOfQuestionGroup;
        const groupLength = roadmapExercise.questions.length - prevStartIndex;
        buttons.push(
          <button
            className={`question-item bg-gray-400 text-black rounded-lg w-8 h-8 ${
              currentQuestion === prevStartIndex + 1
                ? "bg-primary text-white"
                : ""
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
        {roadmapExercise.questions.map((_, index) => (
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
    <div className="bg-background w-full h-screen flex justify-between p-4">
      <ChaptersListContainer
        phase={roadmapExercise.phase}
        part={roadmapExercise.part}
        chapter={roadmapExercise.chapter}
        unlockedChapters={4}
      />
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="w-full flex items-center gap-4">
          <Timer onEnd={() => {}} />
          {roadmapExercise.part < 5 && <ListeningAudio />}
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
                    <QuestionsGroup key={index} questions={questionGroup} />
                  );
                }
                return null;
              })
            : roadmapExercise.questions.map((question, index) => {
                if (index + 1 === currentQuestion) {
                  return <QuestionComponent key={index} question={question} />;
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
