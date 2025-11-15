// src/validation/index.ts
import Joi from 'joi';

export const createUserSchema = Joi.object({
  full_name: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('fan', 'player', 'admin'),
  position: Joi.string().max(100).optional(),
  jersey_number: Joi.number().integer().min(1).max(99).optional(),
  age: Joi.number().integer().min(16).max(60).optional(),
  team_id: Joi.string().uuid().optional(),
});

export const createMatchSchema = Joi.object({
  team_a_id: Joi.string().uuid().required(),
  team_b_id: Joi.string().uuid().required(),
  date: Joi.date().iso().required(),
  match_group: Joi.string().valid('A', 'B', 'final').required(),
  venue: Joi.string().max(255).optional(),
});

export const createMatchEventSchema = Joi.object({
  match_id: Joi.string().uuid().required(),
  player_id: Joi.string().uuid().required(),
  event_type: Joi.string().valid('goal', 'assist', 'yellow_card', 'red_card').required(),
  minute: Joi.number().integer().min(0).max(120).required(),
  description: Joi.string().max(500).optional(),
});

export const createPaymentSchema = Joi.object({
  amount: Joi.number().integer().min(1).required(),
  transaction_ref: Joi.string().max(255).required(),
});

export const createPostSchema = Joi.object({
  title: Joi.string().max(255).required(),
  content: Joi.string().required(),
  media_url: Joi.string().uri().optional(),
});