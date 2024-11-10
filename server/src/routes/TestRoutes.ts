import { Router } from 'express';
import { testControllerInstance } from '~/controllers';
import { testMiddlewareInstance } from '~/middlewares';
const testRouter = Router();

testRouter.post('/createTest', testMiddlewareInstance.createTest, testControllerInstance.createTest);
testRouter.delete('/deleteTest/:testId', testControllerInstance.deleteTest);
testRouter.get('/getAllTests', testControllerInstance.getAllTests);
testRouter.get('/getTestById/:testId', testControllerInstance.getTestById);
testRouter.put('/completeTest', testMiddlewareInstance.completeTest, testControllerInstance.completeTest);
testRouter.get('/getTestHistory/:userId', testControllerInstance.getTestHistory);
testRouter.put('/saveTest', testControllerInstance.saveTest);
testRouter.get('/getTestsSaved/:userId', testControllerInstance.getTestsSaved);
export default testRouter;
