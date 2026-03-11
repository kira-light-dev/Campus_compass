"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { subjects as mockSubjects, examPrepData, interviewPrepData } from "@/lib/mock-data"

interface Topic { _id: string; name: string; completed: boolean }
interface Subject { _id: string; name: string; topics: Topic[] }

export function ProgressOverview() {
  const [subjects, setSubjects] = useState<Subject[] | null>(null)
  const [examTasks, setExamTasks] = useState<{ completed: boolean }[] | null>(null)

  useEffect(() => {
    fetch("/api/subjects")
      .then(r => r.json())
      .then(data => setSubjects(Array.isArray(data) ? data : []))
      .catch(() => setSubjects([]))

    fetch("/api/checklist")
      .then(r => r.json())
      .then(data => setExamTasks(Array.isArray(data) ? data : []))
      .catch(() => setExamTasks([]))
  }, [])

  const isLoading = subjects === null || examTasks === null

  const activeSubjects = (subjects && subjects.length > 0)
    ? subjects
    : mockSubjects.map(s => ({
        _id: String(s.id),
        name: s.name,
        topics: s.topics.map((t, i) => ({ _id: String(i), name: t.name, completed: t.completed }))
      }))

  const totalTopics = activeSubjects.reduce((acc, s) => acc + s.topics.length, 0)
  const completedTopics = activeSubjects.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0)
  const syllabusProgress = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100)

  const activeTasks = (examTasks && examTasks.length > 0)
    ? examTasks
    : examPrepData.revisionChecklist
  const examTasksCompleted = activeTasks.filter(t => t.completed).length
  const examTasksTotal = activeTasks.length
  const examProgress = examTasksTotal === 0 ? 0 : Math.round((examTasksCompleted / examTasksTotal) * 100)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Syllabus Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-8 bg-muted rounded w-16" />
              <div className="h-2 bg-muted rounded" />
              <div className="h-3 bg-muted rounded w-32" />
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold text-foreground">{syllabusProgress}%</div>
              <Progress value={syllabusProgress} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">{completedTopics} of {totalTopics} topics completed</p>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Exam Prep</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-8 bg-muted rounded w-16" />
              <div className="h-2 bg-muted rounded" />
              <div className="h-3 bg-muted rounded w-32" />
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold text-foreground">{examProgress}%</div>
              <Progress value={examProgress} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">{examTasksCompleted} of {examTasksTotal} tasks done</p>
            </>
          )}
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
            {interviewPrepData.readinessScore >= 70 ? "Good progress!" : interviewPrepData.readinessScore >= 50 ? "Keep practicing" : "Needs more work"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}