import { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
function NumberOfQuestions() {
  return (
    <div className="bg-tertiary rounded-3xl text-primary py-2 px-1 text-sm">
      10 questions
    </div>
  );
}
function ChapterItem({
  chapter,
  unlockedChapters,
  currentChapter,
  onClick,
}: {
  chapter: number;
  unlockedChapters: number;
  currentChapter: number;
  onClick?: () => void;
}) {
  return (
    <div
      className={`chapter-item w-full h-12 min-w-56 px-2 flex justify-between items-center rounded-3xl relative ${
        unlockedChapters >= chapter
          ? "bg-primary text-white"
          : "bg-gray-400 text-black"
      }
          ${
            currentChapter === chapter
              ? "scale-105 shadow-md shadow-primary"
              : ""
          }
      `}
      onClick={onClick}
    >
      {currentChapter === chapter && (
        <ArrowRightIcon
          className="absolute -right-4"
          fontSize="medium"
          color="primary"
        />
      )}
      <span className="text-lg font-semibold">Chapter {chapter}</span>
      {unlockedChapters >= chapter ? (
        <NumberOfQuestions />
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
  unlockedChapters,
}: {
  phase: number;
  part: number;
  chapter: number;
  unlockedChapters: number;
}) {
  const nav = useNavigate();
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
        {Array.from({ length: 5 }).map((_, index) => (
          <ChapterItem
            key={index}
            chapter={index + 1}
            unlockedChapters={unlockedChapters}
            currentChapter={chapter}
            onClick={() => {
              nav(`/doing-roadmap/${phase}/${part}/${index + 1}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}
