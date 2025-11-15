// src/services/index.ts
import { User, Team, Match, MatchEvent, Leaderboard, Payment, Post } from '../models';
import {  PaymentStatus, UserRole } from '../types';

// UserService
export const UserService = {
  async createUser(userData: any) {
    return await User.create(userData);
  },

  async findUserById(id: string) {
    return await User.findByPk(id, {
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'logo_url']
      }]
    });
  },

  async findUserByEmail(email: string) {
    return await User.findOne({ where: { email } });
  },

  async findUsersByRole(role: UserRole) {
    return await User.findAll({ where: { role } });
  },

  async updateUser(id: string, updateData: any) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.update(updateData);
  },

  async deleteUser(id: string) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.destroy();
  },

  async updatePaymentStatus(userId: string, status: PaymentStatus) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    user.payment_status = status;
    await user.save();
    return user;
  }
};

// TeamService
export const TeamService = {
  async createTeam(teamData: any) {
    return await Team.create(teamData);
  },

  async findTeamById(id: string) {
    return await Team.findByPk(id);
  },

  async findAllTeams() {
    return await Team.findAll();
  },

  async updateTeam(id: string, updateData: any) {
    const team = await Team.findByPk(id);
    if (!team) throw new Error('Team not found');
    return await team.update(updateData);
  },

  async deleteTeam(id: string) {
    const team = await Team.findByPk(id);
    if (!team) throw new Error('Team not found');
    await team.destroy();
  }
};

// MatchService
export const MatchService = {
  async createMatch(matchData: any) {
    return await Match.create(matchData);
  },

  async findMatchById(id: string) {
    return await Match.findByPk(id, {
      include: [
        {
          model: Team,
          as: 'teamA',
          attributes: ['id', 'name', 'logo_url']
        },
        {
          model: Team,
          as: 'teamB',
          attributes: ['id', 'name', 'logo_url']
        }
      ]
    });
  },

  async findAllMatches() {
    return await Match.findAll({
      include: [
        {
          model: Team,
          as: 'teamA',
          attributes: ['id', 'name', 'logo_url']
        },
        {
          model: Team,
          as: 'teamB',
          attributes: ['id', 'name', 'logo_url']
        }
      ]
    });
  },

  async findMatchesByGroup(group: string) {
    return await Match.findAll({
      where: { match_group: group },
      include: [
        {
          model: Team,
          as: 'teamA',
          attributes: ['id', 'name', 'logo_url']
        },
        {
          model: Team,
          as: 'teamB',
          attributes: ['id', 'name', 'logo_url']
        }
      ]
    });
  },

  async updateMatch(id: string, updateData: any) {
    const match = await Match.findByPk(id);
    if (!match) throw new Error('Match not found');
    return await match.update(updateData);
  }
};

// MatchEventService
export const MatchEventService = {
  async createEvent(eventData: any) {
    const event = await MatchEvent.create(eventData);

    // Update leaderboard based on the event
    await this.updateLeaderboardFromEvent(event);

    return event;
  },

  async updateLeaderboardFromEvent(event: MatchEvent) {
    let pointsChange = 0;
    switch (event.event_type) {
      case 'goal':
        pointsChange = 2; // Example: 2 points for a goal
        break;
      case 'assist':
        pointsChange = 1; // Example: 1 point for an assist
        break;
      case 'yellow_card':
        pointsChange = -1; // Example: -1 point for a yellow card
        break;
      case 'red_card':
        pointsChange = -3; // Example: -3 points for a red card
        break;
    }

    if (pointsChange !== 0) {
      let leaderboardEntry = await Leaderboard.findByPk(event.player_id);
      if (!leaderboardEntry) {
        leaderboardEntry = await Leaderboard.create({
          player_id: event.player_id,
          points: 0,
          goals: 0,
          assists: 0,
          yellow_cards: 0,
          red_cards: 0,
        });
      }

      const updateData: any = { updated_at: new Date() };
      switch (event.event_type) {
        case 'goal':
          updateData.goals = (leaderboardEntry.goals || 0) + 1;
          break;
        case 'assist':
          updateData.assists = (leaderboardEntry.assists || 0) + 1;
          break;
        case 'yellow_card':
          updateData.yellow_cards = (leaderboardEntry.yellow_cards || 0) + 1;
          break;
        case 'red_card':
          updateData.red_cards = (leaderboardEntry.red_cards || 0) + 1;
          break;
      }
      updateData.points = (leaderboardEntry.points || 0) + pointsChange;

      await leaderboardEntry.update(updateData);
    }
  },

  async findEventsByMatch(matchId: string) {
    return await MatchEvent.findAll({
      where: { match_id: matchId },
      include: [{
        model: User,
        as: 'player',
        attributes: ['id', 'full_name']
      }]
    });
  }
};

// LeaderboardService
export const LeaderboardService = {
  async getTopPlayers(limit: number = 10) {
    return await Leaderboard.findAll({
      order: [['points', 'DESC']],
      limit: limit,
      include: [{
        model: User,
        as: 'player',
        attributes: ['id', 'full_name', 'photo_url', 'position']
      }]
    });
  },

  async getPlayerStats(playerId: string) {
    return await Leaderboard.findByPk(playerId, {
      include: [{
        model: User,
        as: 'player',
        attributes: ['id', 'full_name', 'photo_url', 'position']
      }]
    });
  }
};

// PaymentService
export const PaymentService = {
  async createPayment(paymentData: any) {
    return await Payment.create(paymentData);
  },

  async findPaymentById(id: string) {
    return await Payment.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'full_name', 'email']
      }]
    });
  },

  async findPendingPayments() {
    return await Payment.findAll({
      where: { status: 'pending' },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'full_name', 'email']
      }]
    });
  },

  async verifyPayment(paymentId: string) {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) throw new Error('Payment not found');
    payment.status = 'verified';
    payment.verified_at = new Date();
    await payment.save();

    // Update user's payment status
    await UserService.updatePaymentStatus(payment.user_id, 'verified');
    return payment;
  },

  async failPayment(paymentId: string) {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) throw new Error('Payment not found');
    payment.status = 'failed';
    await payment.save();

    // Optionally update user's payment status to failed
    await UserService.updatePaymentStatus(payment.user_id, 'failed');
    return payment;
  }
};

// PostService
export const PostService = {
  async createPost(postData: any) {
    return await Post.create(postData);
  },

  async findPostById(id: string) {
    return await Post.findByPk(id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'full_name']
      }]
    });
  },

  async findAllPosts() {
    return await Post.findAll({
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'full_name']
      }],
      order: [['created_at', 'DESC']]
    });
  },

  async updatePost(id: string, updateData: any) {
    const post = await Post.findByPk(id);
    if (!post) throw new Error('Post not found');
    return await post.update(updateData);
  },

  async deletePost(id: string) {
    const post = await Post.findByPk(id);
    if (!post) throw new Error('Post not found');
    await post.destroy();
  }
};