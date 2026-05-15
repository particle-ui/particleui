import { Sidebar } from "./_components/sidebar"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg min-h-svh text-text-1 flex">
      <Sidebar />
      <div className="flex-1 min-w-0 lg:pl-64">
        {children}
      </div>
    </div>
  )
}
