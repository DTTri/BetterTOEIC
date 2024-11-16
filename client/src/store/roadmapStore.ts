import { signify } from "react-signify";
import { RoadmapExercise, RoadmapHistory } from "@/entities";
const sRoadmap = signify({
  exercises: [] as RoadmapExercise[],
  userRoadmap: null as RoadmapHistory | null,
});
export const sCreatingPersonalRoadmap = signify({
  startLevel: 1,
  targetLevel: 5,
});

export default sRoadmap;
