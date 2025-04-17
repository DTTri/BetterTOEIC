import { ObjectId } from 'mongodb';
import SWQuestion from './SWQuestion';

type SWTest = {
  _id: ObjectId;
  title: string;
  description: string;
  created_by: string;
  questions: SWQuestion[];
  created_at: string;
  updated_at: string;
  difficulty: string;
};

export default SWTest;
