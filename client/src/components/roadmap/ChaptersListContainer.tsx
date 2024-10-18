import { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LockIcon from "@mui/icons-material/Lock";
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
      }`}
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
  const [currentChapter, setCurrentChapter] = useState(chapter); // this should be got from the store
  return (
    <div className="bg-white rounded-2xl shadow-lg min-w-[220px] flex flex-col items-center gap-4 py-8">
      <div className="current-part flex justify-center items-center w-full px-4">
        <div className="text-lg font-semibold bg-primary text-white px-2 py-1 rounded-md">
          Phase {phase}
        </div>
        <ArrowRightIcon fontSize="large" color="inherit" />
        <div className="text-lg font-semibold bg-white text-primary border border-primary px-2 py-1 rounded-md">
          Part {part}
        </div>
      </div>
      <div className="chapters-container flex flex-col items-center gap-2 w-full px-4">
        <ChapterItem
          chapter={1}
          unlockedChapters={unlockedChapters}
          currentChapter={currentChapter}
          onClick={
            unlockedChapters >= 1 ? () => setCurrentChapter(1) : undefined
          }
        />
        <ChapterItem
          chapter={2}
          unlockedChapters={unlockedChapters}
          currentChapter={currentChapter}
          onClick={
            unlockedChapters >= 2 ? () => setCurrentChapter(2) : undefined
          }
        />
        <ChapterItem
          chapter={3}
          unlockedChapters={unlockedChapters}
          currentChapter={currentChapter}
          onClick={
            unlockedChapters >= 3 ? () => setCurrentChapter(3) : undefined
          }
        />
        <ChapterItem
          chapter={4}
          unlockedChapters={unlockedChapters}
          currentChapter={currentChapter}
          onClick={
            unlockedChapters >= 4 ? () => setCurrentChapter(4) : undefined
          }
        />
        <ChapterItem
          chapter={5}
          unlockedChapters={unlockedChapters}
          currentChapter={currentChapter}
          onClick={
            unlockedChapters >= 5 ? () => setCurrentChapter(5) : undefined
          }
        />
      </div>
    </div>
  );
}
