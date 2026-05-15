"use client"

import { Footer } from "@/components/blocks/footer"

const navItems = [
  { label: "Introduction", href: "#" },
  { label: "Getting Started", href: "#" },
  { label: "Installation", href: "#" },
  { label: "Configuration", href: "#" },
  { label: "Components", href: "#" },
  { label: "API Reference", href: "#" },
  { label: "Changelog", href: "#" },
]

export function DocsSiteTemplate() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded bg-[var(--color-accent)] opacity-80" />
          <span className="font-bold text-sm tracking-tight text-[var(--color-text-1)]">MyDocs</span>
        </div>
        <nav className="hidden md:flex items-center gap-5 text-sm text-[var(--color-text-2)]">
          <a href="#" className="hover:text-[var(--color-text-1)] transition-colors">Docs</a>
          <a href="#" className="hover:text-[var(--color-text-1)] transition-colors">API</a>
          <a href="#" className="hover:text-[var(--color-text-1)] transition-colors">GitHub</a>
        </nav>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface-1)] py-8 px-4">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-3)]">
            Documentation
          </p>
          <nav className="flex flex-col gap-0.5">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={[
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  i === 0
                    ? "bg-[var(--color-accent-dim)] text-[var(--color-accent-text)] font-medium"
                    : "text-[var(--color-text-2)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-1)]",
                ].join(" ")}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-8 py-10 max-w-3xl">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
            Getting Started
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight leading-tight text-[var(--color-text-1)]">
            Introduction
          </h1>
          <p className="mb-6 text-[var(--color-text-2)] leading-relaxed">
            Welcome to the documentation. This template demonstrates a typical docs site layout with a sidebar navigation, top header, and structured content area.
          </p>

          <div className="mb-8 rounded-xl border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] px-5 py-4 text-sm text-[var(--color-accent-text)]">
            This is a placeholder docs layout. Wire up your sidebar items and content sections to match your project structure.
          </div>

          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-[var(--color-text-1)]">
            Quick start
          </h2>
          <p className="mb-4 text-[var(--color-text-2)] leading-relaxed">
            Install the package and follow the setup guide to get your project running in minutes.
          </p>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-4 font-mono text-sm text-[var(--color-text-2)] overflow-x-auto mb-6">
            <span className="text-[var(--color-accent)]">$</span> npx create-my-app my-project
          </div>

          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-[var(--color-text-1)]">
            Next steps
          </h2>
          <ul className="flex flex-col gap-2">
            {["Configure your settings", "Add your first component", "Deploy to production"].map((step) => (
              <li key={step} className="flex items-center gap-2 text-sm text-[var(--color-text-2)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                {step}
              </li>
            ))}
          </ul>
        </main>

        {/* On-page TOC */}
        <aside className="hidden xl:flex flex-col w-52 shrink-0 py-10 px-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-3)]">
            On this page
          </p>
          <nav className="flex flex-col gap-1.5">
            {["Introduction", "Quick start", "Next steps"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-[var(--color-text-3)] hover:text-[var(--color-text-1)] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>
      </div>

      <Footer />
    </div>
  )
}

export default DocsSiteTemplate
