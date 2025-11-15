import { DataTypes, Model, Sequelize } from "sequelize";
// import { sequelize } from "../sequelize";

export type EventType = "goal" | "assist" | "yellow_card" | "red_card";

export class MatchEvent extends Model {
  declare id: string;
  declare match_id: string;
  declare player_id: string;
  declare event_type: EventType;
  declare minute: number;
  declare description?: string;
  declare created_at: Date;
}

export function initMatchEventModel(sequelize: Sequelize) {
  MatchEvent.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      match_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      player_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      event_type: {
        type: DataTypes.ENUM("goal", "assist", "yellow_card", "red_card"),
        allowNull: false,
      },
      minute: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "match_events",
      timestamps: false,
    }
  );
}