// src/routes/index.ts
import { Router } from 'express';
import { authenticateToken, requireRole, validateSchema } from '../middleware';
import * as Controllers from '../controllers';
import * as ValidationSchemas from '../validation';

const router = Router();

// Public routes
router.post('/users', validateSchema(ValidationSchemas.createUserSchema), Controllers.UserController.createUser);
router.get('/users/:id', Controllers.UserController.getUser);
router.get('/users', Controllers.UserController.getAllUsers);
router.get('/teams', Controllers.TeamController.getAllTeams);
router.get('/teams/:id', Controllers.TeamController.getTeam);
router.get('/matches', Controllers.MatchController.getAllMatches);
router.get('/matches/:id', Controllers.MatchController.getMatch);
router.get('/matches/group/:group', Controllers.MatchController.getMatchesByGroup);
router.get('/leaderboard', Controllers.LeaderboardController.getTopPlayers);
router.get('/leaderboard/player/:playerId', Controllers.LeaderboardController.getPlayerStats);
router.get('/posts', Controllers.PostController.getAllPosts);
router.get('/posts/:id', Controllers.PostController.getPost);

// Authenticated routes
router.get('/users/me', authenticateToken, Controllers.UserController.getCurrentUser);
router.put('/users/:id', authenticateToken, Controllers.UserController.updateUser);
router.delete('/users/:id', authenticateToken, requireRole(['admin']), Controllers.UserController.deleteUser);
router.put('/teams/:id', authenticateToken, requireRole(['admin']), Controllers.TeamController.updateTeam);
router.delete('/teams/:id', authenticateToken, requireRole(['admin']), Controllers.TeamController.deleteTeam);
router.put('/matches/:id', authenticateToken, requireRole(['admin']), Controllers.MatchController.updateMatch);
router.post('/matches', authenticateToken, requireRole(['admin']), validateSchema(ValidationSchemas.createMatchSchema), Controllers.MatchController.createMatch);
router.post('/matches/:matchId/events', authenticateToken, requireRole(['admin']), validateSchema(ValidationSchemas.createMatchEventSchema), Controllers.MatchEventController.createEvent);
router.get('/matches/:matchId/events', Controllers.MatchEventController.getEventsByMatch);
router.post('/payments', authenticateToken, validateSchema(ValidationSchemas.createPaymentSchema), Controllers.PaymentController.createPayment);
router.get('/payments/:id', authenticateToken, Controllers.PaymentController.getPayment);
router.post('/posts', authenticateToken, requireRole(['admin']), validateSchema(ValidationSchemas.createPostSchema), Controllers.PostController.createPost);
router.put('/posts/:id', authenticateToken, requireRole(['admin']), Controllers.PostController.updatePost);
router.delete('/posts/:id', authenticateToken, requireRole(['admin']), Controllers.PostController.deletePost);

// Admin-only routes
router.get('/payments/pending', authenticateToken, requireRole(['admin']), Controllers.PaymentController.getPendingPayments);
router.post('/payments/:id/verify', authenticateToken, requireRole(['admin']), Controllers.PaymentController.verifyPayment);
router.post('/payments/:id/fail', authenticateToken, requireRole(['admin']), Controllers.PaymentController.failPayment);
router.put('/teams', authenticateToken, requireRole(['admin']), Controllers.TeamController.createTeam);

export default router;