import { DashboardLayout } from "@/components/dashboard-layout"
import { SubjectCard } from "@/components/subjects/subject-card"
import { subjects } from "@/lib/mock-data"

export default function SubjectsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Subjects & Syllabus</h2>
          <p className="mt-1 text-muted-foreground">Track your progress and mark topics as you complete them.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              name={subject.name}
              code={subject.code}
              progress={subject.progress}
              topics={subject.topics}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
