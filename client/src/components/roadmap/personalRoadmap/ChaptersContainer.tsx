import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

function ChapterItem({
  isUnlocked,
  chapter,
  numberOfQuestions,
  onClick,
}: {
  isUnlocked: boolean;
  chapter: number;
  numberOfQuestions: number;
  onClick: () => void;
}) {
  return (
    <div
      className={`w-full flex items-center gap-2 px-2 py-1 border ${
        isUnlocked
          ? "bg-primary border-white text-white"
          : "bg-background border-primary text-primary"
      }`}
      onClick={onClick}
    >
      <div className="icon-container w-8 h-8 flex items-center justify-center">
        <LibraryBooksIcon fontSize="small" color="inherit" />
      </div>
      <div className="chapter-info flex flex-col">
        <p className="text-sm font-semibold">Chapter {chapter}</p>
        <p className="text-xs">{numberOfQuestions} questions</p>
      </div>
    </div>
  );
}

export default function ChaptersContainer({
  currentPhase,
  part,
  unlockedChapters,
  chapters,
}: {
  currentPhase: number;
  part: number;
  unlockedChapters: number;
  chapters: number;
}) {
  return (
    <div className="w-full bg-tertiary rounded-2xl p-4 pb-8">
      <div className="header mb-4">
        <h3 className="text-xl text-primary font-extrabold -mb-1">
          Part {part}
        </h3>
        <p className="chapters-left text-sm text-rose-800">
          {chapters - unlockedChapters} chapters left
        </p>
      </div>
      <div className="chapters-container flex flex-col items-center gap-2 px-2">
        {[...Array(chapters).keys()].map((chapter) => (
          <ChapterItem
            key={chapter}
            isUnlocked={chapter < unlockedChapters}
            chapter={chapter + 1}
            numberOfQuestions={5}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
