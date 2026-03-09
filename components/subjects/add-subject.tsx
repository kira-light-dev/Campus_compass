"use client"

import { useState } from "react"

export default function AddSubject() {
  const [name, setName] = useState("")

  async function addSubject() {
    if (!name) return

    await fetch("/api/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })

    setName("")
    window.location.reload()
  }

  return (
    <div className="flex gap-2">
      <input
        placeholder="New subject"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2"
      />

      <button
        onClick={addSubject}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  )
}
