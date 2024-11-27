import { Router } from 'express';
import { vocabMiddlewareInstance } from '~/middlewares';
import vocabControllerInstance from '~/controllers/VocabController';

const vocabRouter = Router();

vocabRouter.post(
  '/createVocabTopic',
  vocabMiddlewareInstance.createVocabTopic,
  vocabControllerInstance.createVocabTopic
);

vocabRouter.put(
  '/updateVocabTopic/:topicId',
  vocabMiddlewareInstance.createVocabTopic,
  vocabControllerInstance.updateVocabTopic
);

vocabRouter.delete('/deleteVocabTopic/:topicId', vocabControllerInstance.deleteVocabTopic);

vocabRouter.get('/getAllVocabTopics', vocabControllerInstance.getAllVocabTopics);

vocabRouter.get('/getVocabTopicById/:topicId', vocabControllerInstance.getVocabTopicById);

vocabRouter.put(
  '/completeVocabTopic/:userId',
  vocabMiddlewareInstance.completeVocabTopic,
  vocabControllerInstance.completeVocabTopic
);

vocabRouter.get('/getVocabHistory/:userId', vocabControllerInstance.getVocabHistory);

vocabRouter.put('/saveVocab/:userId', vocabMiddlewareInstance.saveVocab, vocabControllerInstance.saveVocab);

vocabRouter.get('/getVocabsSaved/:userId', vocabControllerInstance.getVocabsSaved);

export default vocabRouter;
