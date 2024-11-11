import Question from '../Question';

type CreatePracticeTestDTO = {
  part: number;
  main_audio?: string;
  questions: Question[];
  created_by: string;
};

export default CreatePracticeTestDTO;
