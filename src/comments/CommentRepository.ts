import { Comment, CommentAttributes } from './Comment';
import { Op } from 'sequelize';

export default class CommentRepository {
  public static async getComments(): Promise<Comment[]> {
    return await Comment.findAll({raw: true});
  }

  public static async addComment(comment: Omit<CommentAttributes, 'id'>): Promise<Comment> {
    return await Comment.create(comment);
  };

  public static async removeComment(id: number): Promise<number> {
    return await Comment.destroy({
      where: {
        [Op.or]: [
          {id: id},
          {parentId: id}
        ]
      }
    });
  }

  public static async editComment(id: number, comment: Partial<CommentAttributes>): Promise<number> {
    const [affectedRows] = await Comment.update(
      {...comment},
      {
        where: {
          id: id
        },
        validate: true
      }
    );

    return affectedRows;
  }
}
