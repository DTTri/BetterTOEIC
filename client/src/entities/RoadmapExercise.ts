import Question from "./Question";
type RoadmapExercise = {
  _id: string;
  phase: number;
  part: number;
  chapter: number;
  main_audio?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  questions: Question[];
};

export default RoadmapExercise;
