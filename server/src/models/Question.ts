type Question = {
  text: string;
  image?: string[];
  passage?: string[];
  choices: string[];
  correct_choice: number;
  explanation: string;
  part: number;
  question_number: number;
  question_group_numner: number;
};

export default Question;
