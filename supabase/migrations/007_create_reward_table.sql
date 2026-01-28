-- Create reward table for global reward settings
CREATE TABLE IF NOT EXISTS reward (
  id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001',
  name VARCHAR(100),
  image_url TEXT,
  link TEXT,
  description VARCHAR(500),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default empty reward (singleton pattern - only one reward)
-- Use INSERT ... ON CONFLICT to handle case where reward already exists
INSERT INTO reward (id, name, image_url, link, description)
VALUES ('00000000-0000-0000-0000-000000000001', NULL, NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_reward_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reward_updated_at
  BEFORE UPDATE ON reward
  FOR EACH ROW
  EXECUTE FUNCTION update_reward_updated_at();

-- Disable RLS - application is public
ALTER TABLE reward DISABLE ROW LEVEL SECURITY;
