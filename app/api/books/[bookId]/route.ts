import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Book from "@/databases/book.model"
import { del } from "@vercel/blob"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ bookId: string }> }
) {
  try {
    await connectDB()
    const { bookId } = await params
    const book = await Book.findById(bookId)
    if (book) {
      await del(book.url)  // delete from blob storage too
    }
    await Book.findByIdAndDelete(bookId)
    return NextResponse.json({ message: "Deleted" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 })
  }
}