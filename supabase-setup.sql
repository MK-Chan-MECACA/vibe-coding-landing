-- Vibe Coding Landing Page - Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create interest_submissions table
CREATE TABLE IF NOT EXISTS interest_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  subscribed_newsletter BOOLEAN DEFAULT false,
  message TEXT,
  company TEXT,
  phone TEXT,
  source TEXT DEFAULT 'landing_page',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social_proof_counter table
CREATE TABLE IF NOT EXISTS social_proof_counter (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  count INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial counter record
INSERT INTO social_proof_counter (count) VALUES (0)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_interest_submissions_email ON interest_submissions(email);
CREATE INDEX IF NOT EXISTS idx_interest_submissions_source ON interest_submissions(source);
CREATE INDEX IF NOT EXISTS idx_interest_submissions_submitted_at ON interest_submissions(submitted_at);

-- Enable Row Level Security (RLS)
ALTER TABLE interest_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_proof_counter ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access
CREATE POLICY "Allow anonymous insert" ON interest_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous select" ON interest_submissions
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous select counter" ON social_proof_counter
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous update counter" ON social_proof_counter
  FOR UPDATE USING (true);

-- Verify tables were created
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name IN ('interest_submissions', 'social_proof_counter')
ORDER BY table_name, ordinal_position; 