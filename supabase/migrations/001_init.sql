-- Initial schema for task-reminder app
-- Run this with supabase CLI (supabase db push / psql) or via SQL editor

-- Enable uuid/ossp if needed (Supabase projects typically have extensions available)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles table (lightweight, mirrors auth.users id)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text,
  email text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  creator uuid REFERENCES profiles(id) ON DELETE SET NULL,
  assignee uuid REFERENCES profiles(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'open',
  due_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tasks_assignee ON tasks(assignee);
CREATE INDEX IF NOT EXISTS idx_tasks_due_at ON tasks(due_at);

-- Reminders table
CREATE TABLE IF NOT EXISTS reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  remind_at timestamptz NOT NULL,
  channel text NOT NULL DEFAULT 'console', -- email, sms, push, etc.
  payload jsonb,
  sent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reminders_remind_at ON reminders(remind_at);
CREATE INDEX IF NOT EXISTS idx_reminders_sent ON reminders(sent);

-- Optional: lightweight view to see due reminders
CREATE OR REPLACE VIEW due_reminders AS
SELECT r.*,
       t.title as task_title,
       t.assignee
FROM reminders r
JOIN tasks t ON t.id = r.task_id
WHERE r.sent = false
  AND r.remind_at <= now();
