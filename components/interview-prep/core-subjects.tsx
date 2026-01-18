import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { interviewPrepData } from "@/lib/mock-data"

export function CoreSubjects() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Core CS Subjects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {interviewPrepData.coreSubjects.map((item) => (
          <div key={item.id}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{item.subject}</span>
              <span className="text-xs text-muted-foreground">{item.confidence}% confident</span>
            </div>
            <Progress value={item.confidence} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
