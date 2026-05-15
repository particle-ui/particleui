"use client"

import { DashboardAnalytics } from "@/components/blocks/dashboard-analytics"
import { StatsSection } from "@/components/blocks/stats"

export function SaasDashboardTemplate() {
  return (
    <div className="flex flex-col gap-0">
      <StatsSection />
      <DashboardAnalytics />
    </div>
  )
}

export default SaasDashboardTemplate
