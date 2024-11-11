import { ObjectId } from 'mongodb';
import CompletedRoadmapExercise from './CompletedRoadmapExercise';

type RoadmapHistory = {
  _id: ObjectId;
  start_level: number;
  target_level: number;
  current_level: number;
  created_at: Date;
  updated_at: Date;
  completedRoadmapExercises: CompletedRoadmapExercise[];
};
export default RoadmapHistory;
