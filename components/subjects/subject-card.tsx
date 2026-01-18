"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Topic {
  id: number
  name: string
  completed: boolean
}

interface SubjectCardProps {
  name: string
  code: string
  progress: number
  topics: Topic[]
}

export function SubjectCard({ name, code, progress, topics }: SubjectCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [topicStates, setTopicStates] = useState(topics)

  const toggleTopic = (id: number) => {
    setTopicStates((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const currentProgress = Math.round((topicStates.filter((t) => t.completed).length / topicStates.length) * 100)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold">{name}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              {code}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Progress value={currentProgress} className="flex-1" />
          <span className="text-sm font-medium text-muted-foreground">{currentProgress}%</span>
        </div>
        {expanded && (
          <div className="mt-4 space-y-2 border-t border-border pt-4">
            {topicStates.map((topic) => (
              <div key={topic.id} className="flex items-center gap-3">
                <Checkbox
                  id={`topic-${topic.id}`}
                  checked={topic.completed}
                  onCheckedChange={() => toggleTopic(topic.id)}
                />
                <label
                  htmlFor={`topic-${topic.id}`}
                  className={`text-sm ${topic.completed ? "text-muted-foreground line-through" : "text-foreground"}`}
                >
                  {topic.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
