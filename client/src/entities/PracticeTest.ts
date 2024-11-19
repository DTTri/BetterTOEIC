import Question from "./Question";

type PracticeTest = {
  _id: string;
  main_audio?: string;
  part: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  questions: Question[];
};

export default PracticeTest;
