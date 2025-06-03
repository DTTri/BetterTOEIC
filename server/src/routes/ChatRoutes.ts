import { Router } from 'express';
import { chatControllerInstance } from "~/controllers/ChatController";
import ChatMiddleware from '~/middlewares/ChatMiddleware';
const chatRouter = Router();

chatRouter.post('/message', ChatMiddleware.validateMessage, chatControllerInstance.handleMessage);
chatRouter.get('/history/:userId', chatControllerInstance.getChatHistory);

export default chatRouter;