import { ObjectId } from 'mongodb';

type PracticeLesson = {
  _id: ObjectId;
  part: number;
  title: string;
  content: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};
export default PracticeLesson;
