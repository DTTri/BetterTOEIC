import CompletedRoadmapExercise from "./CompletedRoadmapExercise";

type RoadmapHistory = {
  _id: string;
  start_level: number;
  target_level: number;
  current_level: number;
  created_at: string;
  updated_at: string;
  completedRoadmapExercises: CompletedRoadmapExercise[];
};
export default RoadmapHistory;
