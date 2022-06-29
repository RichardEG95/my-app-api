import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface CommentAttributes {
  id: number;
  email: string;
  comment: string;
  parentId?: number;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  declare id: number;
  declare email: string;
  declare comment: string;
  declare parentId?: number;

  public static initModel(sequelize: Sequelize): void {
    Comment.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      sequelize: sequelize,
      tableName: 'comment',
      modelName: 'comment',
      timestamps: false
    });
  }
}
