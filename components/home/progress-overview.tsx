import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { subjects, interviewPrepData, examPrepData } from "@/lib/mock-data"

export function ProgressOverview() {
  const totalTopics = subjects.reduce((acc, s) => acc + s.topics.length, 0)
  const completedTopics = subjects.reduce((acc, s) => acc + s.topics.filter((t) => t.completed).length, 0)
  const syllabusProgress = Math.round((completedTopics / totalTopics) * 100)

  const examTasksCompleted = examPrepData.revisionChecklist.filter((t) => t.completed).length
  const examTasksTotal = examPrepData.revisionChecklist.length
  const examProgress = Math.round((examTasksCompleted / examTasksTotal) * 100)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Syllabus Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{syllabusProgress}%</div>
          <Progress value={syllabusProgress} className="mt-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            {completedTopics} of {totalTopics} topics completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Exam Prep</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{examProgress}%</div>
          <Progress value={examProgress} className="mt-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            {examTasksCompleted} of {examTasksTotal} tasks done
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Interview Readiness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{interviewPrepData.readinessScore}%</div>
          <Progress value={interviewPrepData.readinessScore} className="mt-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            {interviewPrepData.readinessScore >= 70
              ? "Good progress!"
              : interviewPrepData.readinessScore >= 50
                ? "Keep practicing"
                : "Needs more work"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
