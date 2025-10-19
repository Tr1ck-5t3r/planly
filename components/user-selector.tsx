"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function UserSelector({ value, onChange }: { value?: string | null; onChange: (v: string | null) => void }) {
  return (
    <div>
      <Label>Assignee</Label>
      <Input value={value ?? ""} onChange={(e) => onChange(e.target.value || null)} className="mt-2" />
      <p className="text-xs text-muted-foreground mt-1">Enter the user id to assign. We'll add a user picker soon.</p>
    </div>
  );
}
