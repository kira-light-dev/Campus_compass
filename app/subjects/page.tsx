import { DashboardLayout } from "@/components/dashboard-layout"
import SubjectCard  from "@/components/subjects/subject-card"
import UploadSubjects from "@/components/subjects/upload-subjects"

export default async function SubjectsPage() {

  const res = await fetch("http://localhost:3000/api/subjects", {
    cache: "no-store"
  })

  const subjects = await res.json()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Subjects & Syllabus
            </h2>
            <p className="mt-1 text-muted-foreground">
              Track your progress and mark topics as you complete them.
            </p>
          </div>

          <UploadSubjects />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject: any) => (
            <SubjectCard
              key={subject._id}
              name={subject.name}
              topics={subject.topics}
            />
          ))}
        </div>

      </div>
    </DashboardLayout>
  )
}
