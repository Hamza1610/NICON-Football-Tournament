import { DataTypes, Model, Sequelize } from "sequelize";
// import { sequelize } from "../sequelize";

export type MatchGroup = "A" | "B" | "final";

export class Team extends Model {
  declare id: string;
  declare name: string;
  declare logo_url?: string;
  declare team_group: MatchGroup;
  declare coach_name?: string;
  declare created_at: Date;
}

export function initTeamModel(sequelize: Sequelize) {
  Team.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      logo_url: DataTypes.TEXT,
      team_group: {
        type: DataTypes.ENUM("A", "B", "final"),
        allowNull: false,
      },
      coach_name: DataTypes.TEXT,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "teams",
      timestamps: false,
    }
  )
}