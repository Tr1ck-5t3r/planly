"use client";
import React from "react";
import { TaskList } from "./task-list";
import { TaskForm } from "./task-form";

export function Dashboard({ initialTasks }: { initialTasks: any[] }) {
  const [refreshKey, setRefreshKey] = React.useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <TaskList initialTasks={initialTasks} refreshKey={refreshKey} />
      </div>
      <div>
        <TaskForm onCreated={() => setRefreshKey((k) => k + 1)} />
      </div>
    </div>
  );
}
