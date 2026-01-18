import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { examPrepData } from "@/lib/mock-data"

const priorityColors = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-emerald-100 text-emerald-700 border-emerald-200",
}

export function ImportantTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Important Topics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {examPrepData.importantTopics.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium text-foreground">{item.topic}</p>
              <p className="text-xs text-muted-foreground">{item.subject}</p>
            </div>
            <Badge className={priorityColors[item.priority]} variant="outline">
              {item.priority}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
