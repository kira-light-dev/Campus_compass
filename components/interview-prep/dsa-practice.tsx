import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { interviewPrepData } from "@/lib/mock-data"

export function DsaPractice() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>DSA Practice</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {interviewPrepData.dsaPractice.map((item) => {
          const progress = Math.round((item.completed / item.total) * 100)
          return (
            <div key={item.id}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.topic}</span>
                <span className="text-xs text-muted-foreground">
                  {item.completed}/{item.total}
                </span>
              </div>
              <Progress value={progress} />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
