import { Router } from 'express';
import { swTestControllerInstance } from '~/controllers';
import { swTestMiddlewareInstance } from '~/middlewares';

const swTestRouter = Router();

swTestRouter.post('/createSWTest', swTestMiddlewareInstance.createSWTest, swTestControllerInstance.createSWTest);
swTestRouter.delete('/deleteSWTest/:swTestId', swTestControllerInstance.deleteSWTest);
swTestRouter.get('/getAllSWTests', swTestControllerInstance.getAllSWTests);
swTestRouter.get('/getSWTestById/:swTestId', swTestControllerInstance.getSWTestById);
swTestRouter.put(
  '/completeSWTest/:userId',
  swTestMiddlewareInstance.completeSWTest,
  swTestControllerInstance.completeSWTest
);
swTestRouter.get('/getSWTestHistory/:userId', swTestControllerInstance.getSWTestHistory);
swTestRouter.put('/updateSWTestEvaluation/:userId', swTestControllerInstance.updateSWTestEvaluation);

export default swTestRouter;
