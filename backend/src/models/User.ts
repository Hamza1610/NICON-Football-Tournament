import { DataTypes, Model, Sequelize } from "sequelize";
// import { sequelize } from "../sequelize";

export type UserRole = "fan" | "player" | "admin";
export type PaymentStatus = "pending" | "verified" | "failed";

export class User extends Model {
  declare id: string;
  declare full_name: string;
  declare email: string;
  declare role: UserRole;
  declare photo_url?: string;
  declare team_id?: string;
  declare payment_status: PaymentStatus;
  declare position?: string;
  declare jersey_number?: number;
  declare age?: number;
  declare created_at: Date;
}


export function initUserModel(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      full_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM("fan", "player", "admin"),
        defaultValue: "fan",
      },
      photo_url: DataTypes.TEXT,
      team_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      payment_status: {
        type: DataTypes.ENUM("pending", "verified", "failed"),
        defaultValue: "pending",
      },
      position: DataTypes.TEXT,
      jersey_number: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
    }
  );

}
