"use client";
import React from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Task = {
  id: string;
  title?: string;
  description?: string;
  status?: string;
  created_at?: string;
};

export function TaskList({ initialTasks, refreshKey }: { initialTasks: Task[]; refreshKey?: number }) {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks || []);

  // Client-side refresh
  async function refresh() {
    const supabase = createClient();
    const { data } = await supabase.from("tasks").select("*").order("created_at", { ascending: false }).limit(100);
    setTasks(data || []);
  }

  React.useEffect(() => {
    if (typeof refreshKey !== 'undefined') {
      // when refreshKey changes, re-fetch
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return (
    <div id="tasks" className="space-y-3">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <CardTitle>Tasks</CardTitle>
            <Button variant="ghost" size="sm" onClick={refresh}>Refresh</Button>
          </div>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">No tasks yet.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li key={t.id}>
                  <div className="p-3 border rounded-md flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{t.title}</div>
                      <div className="text-sm text-muted-foreground">{t.description}</div>
                    </div>
                    <div className="ml-4">
                      <Badge variant={t.status === 'done' ? 'secondary' : 'default'}>{t.status ?? 'open'}</Badge>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
