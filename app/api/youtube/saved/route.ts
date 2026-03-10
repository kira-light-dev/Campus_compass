import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Video from "@/databases/video.model"

export async function GET() {
  await connectDB()
  const videos = await Video.find().sort({ createdAt: -1 })
  return NextResponse.json(JSON.parse(JSON.stringify(videos)))
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const existing = await Video.findOne({ videoId: body.videoId })
    if (existing) return NextResponse.json({ message: "Already saved" }, { status: 409 })
    const video = await Video.create(body)
    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Failed to save" }, { status: 500 })
  }
}