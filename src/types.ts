// src/types.ts

// Define the shared types first
export type UserRole = "fan" | "player" | "admin";
export type PaymentStatus = "pending" | "verified" | "failed";
export type MatchStatus = "upcoming" | "live" | "finished";
export type EventType = "goal" | "assist" | "yellow_card" | "red_card";
export type MatchGroup = "A" | "B" | "final";

// Define the interfaces matching your backend models
export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  photo_url?: string;
  team_id?: string;
  payment_status: PaymentStatus;
  position?: string;
  jersey_number?: number;
  age?: number;
  created_at: string; // ISO date string
}

export interface Team {
  id: string;
  name: string;
  logo_url?: string;
  team_group: MatchGroup;
  coach_name?: string;
  created_at: string; // ISO date string
}

export interface Match {
  id: string;
  team_a_id: string;
  team_b_id: string;
  date: string; // ISO date string
  status: MatchStatus;
  score_a: number;
  score_b: number;
  match_group: MatchGroup;
  venue?: string;
  created_at: string; // ISO date string
}

export interface MatchEvent {
  id: string;
  match_id: string;
  player_id: string;
  event_type: EventType;
  minute: number;
  description?: string;
  created_at: string; // ISO date string
}

export interface Leaderboard {
  player_id: string;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  points: number;
  updated_at: string; // ISO date string
  player?: User; // Optional associated player object (if included by backend)
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  status: PaymentStatus;
  transaction_ref?: string;
  verified_at?: string; // ISO date string
  created_at: string; // ISO date string
  user?: User; // Optional associated user object (if included by backend)
}

export interface Post {
  id: string;
  admin_id: string;
  title: string;
  content: string;
  media_url?: string;
  created_at: string; // ISO date string
  author?: User; // Optional associated author object (if included by backend)
}