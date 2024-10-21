import { ChaptersContainer, CurrentPhaseContainer } from "@/components";

export default function RoadmapPage() {
  const currentPhase = 1;
  return (
    <div className="bg-background w-full h-full py-8 flex flex-col items-center gap-4">
      <div className="w-1/2 min-w-fit mx-auto">
        <CurrentPhaseContainer currentPhase={currentPhase} progress={50} />
      </div>
      <div className="roadmap-exercise-container rounded-xl w-5/6 bg-white p-8 mx-auto">
        <div className="parts-list w-3/5 mx-auto flex flex-col items-center gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <ChaptersContainer
              key={index}
              currentPhase={currentPhase}
              part={index + 1}
              unlockedChapters={3}
              chapters={5}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
