import { RoadmapChapter } from "@/entities";

const roadmapChapters: RoadmapChapter[] = [];
const phases = 4;
const partsPerPhase = 7;
const chaptersPerPart = 5;

for (let phase = 1; phase <= phases; phase++) {
  for (let part = 1; part <= partsPerPhase; part++) {
    for (let chapter = 1; chapter <= chaptersPerPart; chapter++) {
      const chapterData = {
        _id: `${phase}${part}${chapter}`.padStart(3, "0"),
        phase: phase,
        part: part,
        chapter: chapter,
        questions: Math.floor(Math.random() * 11) + 5, // Random number between 5 and 15
        created_at: "20/10/2024",
        updated_at: "22/10/2024",
      };
      roadmapChapters.push(chapterData);
    }
  }
}

export default roadmapChapters;
