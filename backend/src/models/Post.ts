import { DataTypes, Model, Sequelize } from "sequelize";
// import { sequelize } from "../sequelize";

export class Post extends Model {
  declare id: string;
  declare admin_id: string;
  declare title: string;
  declare content: string;
  declare media_url?: string;
  declare created_at: Date;
}

export function initPostModel(sequelize: Sequelize) {
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      admin_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      media_url: DataTypes.TEXT,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "posts",
      timestamps: false,
    }
  );
}