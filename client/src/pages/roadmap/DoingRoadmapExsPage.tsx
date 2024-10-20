import { ChaptersListContainer, ListeningAudio, Timer } from "@/components";

export default function DoingRoadmapExsPage() {
  return (
    <div className="bg-background w-full flex justify-between p-4">
      <ChaptersListContainer
        phase={1}
        part={1}
        chapter={2}
        unlockedChapters={4}
      />
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="w-full flex items-center gap-4">
          <Timer />
          <ListeningAudio />
        </div>
        <div className="w-full bg-white rounded-xl p-4"></div>
        <div className="w-full bg-white rounded-xl p-4">
          <h3 className="text-xl font-semibold text-black mb-4">Questions</h3>
          <div className="questions-list flex items-center gap-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <button className="question-item bg-gray-400 text-black rounded-lg w-8 h-8">
                {index}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
