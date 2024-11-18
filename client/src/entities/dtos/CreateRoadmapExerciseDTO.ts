import Question from "../Question";

type CreateRoadmapExerciseDTO = {
  phase: number;
  part: number;
  chapter: number;
  created_by: string;
  main_audio: string;
  questions: Question[];
};
export default CreateRoadmapExerciseDTO;
