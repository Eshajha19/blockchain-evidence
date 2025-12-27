-- Enhanced Database Schema for EVID-DGC with Admin Management
-- Run this in Supabase SQL Editor

-- Users table with enhanced security
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    wallet_address TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('public_viewer', 'investigator', 'forensic_analyst', 'legal_professional', 'court_official', 'evidence_manager', 'auditor', 'admin')),
    department TEXT,
    badge_number TEXT,
    jurisdiction TEXT,
    account_type TEXT DEFAULT 'real' CHECK (account_type IN ('real', 'test')),
    created_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Evidence table
CREATE TABLE IF NOT EXISTS evidence (
    id SERIAL PRIMARY KEY,
    case_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    file_data TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    hash TEXT NOT NULL,
    submitted_by TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'pending'
);

-- Cases table
CREATE TABLE IF NOT EXISTS cases (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'medium',
    created_by TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    created_date TIMESTAMPTZ DEFAULT NOW()
);

-- Activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    ip_address TEXT
);

-- Admin actions table
CREATE TABLE IF NOT EXISTS admin_actions (
    id SERIAL PRIMARY KEY,
    admin_wallet TEXT NOT NULL,
    action_type TEXT NOT NULL,
    target_wallet TEXT,
    details JSONB,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for demo) - Drop if exists first
DROP POLICY IF EXISTS "Allow all operations" ON users;
DROP POLICY IF EXISTS "Allow all operations" ON evidence;
DROP POLICY IF EXISTS "Allow all operations" ON cases;
DROP POLICY IF EXISTS "Allow all operations" ON activity_logs;
DROP POLICY IF EXISTS "Allow all operations" ON admin_actions;

CREATE POLICY "Allow all operations" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON evidence FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON cases FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON activity_logs FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON admin_actions FOR ALL USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_evidence_case ON evidence(case_id);
CREATE INDEX IF NOT EXISTS idx_evidence_submitted ON evidence(submitted_by);
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_logs(user_id);