"use client"

import { useState } from "react"
import AddTopic from "@/components/subjects/add-topic"

interface Topic {
  _id: string
  name: string
  completed: boolean
}

interface SubjectCardProps {
  subjectId: string
  name: string
  topics: Topic[]
}

export default function SubjectCard({ subjectId, name, topics }: SubjectCardProps) {

  const [expanded, setExpanded] = useState(false)
  const [topicStates, setTopicStates] = useState(topics)

  const toggleTopic = (_id: string) => {
    setTopicStates((prev) =>
      prev.map((t) => t._id === _id ? { ...t, completed: !t.completed } : t)
    )
  }

  const deleteTopic = async (topicId: string) => {
    await fetch(`/api/subjects/${subjectId}/topic/${topicId}`, {
      method: "DELETE"
    })
    setTopicStates((prev) => prev.filter((t) => t._id !== topicId))
  }

  const deleteSubject = async () => {
    if (!confirm("Delete this subject?")) return
    await fetch(`/api/subjects/${subjectId}`, { method: "DELETE" })
    window.location.reload()
  }

  const completedCount = topicStates.filter((t) => t.completed).length
  const currentProgress =
    topicStates.length === 0
      ? 0
      : Math.round((completedCount / topicStates.length) * 100)

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>{name}</h3>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={deleteSubject}
            style={{ fontSize: "14px", cursor: "pointer", border: "none", background: "none", color: "#ef4444" }}
          >
            🗑
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{ fontSize: "18px", cursor: "pointer", border: "none", background: "none" }}
          >
            {expanded ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginTop: "10px" }}>
        <div style={{ height: "8px", background: "#eee", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ width: `${currentProgress}%`, background: "#3b82f6", height: "100%" }} />
        </div>
        <p style={{ fontSize: "12px", marginTop: "4px" }}>{currentProgress}%</p>
      </div>

      {/* Topics */}
      {expanded && (
        <div style={{ marginTop: "12px" }}>
          {topicStates.map((topic) => (
            <div key={topic._id} style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={topic.completed}
                onChange={() => toggleTopic(topic._id)}
              />
              <span style={{
                flex: 1,
                textDecoration: topic.completed ? "line-through" : "none",
                color: topic.completed ? "#888" : "#000"
              }}>
                {topic.name}
              </span>
              <button
                onClick={() => deleteTopic(topic._id)}
                style={{ border: "none", background: "none", cursor: "pointer", color: "#ef4444", fontSize: "14px" }}
              >
                ✕
              </button>
            </div>
          ))}

          <AddTopic subjectId={subjectId} />
        </div>
      )}
    </div>
  )
}