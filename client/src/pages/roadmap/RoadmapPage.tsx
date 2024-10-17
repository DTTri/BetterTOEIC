import ChaptersListContainer from "@/components/roadmap/ChaptersListContainer";

export default function RoadmapPage() {
  return (
    <div className="p-4 flex gap-4">
      <ChaptersListContainer
        phase={1}
        part={1}
        chapter={2}
        unlockedChapters={3}
      />
    </div>
  );
}
