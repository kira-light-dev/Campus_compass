"use client"

import { useState } from "react"

export default function UploadSubjects() {
  const [loading, setLoading] = useState(false)

  async function uploadFile(e: any) {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)

    await fetch("/api/subjects/upload", {
      method: "POST",
      body: formData
    })

    setLoading(false)

    window.location.reload()
  }

  return (
    <div className="flex items-center gap-4">
      <label className="cursor-pointer rounded-lg border px-4 py-2 hover:bg-muted">
        {loading ? "Uploading..." : "Upload Subjects"}
        <input
          type="file"
          accept=".csv,.xlsx"
          className="hidden"
          onChange={uploadFile}
        />
      </label>
    </div>
  )
}