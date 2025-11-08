import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const auth = supabase.auth;
export type UserRole = 'fan' | 'player' | 'admin';
export type PaymentStatus = 'pending' | 'verified' | 'failed';
export type MatchStatus = 'upcoming' | 'live' | 'finished';
export type MatchGroup = 'A' | 'B' | 'final';
export type EventType = 'goal' | 'assist' | 'yellow_card' | 'red_card';

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
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  logo_url?: string;
  team_group: MatchGroup;
  coach_name?: string;
  created_at: string;
}

export interface Match {
  id: string;
  team_a_id: string;
  team_b_id: string;
  date: string;
  status: MatchStatus;
  score_a: number;
  score_b: number;
  match_group: MatchGroup;
  venue?: string;
  created_at: string;
}

export interface MatchEvent {
  id: string;
  match_id: string;
  player_id: string;
  event_type: EventType;
  minute: number;
  description?: string;
  created_at: string;
}

export interface Leaderboard {
  player_id: string;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  points: number;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  status: PaymentStatus;
  transaction_ref?: string;
  verified_at?: string;
  created_at: string;
}

export interface Post {
  id: string;
  admin_id: string;
  title: string;
  content: string;
  media_url?: string;
  created_at: string;
}
