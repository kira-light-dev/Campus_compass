"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  _id: string
  task: string
  completed: boolean
}

export function RevisionChecklist() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/checklist").then(r => r.json()).then(setTasks)
  }, [])

  const addTask = async () => {
    if (!newTask.trim()) return
    setLoading(true)
    const res = await fetch("/api/checklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask })
    })
    const created = await res.json()
    setTasks(prev => [created, ...prev])
    setNewTask("")
    setLoading(false)
  }

  const toggleTask = async (_id: string, completed: boolean) => {
    await fetch(`/api/checklist/${_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    })
    setTasks(prev => prev.map(t => t._id === _id ? { ...t, completed: !completed } : t))
  }

  const deleteTask = async (_id: string) => {
    await fetch(`/api/checklist/${_id}`, { method: "DELETE" })
    setTasks(prev => prev.filter(t => t._id !== _id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revision Checklist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Add Task */}
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Add a task..."
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
            style={{ flex: 1, border: "1px solid #ddd", borderRadius: "6px", padding: "6px 10px", fontSize: "14px" }}
          />
          <button
            onClick={addTask}
            disabled={loading}
            style={{ padding: "6px 14px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}
          >
            Add
          </button>
        </div>

        {tasks.map((task) => (
          <div key={task._id} className="flex items-center gap-3">
            <Checkbox
              id={`task-${task._id}`}
              checked={task.completed}
              onCheckedChange={() => toggleTask(task._id, task.completed)}
            />
            <label
              htmlFor={`task-${task._id}`}
              className={`text-sm flex-1 ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}
            >
              {task.task}
            </label>
            <button
              onClick={() => deleteTask(task._id)}
              style={{ border: "none", background: "none", cursor: "pointer", color: "#ef4444", fontSize: "16px" }}
            >
              ✕
            </button>
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No tasks yet. Add one above!</p>
        )}
      </CardContent>
    </Card>
  )
}