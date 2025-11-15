import express from "express";
import { initDb, sequelize } from "./sequelize";

import { User, initUserModel } from "./models/User";
import { Team , initTeamModel} from "./models/Team";
import { Match, initMatchModel } from "./models/Match";
import { MatchEvent, initMatchEventModel } from "./models/MatchEvent";
import { Leaderboard, initLeaderboardModel } from "./models/Leaderboard";
import { Payment, initPaymentModel } from "./models/Payment";
import { Post, initPostModel } from "./models/Post";

const app = express();
app.use(express.json());

// initialize models
initUserModel(sequelize);
initTeamModel(sequelize);
initMatchModel(sequelize);
initMatchEventModel(sequelize);
initLeaderboardModel(sequelize);
initPaymentModel(sequelize);
initPostModel(sequelize);

// Setup associations
export function setupAssociations() {
  // Users <-> Teams
  User.belongsTo(Team, { foreignKey: "team_id" });
  Team.hasMany(User, { foreignKey: "team_id" });

  // Matches <-> Teams
  Match.belongsTo(Team, { as: "teamA", foreignKey: "team_a_id" });
  Match.belongsTo(Team, { as: "teamB", foreignKey: "team_b_id" });
  Team.hasMany(Match, { as: "homeMatches", foreignKey: "team_a_id" });
  Team.hasMany(Match, { as: "awayMatches", foreignKey: "team_b_id" });

  // MatchEvents <-> Matches
  MatchEvent.belongsTo(Match, { foreignKey: "match_id" });
  Match.hasMany(MatchEvent, { foreignKey: "match_id" });

  // MatchEvents <-> Users (players)
  MatchEvent.belongsTo(User, { foreignKey: "player_id" });
  User.hasMany(MatchEvent, { foreignKey: "player_id" });

  // Leaderboard <-> Users
  Leaderboard.belongsTo(User, { foreignKey: "player_id" });
  User.hasOne(Leaderboard, { foreignKey: "player_id" });

  // Payments <-> Users
  Payment.belongsTo(User, { foreignKey: "user_id" });
  User.hasMany(Payment, { foreignKey: "user_id" });

  // Posts <-> Users (admins)
  Post.belongsTo(User, { foreignKey: "admin_id" });
  User.hasMany(Post, { foreignKey: "admin_id" });
}


// call setupAssociations to link models
setupAssociations();


// Initialize DB and models
initDb().then(() => {
  console.log("DB initialized");
}).catch(console.error);

// Routes
app.get("/health", () => {
  return { status: "ok", timestamp: new Date() };
});

export default app;
