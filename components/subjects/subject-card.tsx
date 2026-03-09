"use client"

import { useState } from "react"
import AddTopic from "./add-topic"

interface Topic {
_id: string
name: string
completed: boolean
}

interface SubjectCardProps {
name: string
topics: Topic[]
subjectId?: string
}

export default function SubjectCard({ name, topics, subjectId }: SubjectCardProps) {

const [expanded, setExpanded] = useState(false)
const [topicStates, setTopicStates] = useState(topics)

const toggleTopic = (_id: string) => {
setTopicStates((prev) =>
prev.map((t) =>
t._id === _id ? { ...t, completed: !t.completed } : t
)
)
}

const completedCount = topicStates.filter((t) => t.completed).length

const currentProgress =
topicStates.length === 0
? 0
: Math.round((completedCount / topicStates.length) * 100)

return (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "16px"
    }}
  >
    {/* Header */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h3>{name}</h3>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          fontSize: "18px",
          cursor: "pointer",
          border: "none",
          background: "none"
        }}
      >
        {expanded ? "▲" : "▼"}
      </button>
    </div>

    {/* Progress */}
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          height: "8px",
          background: "#eee",
          borderRadius: "4px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${currentProgress}%`,
            background: "#3b82f6",
            height: "100%"
          }}
        />
      </div>
      <p style={{ fontSize: "12px", marginTop: "4px" }}>
        {currentProgress}%
      </p>
    </div>

    {/* Topics */}
    {expanded && (
      <div style={{ marginTop: "12px" }}>
        {topicStates.map((topic) => (
          <div
            key={topic._id}
            style={{ display: "flex", gap: "8px", marginBottom: "6px" }}
          >
            <input
              type="checkbox"
              checked={topic.completed}
              onChange={() => toggleTopic(topic._id)}
            />
            <span
              style={{
                textDecoration: topic.completed ? "line-through" : "none",
                color: topic.completed ? "#888" : "#000"
              }}
            >
              {topic.name}
            </span>
          </div>
        ))}
        {subjectId && <AddTopic subjectId={subjectId} />}
      </div>
    )}
  </div>
)
}
