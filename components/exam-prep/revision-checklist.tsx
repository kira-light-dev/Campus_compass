"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { examPrepData } from "@/lib/mock-data"

export function RevisionChecklist() {
  const [tasks, setTasks] = useState(examPrepData.revisionChecklist)

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revision Checklist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3">
            <Checkbox id={`task-${task.id}`} checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
            <label
              htmlFor={`task-${task.id}`}
              className={`text-sm ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}
            >
              {task.task}
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
