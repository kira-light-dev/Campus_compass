"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { interviewPrepData } from "@/lib/mock-data"

interface Topic {
  _id: string
  name: string
  completed: boolean
}

interface Subject {
  _id: string
  name: string
  topics: Topic[]
}

export function ReadinessIndicator() {
  const [subjects, setSubjects] = useState<Subject[] | null>(null)

  useEffect(() => {
    fetch("/api/subjects")
      .then(r => r.json())
      .then(data => setSubjects(Array.isArray(data) ? data : []))
      .catch(() => setSubjects([]))
  }, [])

  const isLoading = subjects === null
  const hasRealData = subjects && subjects.length > 0

  let score = interviewPrepData.readinessScore
  if (hasRealData) {
    const total = subjects!.reduce((acc, s) => acc + s.topics.length, 0)
    const completed = subjects!.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0)
    score = total === 0 ? 0 : Math.round((completed / total) * 100)
  }

  let level: "low" | "medium" | "high" = "low"
  let levelColor = "bg-red-100 text-red-700"
  if (score >= 70) { level = "high"; levelColor = "bg-emerald-100 text-emerald-700" }
  else if (score >= 50) { level = "medium"; levelColor = "bg-amber-100 text-amber-700" }

  return (
    <Card className="bg-accent/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Interview Readiness</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-10 bg-muted rounded w-20" />
            <div className="h-2 bg-muted rounded" />
            <div className="h-3 bg-muted rounded w-48" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-foreground">{score}%</div>
              <Badge className={levelColor}>{level.toUpperCase()}</Badge>
            </div>
            <Progress value={score} className="mt-2" />
            <p className="mt-2 text-sm text-muted-foreground">
              {level === "high"
                ? "You're well prepared! Keep practicing to maintain momentum."
                : level === "medium"
                  ? "Good progress! Focus on weak areas to improve."
                  : "Keep practicing! Consistency is key to improvement."}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}