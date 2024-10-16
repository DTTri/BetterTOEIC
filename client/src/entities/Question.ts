type Question = {
  _id: string;
  text: string;
  image?: string[];
  passage?: string[];
  choices: string[];
  correct_choice: number;
  explanation: string;
  part: number;
};

export default Question;
