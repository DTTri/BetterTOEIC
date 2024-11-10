import { ObjectId } from 'mongodb';
import Question from './Question';

type Test = {
  _id?: ObjectId;
  title: string;
  description: string;
  main_audio: string;
  created_by: string;
  isMiniTest: boolean;
  questions: Question[];
  difficulty: string;
  created_at?: string;
  updated_at?: string;
};

export default Test;
