import { Router } from 'express';
import { practiceMiddlewareInstance } from '~/middlewares';
import { practiceControllerInstance } from '~/controllers';
const practiceRouter = Router();

practiceRouter.post(
  '/createPracticeTest',
  practiceMiddlewareInstance.createPracticeTest,
  practiceControllerInstance.createPracticeTest
);
practiceRouter.delete('/deletePracticeTest/:practiceTestId', practiceControllerInstance.deletePracticeTest);
practiceRouter.get('/getAllPracticeTests', practiceControllerInstance.getAllPracticeTests);
practiceRouter.get('/getPracticeTestById/:practiceTestId', practiceControllerInstance.getPracticeTestById);
practiceRouter.get('/getPracticeTestsByPart/:part', practiceControllerInstance.getPracticeTestsByPart);

practiceRouter.post(
  '/createPracticeLesson',
  practiceMiddlewareInstance.createPracticeLesson,
  practiceControllerInstance.createPracticeLesson
);
practiceRouter.delete('/deletePracticeLesson/:practiceLessonId', practiceControllerInstance.deletePracticeLesson);
practiceRouter.get('/getAllPracticeLessons', practiceControllerInstance.getAllPracticeLessons);
practiceRouter.get('/getPracticeLessonById/:practiceLessonId', practiceControllerInstance.getPracticeLessonById);
practiceRouter.get('/getPracticeLessonsByPart/:part', practiceControllerInstance.getPracticeLessonsByPart);

practiceRouter.put(
  '/completePracticeTest/:userId',
  practiceMiddlewareInstance.completePracticeTest,
  practiceControllerInstance.completePracticeTest
);
practiceRouter.get('/getPracticeTestHistory/:userId', practiceControllerInstance.getPracticeTestHistory);

practiceRouter.put(
  '/completePracticeLesson/:userId',
  practiceMiddlewareInstance.completePracticeLesson,
  practiceControllerInstance.completePracticeLesson
);
practiceRouter.get('/getPracticeLessonHistory/:userId', practiceControllerInstance.getPracticeLessonHistory);

export default practiceRouter;
