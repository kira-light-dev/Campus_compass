import { DashboardLayout } from "@/components/dashboard-layout"
import { RevisionChecklist } from "@/components/exam-prep/revision-checklist"
import { PreviousPapers } from "@/components/exam-prep/previous-papers"
import { ImportantTopics } from "@/components/exam-prep/important-topics"

export default function ExamPrepPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Exam Preparation</h2>
          <p className="mt-1 text-muted-foreground">Stay organized with checklists, papers, and key topics.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <RevisionChecklist />
          <PreviousPapers />
        </div>
        <ImportantTopics />
      </div>
    </DashboardLayout>
  )
}
