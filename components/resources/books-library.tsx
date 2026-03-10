"use client"

import { useState, useEffect } from "react"
import { Upload, Trash2, ExternalLink, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BookFile {
  _id: string
  name: string
  url: string
  fileType: string
  size: number
}

const formatSize = (bytes: number) => {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / 1024).toFixed(0)} KB`
}

export function BooksLibrary() {
  const [books, setBooks] = useState<BookFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [name, setName] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch("/api/books")
      .then(r => r.json())
      .then(data => setBooks(data))
  }, [])

  const upload = async () => {
    if (!file || !name.trim()) return
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("name", name)
    const res = await fetch("/api/books", { method: "POST", body: formData })
    const created = await res.json()
    // fetch signed url for newly uploaded book
    const refreshed = await fetch("/api/books").then(r => r.json())
    setBooks(refreshed)
    setName("")
    setFile(null)
    setShowForm(false)
    setUploading(false)
  }

  const deleteBook = async (_id: string) => {
    await fetch(`/api/books/${_id}`, { method: "DELETE" })
    setBooks(prev => prev.filter(b => b._id !== _id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Books</h2>
          <p className="mt-1 text-muted-foreground">Upload and manage your textbooks and references.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/resources" className="text-sm text-primary hover:underline">← Back</Link>
          <Button size="sm" onClick={() => setShowForm(!showForm)}>
            <Upload className="h-4 w-4 mr-2" />
            {showForm ? "Cancel" : "Upload Book"}
          </Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <input
              type="text"
              placeholder="Book name"
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

      {books.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No books uploaded yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map(book => (
            <Card key={book._id}>
              <CardContent className="p-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-amber-100 dark:bg-amber-900 p-2">
                    <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground line-clamp-2">{book.name}</p>
                    <p className="text-xs text-muted-foreground">{formatSize(book.size)}</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <a href={book.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                  <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => deleteBook(book._id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}