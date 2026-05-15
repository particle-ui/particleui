import { DashSidebar } from "./_components/dash-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh bg-[var(--color-bg)]">
      <DashSidebar />
      <main className="flex-1 ml-56 min-h-svh">
        <div className="mx-auto max-w-4xl px-8 py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
