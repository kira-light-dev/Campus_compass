import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Subject from "@/databases/subjects.model"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ subjectId: string, topicId: string }> }
) {
  try {
    await connectDB()
    const { subjectId, topicId } = await params

    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      { $pull: { topics: { _id: topicId } } },
      { new: true }
    )

    if (!subject) {
      return NextResponse.json({ message: "Subject not found" }, { status: 404 })
    }

    return NextResponse.json(subject, { status: 200 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to delete topic" }, { status: 500 })
  }
}