import { DataTypes, Model, Sequelize } from "sequelize";
// import { sequelize } from "../sequelize";

export type MatchStatus = "upcoming" | "live" | "finished";

export class Match extends Model {
  declare id: string;
  declare team_a_id: string;
  declare team_b_id: string;
  declare date: Date;
  declare status: MatchStatus;
  declare score_a: number;
  declare score_b: number;
  declare match_group: "A" | "B" | "final";
  declare venue?: string;
  declare created_at: Date;
}

export function initMatchModel(sequelize: Sequelize) {
  Match.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      team_a_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      team_b_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("upcoming", "live", "finished"),
        defaultValue: "upcoming",
      },
      score_a: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      score_b: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      match_group: {
        type: DataTypes.ENUM("A", "B", "final"),
        allowNull: false,
      },
      venue: DataTypes.TEXT,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "matches",
      timestamps: false,
    }
  );
}