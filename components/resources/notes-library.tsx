"use client"

import { useState, useEffect } from "react"
import { Upload, Trash2, ExternalLink, FileText, Image, File } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NoteFile {
  _id: string
  name: string
  url: string
  signedUrl: string
  fileType: string
  size: number
}

const getFileIcon = (fileType: string) => {
  if (fileType.includes("image")) return Image
  if (fileType.includes("pdf")) return FileText
  return File
}

const formatSize = (bytes: number) => {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / 1024).toFixed(0)} KB`
}

export function NotesLibrary() {
  const [notes, setNotes] = useState<NoteFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [name, setName] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch("/api/notes")
      .then(r => r.json())
      .then(data => setNotes(data))
  }, [])

  const upload = async () => {
    if (!file || !name.trim()) return
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("name", name)
    await fetch("/api/notes", { method: "POST", body: formData })
    const refreshed = await fetch("/api/notes").then(r => r.json())
    setNotes(refreshed)
    setName("")
    setFile(null)
    setShowForm(false)
    setUploading(false)
  }

  const deleteNote = async (_id: string) => {
    await fetch(`/api/notes/${_id}`, { method: "DELETE" })
    setNotes(prev => prev.filter(n => n._id !== _id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Notes</h2>
          <p className="mt-1 text-muted-foreground">Upload and manage your study notes.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/resources" className="text-sm text-primary hover:underline">← Back</Link>
          <Button size="sm" onClick={() => setShowForm(!showForm)}>
            <Upload className="h-4 w-4 mr-2" />
            {showForm ? "Cancel" : "Upload Note"}
          </Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <input
              type="text"
              placeholder="Note name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground"
            />
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.docx"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="text-sm text-foreground"
            />
            <Button onClick={upload} disabled={uploading || !file || !name.trim()} className="w-full">
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </CardContent>
        </Card>
      )}

      {notes.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No notes uploaded yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map(note => {
            const Icon = getFileIcon(note.fileType)
            return (
              <Card key={note._id}>
                <CardContent className="p-4 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-100 dark:bg-blue-900 p-2">
                      <Icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground line-clamp-2">{note.name}</p>
                      <p className="text-xs text-muted-foreground">{formatSize(note.size)}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <a href={note.signedUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                    <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => deleteNote(note._id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}