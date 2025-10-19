-- Seed sample data for development

INSERT INTO profiles (id, display_name, email)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Alice', 'alice@example.com'),
  ('00000000-0000-0000-0000-000000000002', 'Bob', 'bob@example.com')
ON CONFLICT DO NOTHING;

INSERT INTO tasks (id, title, description, creator, assignee, due_at)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'Finish report', 'Finish the quarterly report', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', now() + interval '1 day'),
  ('10000000-0000-0000-0000-000000000002', 'Plan meeting', 'Plan next week meeting', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', now() + interval '2 days')
ON CONFLICT DO NOTHING;

INSERT INTO reminders (task_id, remind_at, channel, payload)
VALUES
  ('10000000-0000-0000-0000-000000000001', now() + interval '12 hours', 'console', jsonb_build_object('message','Reminder: Finish report')),
  ('10000000-0000-0000-0000-000000000002', now() + interval '1 day', 'console', jsonb_build_object('message','Reminder: Plan meeting'))
ON CONFLICT DO NOTHING;
