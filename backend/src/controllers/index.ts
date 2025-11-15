// src/controllers/index.ts
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware';
import * as Services from '../services';

// UserController
export const UserController = {
  async createUser(req: Request, res: Response) {
    try {
      const user = await Services.UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  },

  async getUser(req: AuthenticatedRequest, res: Response) {
    try {
      const user = await Services.UserService.findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  async getCurrentUser(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      const user = await Services.UserService.findUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching current user:', error);
      res.status(500).json({ error: 'Failed to fetch current user' });
    }
  },

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await Services.UserService.findUsersByRole(req.query.role as any);
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  async updateUser(req: AuthenticatedRequest, res: Response) {
    try {
      // Check if user is trying to update their own profile or is admin
      if (req.user?.id !== req.params.id && req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized to update this user' });
      }

      const user = await Services.UserService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  async deleteUser(req: AuthenticatedRequest, res: Response) {
    try {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized to delete users' });
      }
      await Services.UserService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
};

// TeamController
export const TeamController = {
  async createTeam(req: Request, res: Response) {
    try {
      const team = await Services.TeamService.createTeam(req.body);
      res.status(201).json(team);
    } catch (error) {
      console.error('Error creating team:', error);
      res.status(500).json({ error: 'Failed to create team' });
    }
  },

  async getTeam(req: Request, res: Response) {
    try {
      const team = await Services.TeamService.findTeamById(req.params.id);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
      res.json(team);
    } catch (error) {
      console.error('Error fetching team:', error);
      res.status(500).json({ error: 'Failed to fetch team' });
    }
  },

  async getAllTeams(req: Request, res: Response) {
    try {
      const teams = await Services.TeamService.findAllTeams();
      res.json(teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).json({ error: 'Failed to fetch teams' });
    }
  },

  async updateTeam(req: Request, res: Response) {
    try {
      const team = await Services.TeamService.updateTeam(req.params.id, req.body);
      res.json(team);
    } catch (error) {
      console.error('Error updating team:', error);
      res.status(500).json({ error: 'Failed to update team' });
    }
  },

  async deleteTeam(req: Request, res: Response) {
    try {
      await Services.TeamService.deleteTeam(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting team:', error);
      res.status(500).json({ error: 'Failed to delete team' });
    }
  }
};

// MatchController
export const MatchController = {
  async createMatch(req: Request, res: Response) {
    try {
      const match = await Services.MatchService.createMatch(req.body);
      res.status(201).json(match);
    } catch (error) {
      console.error('Error creating match:', error);
      res.status(500).json({ error: 'Failed to create match' });
    }
  },

  async getMatch(req: Request, res: Response) {
    try {
      const match = await Services.MatchService.findMatchById(req.params.id);
      if (!match) {
        return res.status(404).json({ error: 'Match not found' });
      }
      res.json(match);
    } catch (error) {
      console.error('Error fetching match:', error);
      res.status(500).json({ error: 'Failed to fetch match' });
    }
  },

  async getAllMatches(req: Request, res: Response) {
    try {
      const matches = await Services.MatchService.findAllMatches();
      res.json(matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
      res.status(500).json({ error: 'Failed to fetch matches' });
    }
  },

  async getMatchesByGroup(req: Request, res: Response) {
    try {
      const matches = await Services.MatchService.findMatchesByGroup(req.params.group);
      res.json(matches);
    } catch (error) {
      console.error('Error fetching matches by group:', error);
      res.status(500).json({ error: 'Failed to fetch matches by group' });
    }
  },

  async updateMatch(req: Request, res: Response) {
    try {
      const match = await Services.MatchService.updateMatch(req.params.id, req.body);
      res.json(match);
    } catch (error) {
      console.error('Error updating match:', error);
      res.status(500).json({ error: 'Failed to update match' });
    }
  }
};

// MatchEventController
export const MatchEventController = {
  async createEvent(req: Request, res: Response) {
    try {
      const event = await Services.MatchEventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating match event:', error);
      res.status(500).json({ error: 'Failed to create match event' });
    }
  },

  async getEventsByMatch(req: Request, res: Response) {
    try {
      const events = await Services.MatchEventService.findEventsByMatch(req.params.matchId);
      res.json(events);
    } catch (error) {
      console.error('Error fetching match events:', error);
      res.status(500).json({ error: 'Failed to fetch match events' });
    }
  }
};

// LeaderboardController
export const LeaderboardController = {
  async getTopPlayers(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const topPlayers = await Services.LeaderboardService.getTopPlayers(limit);
      res.json(topPlayers);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  },

  async getPlayerStats(req: Request, res: Response) {
    try {
      const stats = await Services.LeaderboardService.getPlayerStats(req.params.playerId);
      res.json(stats);
    } catch (error) {
      console.error('Error fetching player stats:', error);
      res.status(500).json({ error: 'Failed to fetch player stats' });
    }
  }
};

// PaymentController
export const PaymentController = {
  async createPayment(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      const paymentData = { ...req.body, user_id: req.user.id };
      const payment = await Services.PaymentService.createPayment(paymentData);
      res.status(201).json(payment);
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ error: 'Failed to create payment' });
    }
  },

  async getPayment(req: AuthenticatedRequest, res: Response) {
    try {
      const payment = await Services.PaymentService.findPaymentById(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }

      // Check if user is admin or owns the payment
      if (req.user?.role !== 'admin' && payment.user_id !== req.user?.id) {
        return res.status(403).json({ error: 'Not authorized to view this payment' });
      }

      res.json(payment);
    } catch (error) {
      console.error('Error fetching payment:', error);
      res.status(500).json({ error: 'Failed to fetch payment' });
    }
  },

  async getPendingPayments(req: AuthenticatedRequest, res: Response) {
    try {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const payments = await Services.PaymentService.findPendingPayments();
      res.json(payments);
    } catch (error) {
      console.error('Error fetching pending payments:', error);
      res.status(500).json({ error: 'Failed to fetch pending payments' });
    }
  },

  async verifyPayment(req: AuthenticatedRequest, res: Response) {
    try {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const payment = await Services.PaymentService.verifyPayment(req.params.id);
      res.json(payment);
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ error: 'Failed to verify payment' });
    }
  },

  async failPayment(req: AuthenticatedRequest, res: Response) {
    try {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const payment = await Services.PaymentService.failPayment(req.params.id);
      res.json(payment);
    } catch (error) {
      console.error('Error failing payment:', error);
      res.status(500).json({ error: 'Failed to fail payment' });
    }
  }
};

// PostController
export const PostController = {
  async createPost(req: AuthenticatedRequest, res: Response) {
    try {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const postData = { ...req.body, admin_id: req.user.id };
      const post = await Services.PostService.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  },

  async getPost(req: Request, res: Response) {
    try {
      const post = await Services.PostService.findPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  },

  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await Services.PostService.findAllPosts();
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  },

  async updatePost(req: AuthenticatedRequest, res: Response) {
    try {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const post = await Services.PostService.updatePost(req.params.id, req.body);
      res.json(post);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  },

  async deletePost(req: AuthenticatedRequest, res: Response) {
    try {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      await Services.PostService.deletePost(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  }
};