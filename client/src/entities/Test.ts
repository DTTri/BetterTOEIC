import Question from "./Question";

type Test = {
  _id: string;
  title: string;
  description: string;
  main_audio: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  difficulty: string;
  questions: Question[];
};
export default Test;
