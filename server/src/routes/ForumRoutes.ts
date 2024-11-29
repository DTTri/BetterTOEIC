import { Router } from 'express';
import { forumMiddlewareInstance } from '~/middlewares';
import { forumControllerInstance } from '~/controllers';
const forumRouter = Router();

forumRouter.post(
  '/createPost',
  forumMiddlewareInstance.createPost,
  forumControllerInstance.createPost
);

forumRouter.put(
  '/updatePost/:postId',
  forumControllerInstance.updatePost
);

forumRouter.delete(
    '/deletePost/:postId',
    forumControllerInstance.deletePost
)

forumRouter.get(
    '/getAllPosts',
    forumControllerInstance.getAllPosts
)

forumRouter.get(
    '/getAllPosts/:postId',
    forumControllerInstance.getPostById
)

forumRouter.put(
    '/likePost/:postId',
    forumMiddlewareInstance.likePost,
    forumControllerInstance.likePost
)

forumRouter.post(
    '/createComment/:postId',
    forumMiddlewareInstance.createComment,
    forumControllerInstance.createComment
)

forumRouter.put(
    '/likeComment/:postId/:commentId',
    forumMiddlewareInstance.likeComment,
    forumControllerInstance.likeComment
)

forumRouter.put(
    '/updateComment/:postId/:commentId',
    forumControllerInstance.updateComment
)

forumRouter.delete(
    '/deleteComment/:postId/:commentId',
    forumControllerInstance.deleteComment
)

export default forumRouter;


