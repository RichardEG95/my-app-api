import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import CommentRepository from './CommentRepository';
import respond from '../util/respond';

const groupComments = (comments: any[]): any[] => {
  const nonParent = comments.filter(c => !c.parentId);
  const grouped = nonParent.reduce((acc, comment) => ({...acc, [comment.id]: {...comment, comments: []}}), {});

  const parent = comments.filter(c => c.parentId);

  parent.forEach((c) => {
    if (c.parentId) {
      grouped[c.parentId].comments.push(c);
    }
  });

  return Object.values(grouped);
};

export default class CommentController {
  public static async getComments(_: Request, response: Response): Promise<void> {
    try {
      const comments = await CommentRepository.getComments();
      const formatted = groupComments(comments);

      respond(response, StatusCodes.OK, formatted);
    } catch (e: unknown) {
      console.error('Error in getComments', e);
    }
  }

  public static async addComment(request: Request, response: Response): Promise<void> {
    try {
      const {
        email,
        comment,
        parentId
      } = request.body;

      const newComment = await CommentRepository.addComment({email, comment, parentId});

      respond(response, StatusCodes.OK, newComment);
    } catch (e: unknown) {
      console.error('Error in addComment', e);
    }
  }

  public static async removeComment(request: Request, response: Response): Promise<void> {
    try {
      const {commentId} = request.params;

      const affectedRows = await CommentRepository.removeComment(Number(commentId));

      respond(response, StatusCodes.OK, affectedRows);
    } catch (e: unknown) {
      console.error('Error in removeComment', e);
    }
  }

  public static async editComment(request: Request, response: Response): Promise<void> {
    try {
      const {commentId} = request.params;
      const {
        email,
        comment,
        parentId
      } = request.body;

      const newComment = await CommentRepository.editComment(Number(commentId), {email, comment, parentId});

      respond(response, StatusCodes.OK, newComment);
    } catch (e: unknown) {
      console.error('Error in addComment', e);
    }
  }
}
