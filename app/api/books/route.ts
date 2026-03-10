import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Book from "@/databases/book.model"
import { put } from "@vercel/blob"

export async function GET() {
  try {
    await connectDB()
    const books = await Book.find().sort({ createdAt: -1 })
    return NextResponse.json(JSON.parse(JSON.stringify(books)))
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const formData = await req.formData()
    const file = formData.get("file") as File
    const name = formData.get("name") as string

    const blob = await put(file.name, file, { access: "public" })
    const book = await Book.create({
      name,
      url: blob.url,
      fileType: file.type,
      size: file.size
    })
    return NextResponse.json(JSON.parse(JSON.stringify(book)), { status: 201 })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ message: "Failed to upload" }, { status: 500 })
  }
}