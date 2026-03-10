import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Subject from "@/databases/subjects.model"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ subjectId: string }> }
) {
  try {
    await connectDB()
    const { subjectId } = await params
    const body = await req.json()

    // Debug: check if subject exists first
    const exists = await Subject.findById(subjectId)
    console.log("Subject exists:", exists)

    const subject = await Subject.findByIdAndUpdate(
      '69af173a001f0a395b423bab',
      { $push: { topics: { name: body.name, completed: false } } },
      { new: true }
    )

    console.log("Updated subject:", subject)

    if (!subject) {
      return NextResponse.json({ message: "Subject not found" }, { status: 404 })
    }

    return NextResponse.json(subject, { status: 200 })

  } catch (error) {
    console.error("Full error:", error)
    return NextResponse.json({ message: "Failed to add topic" }, { status: 500 })
  }
}