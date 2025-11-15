// src/models/Payment.ts
import { DataTypes, Model, Sequelize } from "sequelize";
// import { sequelize } from "../sequelize";

export type PaymentStatus = "pending" | "verified" | "failed";

export class Payment extends Model {
  declare id: string;
  declare user_id: string;
  declare amount: number;
  declare status: PaymentStatus;
  declare transaction_ref?: string;
  declare verified_at?: Date;
  declare created_at: Date;
}

export function initPaymentModel(sequelize: Sequelize) {
  Payment.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 5000,
      },
      status: {
        type: DataTypes.ENUM("pending", "verified", "failed"),
        defaultValue: "pending",
      },
      transaction_ref: {
        type: DataTypes.TEXT,
        unique: true,
      },
      verified_at: DataTypes.DATE,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "payments",
      timestamps: false,
    }
  );
}