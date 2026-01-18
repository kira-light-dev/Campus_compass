"use client"

import { useState } from "react"
import { Download, Check, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { examPrepData } from "@/lib/mock-data"

export function PreviousPapers() {
  const [papers, setPapers] = useState(examPrepData.previousYearPapers)

  const markDownloaded = (id: number) => {
    setPapers((prev) => prev.map((p) => (p.id === id ? { ...p, downloaded: true } : p)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Previous Year Papers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {papers.map((paper) => (
          <div key={paper.id} className="flex items-center justify-between rounded-lg border border-border p-3">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-foreground">{paper.name}</span>
            </div>
            <Button
              variant={paper.downloaded ? "secondary" : "outline"}
              size="sm"
              onClick={() => markDownloaded(paper.id)}
              disabled={paper.downloaded}
            >
              {paper.downloaded ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> Done
                </>
              ) : (
                <>
                  <Download className="mr-1 h-4 w-4" /> Download
                </>
              )}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
