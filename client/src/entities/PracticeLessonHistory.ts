import CompletedPracticeLesson from './CompletedPracticeLesson';

type PracticeLessonHistory = {
  _id: string;
  created_at: string;
  updated_at: string;
  completedPracticeLessons: CompletedPracticeLesson[];
};
export default PracticeLessonHistory;
