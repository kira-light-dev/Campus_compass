import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Note from "@/databases/note.model"
import { del } from "@vercel/blob"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ noteId: string }> }
) {
  try {
    await connectDB()
    const { noteId } = await params
    const note = await Note.findById(noteId)
    if (note) {
      await del(note.url)
    }
    await Note.findByIdAndDelete(noteId)
    return NextResponse.json({ message: "Deleted" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 })
  }
}