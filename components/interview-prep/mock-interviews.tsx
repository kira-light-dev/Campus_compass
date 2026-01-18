import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { interviewPrepData } from "@/lib/mock-data"

export function MockInterviews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mock Interview Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {interviewPrepData.mockInterviews.map((interview) => (
          <div key={interview.id} className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium text-foreground">{interview.type}</p>
              <p className="text-xs text-muted-foreground">{interview.date}</p>
            </div>
            <Badge variant="secondary">{interview.score}/10</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
