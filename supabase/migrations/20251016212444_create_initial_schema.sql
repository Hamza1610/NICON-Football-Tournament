/*
  # NICON Tournament Initial Database Schema

  ## Overview
  This migration creates the complete database structure for the NICON Football Tournament application,
  including user management, team organization, match tracking, events, payments, and content management.

  ## New Tables

  ### 1. users
  Extended user profile table for players, fans, and admins
  - `id` (uuid, primary key) - Links to Supabase auth.users
  - `full_name` (text) - User's full name
  - `email` (text, unique) - User email
  - `role` (enum) - User role: fan, player, admin
  - `photo_url` (text) - Profile picture URL
  - `team_id` (uuid, foreign key) - Associated team (nullable for fans)
  - `payment_status` (enum) - Payment verification status
  - `position` (text) - Player position (nullable)
  - `jersey_number` (int) - Jersey number (nullable)
  - `age` (int) - Player age (nullable)
  - `created_at` (timestamptz) - Account creation timestamp

  ### 2. teams
  Football teams participating in the tournament
  - `id` (uuid, primary key)
  - `name` (text) - Team name
  - `logo_url` (text) - Team badge/logo
  - `team_group` (enum) - Group A or B
  - `coach_name` (text) - Coach name (optional)
  - `created_at` (timestamptz)

  ### 3. matches
  Tournament matches and fixtures
  - `id` (uuid, primary key)
  - `team_a_id` (uuid, foreign key) - First team
  - `team_b_id` (uuid, foreign key) - Second team
  - `date` (timestamptz) - Match date and time
  - `status` (enum) - Match status: upcoming, live, finished
  - `score_a` (int) - Team A score
  - `score_b` (int) - Team B score
  - `match_group` (enum) - Group A, B, or final
  - `venue` (text) - Stadium/venue name
  - `created_at` (timestamptz)

  ### 4. match_events
  Individual match events (goals, cards, assists)
  - `id` (uuid, primary key)
  - `match_id` (uuid, foreign key) - Related match
  - `player_id` (uuid, foreign key) - Player who triggered event
  - `event_type` (enum) - goal, assist, yellow_card, red_card
  - `minute` (int) - Match minute when event occurred
  - `description` (text) - Optional event description
  - `created_at` (timestamptz)

  ### 5. leaderboard
  Aggregated player statistics
  - `player_id` (uuid, foreign key, primary key) - Player reference
  - `goals` (int) - Total goals scored
  - `assists` (int) - Total assists
  - `yellow_cards` (int) - Yellow cards received
  - `red_cards` (int) - Red cards received
  - `points` (int) - Calculated leaderboard points
  - `updated_at` (timestamptz)

  ### 6. payments
  Payment tracking for player registration
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key) - Player making payment
  - `amount` (int) - Payment amount in Naira
  - `status` (enum) - pending, success, failed
  - `transaction_ref` (text, unique) - Payment reference
  - `verified_at` (timestamptz) - Verification timestamp
  - `created_at` (timestamptz)

  ### 7. posts
  News, highlights, and admin announcements
  - `id` (uuid, primary key)
  - `admin_id` (uuid, foreign key) - Admin who created post
  - `title` (text) - Post title
  - `content` (text) - Post content/description
  - `media_url` (text) - Optional image/video URL
  - `created_at` (timestamptz)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Restrictive policies for data access
  - Authentication required for most operations
  - Admin-only access for sensitive operations

  ## Notes
  - All tables use UUID primary keys for scalability
  - Timestamps use timestamptz for proper timezone handling
  - Foreign key constraints ensure data integrity
  - Indexes added for frequently queried columns
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('fan', 'player', 'admin');
CREATE TYPE payment_status_type AS ENUM ('pending', 'verified', 'failed');
CREATE TYPE match_status AS ENUM ('upcoming', 'live', 'finished');
CREATE TYPE match_group AS ENUM ('A', 'B', 'final');
CREATE TYPE event_type AS ENUM ('goal', 'assist', 'yellow_card', 'red_card');

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  team_group match_group NOT NULL,
  coach_name text,
  created_at timestamptz DEFAULT now()
);

-- Create users table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  role user_role DEFAULT 'fan',
  photo_url text,
  team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
  payment_status payment_status_type DEFAULT 'pending',
  position text,
  jersey_number int,
  age int,
  created_at timestamptz DEFAULT now()
);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_a_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  team_b_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  date timestamptz NOT NULL,
  status match_status DEFAULT 'upcoming',
  score_a int DEFAULT 0,
  score_b int DEFAULT 0,
  match_group match_group NOT NULL,
  venue text,
  created_at timestamptz DEFAULT now()
);

-- Create match_events table
CREATE TABLE IF NOT EXISTS match_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES matches(id) ON DELETE CASCADE,
  player_id uuid REFERENCES users(id) ON DELETE CASCADE,
  event_type event_type NOT NULL,
  minute int NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  player_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  goals int DEFAULT 0,
  assists int DEFAULT 0,
  yellow_cards int DEFAULT 0,
  red_cards int DEFAULT 0,
  points int DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  amount int DEFAULT 5000,
  status payment_status_type DEFAULT 'pending',
  transaction_ref text UNIQUE,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  media_url text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_team_id ON users(team_id);
CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(date);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);
CREATE INDEX IF NOT EXISTS idx_match_events_match_id ON match_events(match_id);
CREATE INDEX IF NOT EXISTS idx_match_events_player_id ON match_events(player_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can manage all users"
  ON users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- RLS Policies for teams table
CREATE POLICY "Anyone can view teams"
  ON teams FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage teams"
  ON teams FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- RLS Policies for matches table
CREATE POLICY "Anyone can view matches"
  ON matches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage matches"
  ON matches FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- RLS Policies for match_events table
CREATE POLICY "Anyone can view match events"
  ON match_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage match events"
  ON match_events FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- RLS Policies for leaderboard table
CREATE POLICY "Anyone can view leaderboard"
  ON leaderboard FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update leaderboard"
  ON leaderboard FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- RLS Policies for payments table
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Users can create own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all payments"
  ON payments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- RLS Policies for posts table
CREATE POLICY "Anyone can view posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = admin_id)
  WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Admins can delete own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (auth.uid() = admin_id);