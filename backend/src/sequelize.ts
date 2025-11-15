// import { Sequelize } from "sequelize";
// import { initPaymentModel } from "./models/payment.model";
// import dotenv from "dotenv";

// dotenv.config();

// let sequelize: Sequelize;

// // export async function initDb() {
// //   const DATABASE_URL = process.env.DATABASE_URL!;
// //   sequelize = new Sequelize(DATABASE_URL, {
// //     dialect: "postgres",
// //     logging: false,
// //   });

// export async function initDb() {
//   sequelize = new Sequelize(
//     process.env.DB_NAME!,       // database
//     process.env.DB_USER!,       // username
//     process.env.DB_PASSWORD!,   // password
//     {
//       host: process.env.DB_HOST!, // host
//       port: Number(process.env.DB_PORT!) || 5432,
//       dialect: "postgres",
//       logging: false,
//       dialectOptions: {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false, // Supabase requires this for SSL
//         },
//       },
//     }
//   );

//   initPaymentModel(sequelize);

//   // await sequelize.sync({ alter: true }); // for dev; use migrations for production
//   await sequelize.authenticate();
// }

// export { sequelize };









// src/initDb.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

// import { User } from "./models/User";
// import { Team } from "./models/Team";
// import { Match } from "./models/Match";
// import { MatchEvent } from "./models/MatchEvent";
// import { Leaderboard } from "./models/Leaderboard";
// import { Payment } from "./models/Payment";
// import { Post } from "./models/Post";

// DATABASE_URL example:
// postgres://postgres:YOUR_PASSWORD@db.muuuettwjhwcehalqiqf.supabase.co:5432/postgres
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in .env");
}

// Initialize Sequelize
export const sequelize = new Sequelize(
    process.env.DB_NAME!,       // database
    process.env.DB_USER!,       // username
    process.env.DB_PASSWORD!,   // password
    {
      host: process.env.DB_HOST!, // host
      port: Number(process.env.DB_PORT!) || 5432,
      dialect: "postgres",
      logging: console.log, // set to false to disable logs
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Supabase requires this for SSL
        },
      },
      define: {
        timestamps: false, // we already have created_at fields
      },
    }
  );
// export const sequelize = new Sequelize(DATABASE_URL, {
//   dialect: "postgres",
//   logging: console.log, // set to false to disable logs
//   define: {
//     timestamps: false, // we already have created_at fields
//   },
// });


// Setup associations
// export function setupAssociations() {
//   // Users <-> Teams
//   User.belongsTo(Team, { foreignKey: "team_id" });
//   Team.hasMany(User, { foreignKey: "team_id" });

//   // Matches <-> Teams
//   Match.belongsTo(Team, { as: "teamA", foreignKey: "team_a_id" });
//   Match.belongsTo(Team, { as: "teamB", foreignKey: "team_b_id" });
//   Team.hasMany(Match, { as: "homeMatches", foreignKey: "team_a_id" });
//   Team.hasMany(Match, { as: "awayMatches", foreignKey: "team_b_id" });

//   // MatchEvents <-> Matches
//   MatchEvent.belongsTo(Match, { foreignKey: "match_id" });
//   Match.hasMany(MatchEvent, { foreignKey: "match_id" });

//   // MatchEvents <-> Users (players)
//   MatchEvent.belongsTo(User, { foreignKey: "player_id" });
//   User.hasMany(MatchEvent, { foreignKey: "player_id" });

//   // Leaderboard <-> Users
//   Leaderboard.belongsTo(User, { foreignKey: "player_id" });
//   User.hasOne(Leaderboard, { foreignKey: "player_id" });

//   // Payments <-> Users
//   Payment.belongsTo(User, { foreignKey: "user_id" });
//   User.hasMany(Payment, { foreignKey: "user_id" });

//   // Posts <-> Users (admins)
//   Post.belongsTo(User, { foreignKey: "admin_id" });
//   User.hasMany(Post, { foreignKey: "admin_id" });
// }

// Initialize DB
export async function initDb() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");


    // setupAssociations();
    // Do NOT force sync to prevent overwriting existing tables
    await sequelize.sync({ alter: false });
    console.log("✅ Models are in sync with the database");


  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
    process.exit(1);
  }
}
