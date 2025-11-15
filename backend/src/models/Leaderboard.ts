import { DataTypes, Model, Sequelize } from "sequelize";
// import { sequelize } from "../sequelize";

export class Leaderboard extends Model {
  declare player_id: string;
  declare goals: number;
  declare assists: number;
  declare yellow_cards: number;
  declare red_cards: number;
  declare points: number;
  declare updated_at: Date;
}

export function initLeaderboardModel(sequelize: Sequelize) {
  Leaderboard.init(
    {
      player_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      goals: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      assists: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      yellow_cards: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      red_cards: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "leaderboard",
      timestamps: false,
    }
  );
}