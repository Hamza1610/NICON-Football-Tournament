// src/models/index.ts
import { sequelize } from '../sequelize';
import { initUserModel, User } from './User';
import { initTeamModel, Team } from './Team';
import { initMatchModel, Match } from './Match';
import { initMatchEventModel, MatchEvent } from './MatchEvent';
import { initLeaderboardModel, Leaderboard } from './Leaderboard';
import { initPaymentModel, Payment } from './Payment';
import { initPostModel, Post } from './Post';

// Initialize all models
initUserModel(sequelize);
initTeamModel(sequelize);
initMatchModel(sequelize);
initMatchEventModel(sequelize);
initLeaderboardModel(sequelize);
initPaymentModel(sequelize);
initPostModel(sequelize);

// Define associations
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

export {
  User,
  Team,
  Match,
  MatchEvent,
  Leaderboard,
  Payment,
  Post,
  sequelize
};