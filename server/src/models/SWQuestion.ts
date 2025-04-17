type SWQuestion = {
  question_number: number;
  text: string;
  passage?: string[];
  image?: string[];
  part: number;
  question_audio?: string;
};

export default SWQuestion;
