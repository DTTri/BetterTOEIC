import { Router } from 'express';
import { roadmapControllerInstance } from '~/controllers';
import { roadmapMiddlewareInstance } from '~/middlewares';

const roadmapRouter = Router();

roadmapRouter.post(
  '/createRoadmapExercise',
  roadmapMiddlewareInstance.createRoadmapExercise,
  roadmapControllerInstance.createRoadmapExercise
);
roadmapRouter.delete('/deleteRoadmapExercise/:roadmapExerciseId', roadmapControllerInstance.deleteRoadmapExercise);
roadmapRouter.get('/getAllRoadmapExercises', roadmapControllerInstance.getAllRoadmapExercises);
roadmapRouter.get('/getRoadmapExerciseById/:roadmapExerciseId', roadmapControllerInstance.getRoadmapExerciseById);
roadmapRouter.get('/getRoadmapExercisesByPhase/:phase', roadmapControllerInstance.getRoadmapExercisesByPhase);
roadmapRouter.put(
  '/completeRoadmapExercise/:userId',
  roadmapMiddlewareInstance.completeRoadmapExercise,
  roadmapControllerInstance.completeRoadmapExercise
);
roadmapRouter.get('/getRoadmapHistory/:userId', roadmapControllerInstance.getRoadmapHistory);
roadmapRouter.post(
  '/createPersonalRoadmap',
  roadmapMiddlewareInstance.createPersonalRoadmap,
  roadmapControllerInstance.createPersonalRoadmap
);
roadmapRouter.put('/updateUserCurrentLevel/:userId', roadmapControllerInstance.upgradeUserLevel);

roadmapRouter.delete('/resetUserRoadmap/:userId', roadmapControllerInstance.resetUserRoadmap);
export default roadmapRouter;
