import { Router } from 'express';
import { testControllerInstance } from '~/controllers';
import { testMiddlewareInstance } from '~/middlewares';
const testRouter = Router();

testRouter.post('/createTest', testMiddlewareInstance.createTest, testControllerInstance.createTest);
testRouter.delete('/deleteTest/:testId', testMiddlewareInstance.deleteTest, testControllerInstance.deleteTest);
testRouter.get('/getAllTests', testControllerInstance.getAllTests);
testRouter.get('/getTestById/:testId', testMiddlewareInstance.getTestById, testControllerInstance.getTestById);

export default testRouter;
