type Question = {
  _id: string;
  text: string;
  image: string;
  choices: string[];
  correct_choice: number;
  explanation: string;
};

export default Question;
