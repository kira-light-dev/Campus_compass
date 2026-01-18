import { DashboardLayout } from "@/components/dashboard-layout"
import { ResourceCategory } from "@/components/resources/resource-category"
import { resources } from "@/lib/mock-data"

export default function ResourcesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Resources</h2>
          <p className="mt-1 text-muted-foreground">Curated learning materials to help you excel in your studies.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {resources.map((resource) => (
            <ResourceCategory key={resource.category} category={resource.category} items={resource.items} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
