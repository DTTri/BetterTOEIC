type CompletedRoadmapExercise = {
  roadmapExerciseId: string;
  phase: number;
  part: number;
  chapter: number;
  choices: number[];
  totalCorrectAnswers: number;
  attempted_at: string;
};
export default CompletedRoadmapExercise;
