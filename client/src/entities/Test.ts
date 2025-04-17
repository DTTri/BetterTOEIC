import Question from "./Question";

type Test = {
  _id: string;
  title: string;
  description: string;
  main_audio: string;
  isLRTest?: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  difficulty: string;
  questions: Question[];
  isMiniTest?: boolean | false;
};
export default Test;
