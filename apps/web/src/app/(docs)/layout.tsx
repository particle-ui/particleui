import { Sidebar } from "./_components/sidebar"
import { MobileNav } from "./_components/mobile-nav"
import { OnThisPage } from "@/components/docs/on-this-page"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg min-h-svh text-text-1 flex">
      <Sidebar />
      <MobileNav />
      <div className="flex-1 lg:pl-64 pt-14 lg:pt-0">
        <div className="flex">
          <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 outline-none">
            {children}
          </main>
          <aside aria-label="On this page" className="hidden xl:block w-56 shrink-0 sticky top-0 h-svh overflow-y-auto py-10 px-6 border-l border-border">
            <OnThisPage />
          </aside>
        </div>
      </div>
    </div>
  )
}
