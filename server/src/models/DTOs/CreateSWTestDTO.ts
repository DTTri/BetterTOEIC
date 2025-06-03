import SWQuestion from '../SWQuestion';

type CreateSWTestDTO = {
  title: string;
  description: string;
  created_by: string;
  difficulty: string;
  questions: SWQuestion[];
};

export default CreateSWTestDTO;
