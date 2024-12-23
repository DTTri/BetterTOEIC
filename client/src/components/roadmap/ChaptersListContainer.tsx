import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { sRoadmap } from "@/store";
import { RoadmapExercise, RoadmapHistory } from "@/entities";
function NumberOfQuestions({
  numberOfQuestions,
  isDone,
}: {
  numberOfQuestions: number;
  isDone: boolean;
}) {
  return (
    <div
      className={` rounded-3xl  w-8 h-8 flex justify-center items-center text-sm ${
        isDone ? "bg-tertiary text-black" : "bg-primary text-white"
      }`}
    >
      {numberOfQuestions}
    </div>
  );
}
function ChapterItem({
  chapter,
  isUnlocked,
  isDone,
  currentChapter,
  numberOfQuestions,
  onClick,
}: {
  chapter: number;
  isUnlocked: boolean;
  isDone: boolean;
  currentChapter: number;
  numberOfQuestions: number;
  onClick?: () => void;
}) {
  return (
    <div
      className={`chapter-item w-full h-12 min-w-56 px-2 flex justify-between items-center rounded-3xl relative ${
        isDone
          ? "bg-primary text-white"
          : (isUnlocked ? "bg-tertiary" : "bg-gray-400") + " text-black"
      }
          ${
            currentChapter === chapter
              ? "scale-105 shadow-md shadow-primary"
              : ""
          }
      `}
      onClick={isUnlocked ? onClick : () => {}}
    >
      {currentChapter === chapter && (
        <ArrowRightIcon
          className="absolute -right-4"
          fontSize="medium"
          color="primary"
        />
      )}
      <span className="text-lg font-semibold">Chapter {chapter}</span>
      {isUnlocked ? (
        <NumberOfQuestions
          isDone={isDone}
          numberOfQuestions={numberOfQuestions}
        />
      ) : (
        <LockIcon fontSize="small" color="inherit" />
      )}
    </div>
  );
}
export default function ChaptersListContainer({
  phase,
  part,
  chapter,
}: {
  phase: number;
  part: number;
  chapter: number;
}) {
  console.log("ChaptersListContainer");

  const nav = useNavigate();

  const chapters: RoadmapExercise[] = sRoadmap
    .use((v) => v.exercises)
    .filter((exercise) => exercise.phase === phase && exercise.part === part);
  const userRoadmap: RoadmapHistory | null = sRoadmap.use((v) => v.userRoadmap);
  const chaptersLeft =
    chapters.length -
    (userRoadmap
      ? userRoadmap.completedRoadmapExercises.filter((exercise) =>
          chapters
            .map((chapter) => chapter._id)
            .includes(exercise.roadmapExerciseId)
        ).length
      : 0);
  return (
    <div className="bg-white rounded-2xl shadow-lg min-w-[220px] flex flex-col items-center gap-4 py-8 px-4">
      <div className="current-part flex justify-center items-center w-full px-4">
        <div className="text-lg font-semibold bg-primary text-white px-2 py-1 rounded-md min-w-24 text-center">
          Phase {phase}
        </div>
        <ArrowRightIcon fontSize="large" color="inherit" />
        <div className="text-lg font-semibold bg-white text-primary border border-primary px-2 py-1 rounded-md min-w-24 text-center">
          Part {part}
        </div>
      </div>
      <div className="chapters-container flex flex-col items-center gap-2 w-full px-4">
        {chapters.map((chapterItem, index) => (
          <ChapterItem
            key={chapterItem._id}
            chapter={chapterItem.chapter}
            currentChapter={chapter}
            onClick={() => nav(`/roadmap/${chapterItem._id}`)}
            numberOfQuestions={chapterItem.questions.length}
            isDone={
              userRoadmap
                ? userRoadmap.completedRoadmapExercises.some(
                    (exercise) => exercise.roadmapExerciseId === chapterItem._id
                  )
                : false
            }
            isUnlocked={index <= chapters.length - chaptersLeft}
          />
        ))}
      </div>
    </div>
  );
}
