type NewQuestionDTO = {
  text: string;
  image?: string[];
  passage?: string[];
  choices: string[];
  correct_choice: number;
  explanation: string;
  part: number;
  question_number: number;
  question_group_number?: number;
};

export default NewQuestionDTO;
