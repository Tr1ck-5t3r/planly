#!/usr/bin/env node
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { createClient } = require('../lib/supabase/server.js');

async function main() {
  // The createClient here should use service role key in env on server.
  const supabase = await createClient();

  // Query due reminders (not sent yet)
  const { data, error } = await supabase
    .from('due_reminders')
    .select('*')
    .limit(100);

  if (error) {
    console.error('Error fetching reminders:', error);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log('No due reminders.');
    return;
  }

  for (const r of data) {
    // For now, only console channel is implemented
    const payload = r.payload || { message: `Reminder for task ${r.task_id}` };
    console.log(`Sending reminder ${r.id} to assignee ${r.assignee}:`, payload);

    // Mark as sent
    const { error: updErr } = await supabase
      .from('reminders')
      .update({ sent: true })
      .eq('id', r.id);

    if (updErr) console.error('Failed to mark reminder sent', r.id, updErr);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
