import { Router } from 'express';
import CommentController from './CommentController';

export default class CommentFactory {
  public static create(): Router {
    const router = Router();

    router.get('/comments', CommentController.getComments);
    router.post('/comments', CommentController.addComment);
    router.delete('/comments/:commentId', CommentController.removeComment);
    router.put('/comments/:commentId', CommentController.editComment);

    return router;
  }
}
