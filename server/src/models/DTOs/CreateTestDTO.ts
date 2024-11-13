import Question from '../Question';

type CreateTestDTO = {
  title: string;
  description: string;
  main_audio: string;
  isMiniTest: boolean;
  created_by: string;
  difficulty: string;
  questions: Question[];
};
export default CreateTestDTO;
