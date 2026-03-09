import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Subject from "@/databases/subjects.model"
import * as XLSX from "xlsx"

export async function POST(req: Request) {

  await connectDB()   

  const formData = await req.formData()
  const file = formData.get("file") as File

  const buffer = Buffer.from(await file.arrayBuffer())

  const workbook = XLSX.read(buffer)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  const rows = XLSX.utils.sheet_to_json(sheet)

  const subjectsMap: any = {}

  rows.forEach((row: any) => {
    if (!subjectsMap[row.Subject]) {
      subjectsMap[row.Subject] = {
        name: row.Subject,
        topics: []
      }
    }

    subjectsMap[row.Subject].topics.push({
      name: row.Topic,
      completed: false
    })
  })

  const subjects = Object.values(subjectsMap)

await Subject.deleteMany({})

await Subject.insertMany(subjects)

return NextResponse.json({ message: "Subjects uploaded successfully" })
}