type Question = {
  text: string;
  images?: string[];
  passages?: string[];
  choices: number[];
  correct_choice: number;
  explanation: string;
  part: number;
  question_number: number;
  question_group_number: number;
};

export default Question;
