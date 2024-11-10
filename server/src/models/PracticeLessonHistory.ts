import { ObjectId } from 'mongodb';
import CompletedPracticeLesson from './CompletedPracticeLesson';

type PracticeLessonHistory = {
  _id: ObjectId;
  created_at: string;
  updated_at: string;
  completedPracticeLessons: CompletedPracticeLesson[];
};
export default PracticeLessonHistory;
