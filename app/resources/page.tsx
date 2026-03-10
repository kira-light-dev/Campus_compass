import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"
import { Youtube, FileText, BookOpen, Code, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { resources } from "@/lib/mock-data"

const categoryConfig = [
  { key: "YouTube", icon: Youtube, href: "/resources/youtube", color: "text-red-500", description: "Saved videos & search" },
  { key: "Notes", icon: FileText, href: "/resources/notes", color: "text-blue-500", description: "Your uploaded notes" },
  { key: "Books", icon: BookOpen, href: "/resources/books", color: "text-amber-500", description: "Textbooks & references" },
  { key: "Practice", icon: Code, href: "/resources/practice", color: "text-emerald-500", description: "Coding practice platforms" },
]

export default function ResourcesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Resources</h2>
          <p className="mt-1 text-muted-foreground">Curated learning materials to help you excel in your studies.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {categoryConfig.map(({ key, icon: Icon, href, color, description }) => {
            const resource = resources.find(r => r.category === key)
            const previewItems = resource?.items.slice(0, 3) || []

            return (
              <Card key={key} className="flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${color}`} />
                    {key}
                  </CardTitle>
                  <Link
                    href={href}
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View All <ChevronRight className="h-4 w-4" />
                  </Link>
                </CardHeader>
                <CardContent className="space-y-2 flex-1">
                  <p className="text-xs text-muted-foreground mb-3">{description}</p>
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {previewItems.map((item) => (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border border-border p-2 transition-colors hover:bg-muted"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <Link
                    href={href}
                    className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg border border-border p-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
                  >
                    Open {key} <ChevronRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}