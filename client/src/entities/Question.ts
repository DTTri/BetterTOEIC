type Question = {
  text: string;
  images?: string[];
  passages?: string[];
  choices: string[];
  correct_choice: number;
  explanation: string;//132
  part: number;
  question_number: number;//4
  question_group_number: number;//131
};

export default Question;
