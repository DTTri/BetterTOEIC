export type SWQuestion = {
  question_number: number;
  text: string;
  passage?: string;
  image?: string[];
  question_audio?: string;
};

export type SWTest = {
  _id?: string;
  title: string;
  description: string;
  created_by: string;
  questions: SWQuestion[];
  created_at?: string;
  updated_at?: string;
  difficulty: string;
};
