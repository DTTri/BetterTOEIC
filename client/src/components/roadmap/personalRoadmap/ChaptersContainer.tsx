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
  return <div></div>;
}

export default function ChaptersContainer({
  currentPhase,
  part,
  unlockedChapters,
}: {
  currentPhase: number;
  part: number;
  unlockedChapters: number;
}) {
  return (
    <div>
      {/* <div>
      {Array.from({ length: 5 }, (_, i) => (
        <ChapterItem
          key={i}
          isUnlocked={i < unlockedChapters}
          chapter={i + 1}
          numberOfQuestions={5} // TODO: get the real number of questions
          onClick={() => console.log("Chapter clicked")}
        />
      ))}
    </div> */}
    </div>
  );
}
