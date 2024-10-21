import Question from "./Question";

type Chapter = {
  questions: Question[];
};

type RoadmapExercise = {
  id: string;
  phase: number;
  part: number;
  audio: string;
  chapters: Chapter[];
  created_at: string;
  updated_at: string;
};

export default RoadmapExercise;
