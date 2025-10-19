"use client";
import React from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function TaskForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [assignee, setAssignee] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("tasks").insert([{ title, description, assignee }]);
      if (error) throw error;
      setTitle("");
      setDescription("");
      setAssignee(null);
      onCreated?.();
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <form id="create-task" onSubmit={submit}>
        <CardHeader>
          <CardTitle>Create task</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2" />
            </div>
            <div>
              <Label>Description</Label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div>
              <Label>Assignee (user id)</Label>
              <Input value={assignee ?? ""} onChange={(e) => setAssignee(e.target.value || null)} className="mt-2" />
            </div>
            <div className="flex">
              <Button type="submit" variant="default" disabled={loading}>
                {loading ? "Creating..." : "Create task"}
              </Button>
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
