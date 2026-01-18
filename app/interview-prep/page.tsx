import { DashboardLayout } from "@/components/dashboard-layout"
import { DsaPractice } from "@/components/interview-prep/dsa-practice"
import { CoreSubjects } from "@/components/interview-prep/core-subjects"
import { MockInterviews } from "@/components/interview-prep/mock-interviews"
import { ReadinessIndicator } from "@/components/interview-prep/readiness-indicator"

export default function InterviewPrepPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Interview Preparation</h2>
          <p className="mt-1 text-muted-foreground">Practice DSA, review core subjects, and track your readiness.</p>
        </div>
        <ReadinessIndicator />
        <div className="grid gap-6 lg:grid-cols-2">
          <DsaPractice />
          <CoreSubjects />
        </div>
        <MockInterviews />
      </div>
    </DashboardLayout>
  )
}
