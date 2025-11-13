import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { Dashboard } from "@/components/dashboard";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  // Ensure the user belongs to an organisation. If not, send them to org setup.
  const userId = data.claims.sub;
  const { data: membership } = await supabase
    .from("organisation_members")
    .select("organisation_id, role")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (!membership) {
    redirect("/organisation");
  }

  // Fetch initial tasks (server-side)
  const { data: tasks } = await supabase.from("tasks").select("*").order("created_at", { ascending: false }).limit(100);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is your dashboard — manage tasks and reminders
        </div>
      </div>

      <nav className="w-full max-w-5xl">
        <div className="flex gap-4 p-2">
          <a href="#tasks" className="text-sm text-primary">Tasks</a>
          <a href="#create-task" className="text-sm text-primary">Create task</a>
          <a href="#reminders" className="text-sm text-primary">Reminders</a>
        </div>
      </nav>

      <Dashboard initialTasks={tasks || []} />

      <section id="reminders" className="mt-8">
        <h3 className="text-lg font-medium mb-2">Reminders</h3>
        <p className="text-sm text-muted-foreground">Reminders will appear here once implemented.</p>
      </section>
    </div>
  );
}
