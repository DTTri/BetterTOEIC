import { ObjectId } from 'mongodb';
import Question from './Question';

type PracticeTest = {
  _id: ObjectId;
  main_audio?: string;
  part: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  questions: Question[];
};
export default PracticeTest;
