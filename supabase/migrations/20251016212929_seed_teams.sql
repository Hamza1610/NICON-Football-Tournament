/*
  # Seed Tournament Teams

  ## Overview
  This migration seeds the database with the 6 tournament teams divided into 2 groups.

  ## Data Seeded
  
  ### Group A Teams:
  - NICON United
  - Emerald Lions
  - Golden Hawks

  ### Group B Teams:
  - Unicorn FC
  - Titans of Town
  - Victory Rangers

  ## Notes
  - Teams are evenly distributed between Group A and Group B
  - Logo URLs are placeholders and can be updated later
  - Uses IF NOT EXISTS pattern to prevent duplicate entries
*/

-- Insert teams for Group A
INSERT INTO teams (name, team_group, coach_name)
VALUES 
  ('NICON United', 'A', 'Coach Adebayo'),
  ('Emerald Lions', 'A', 'Coach Chioma'),
  ('Golden Hawks', 'A', 'Coach Ibrahim')
ON CONFLICT DO NOTHING;

-- Insert teams for Group B
INSERT INTO teams (name, team_group, coach_name)
VALUES 
  ('Unicorn FC', 'B', 'Coach Amina'),
  ('Titans of Town', 'B', 'Coach Tunde'),
  ('Victory Rangers', 'B', 'Coach Blessing')
ON CONFLICT DO NOTHING;