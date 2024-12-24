import { RoadmapExercise, RoadmapHistory } from "@/entities";
import { sRoadmap } from "@/store";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";

function ChapterItem({
  isDone,
  isUnlocked,
  chapter,
  numberOfQuestions,
  onClick,
}: {
  isDone: boolean;
  isUnlocked: boolean;
  chapter: number;
  numberOfQuestions: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4 },
      }}
      className={`w-full flex items-center gap-2 px-2 py-1 border ${
        isDone
          ? "bg-primary border-white text-white"
          : (isUnlocked ? "bg-white border-primary" : "bg-gray-400") +
            " text-black"
      }`}
      onClick={isUnlocked ? onClick : () => {}}
    >
      <div className="icon-container w-8 h-8 flex items-center justify-center">
        <LibraryBooksIcon fontSize="small" color="inherit" />
      </div>
      <div className="chapter-info flex flex-col">
        <p className="text-sm font-semibold">Chapter {chapter}</p>
        <p className="text-xs">{numberOfQuestions} questions</p>
      </div>
    </motion.div>
  );
}

export default function ChaptersContainer({
  part,
  chapters,
}: {
  part: number;
  chapters: RoadmapExercise[];
}) {
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
  const nav = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="w-full bg-tertiary rounded-2xl p-4 pb-8"
    >
      <div className="header mb-4">
        <h3 className="text-xl text-primary font-extrabold -mb-1">
          Part {part}
        </h3>
        <p className="chapters-left text-sm text-rose-800">
          {chaptersLeft} chapters left
        </p>
      </div>
      <div className="chapters-container flex flex-col items-center gap-2 px-2">
        {chapters.map((chapter, index) => (
          <ChapterItem
            key={chapter._id}
            isDone={index < chapters.length - chaptersLeft}
            isUnlocked={index <= chapters.length - chaptersLeft}
            chapter={chapter.chapter}
            numberOfQuestions={chapter.questions.length}
            onClick={() => nav(`/roadmap/${chapter._id}`)}
          />
        ))}
      </div>
    </motion.div>
  );
}
