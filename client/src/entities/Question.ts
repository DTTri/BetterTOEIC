type Question = {
  _id: string;
  text: string;
  image?: string[];
  passage?: string[];
  choices: string[];
  correct_choice: number;
  explanation: string;
  part: number;
  question_number: number;
  question_group_id?: string;
  created_at: string;
  updated_at: string;
};

export default Question;
