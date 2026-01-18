import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { interviewPrepData } from "@/lib/mock-data"

export function ReadinessIndicator() {
  const score = interviewPrepData.readinessScore
  let level: "low" | "medium" | "high" = "low"
  let levelColor = "bg-red-100 text-red-700"

  if (score >= 70) {
    level = "high"
    levelColor = "bg-emerald-100 text-emerald-700"
  } else if (score >= 50) {
    level = "medium"
    levelColor = "bg-amber-100 text-amber-700"
  }

  return (
    <Card className="bg-accent/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Interview Readiness</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold text-foreground">{score}%</div>
          <Badge className={levelColor}>{level.toUpperCase()}</Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {level === "high"
            ? "You're well prepared! Keep practicing to maintain momentum."
            : level === "medium"
              ? "Good progress! Focus on weak areas to improve."
              : "Keep practicing! Consistency is key to improvement."}
        </p>
      </CardContent>
    </Card>
  )
}
