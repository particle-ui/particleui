"use client"

import * as React from "react"
import { Separator } from "@/components/ui/separator"

interface FooterLink {
  label: string
  href: string
}

interface FooterGroup {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  brand?: string
  tagline?: string
  groups?: FooterGroup[]
  legal?: FooterLink[]
  copyright?: string
}

const defaultGroups: FooterGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/docs/components/button" },
      { label: "Getting started", href: "/docs/getting-started/installation" },
      { label: "Theming", href: "/docs/theming" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Figma kit", href: "/figma" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Releases", href: "https://github.com/releases" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

const defaultLegal: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "License (MIT)", href: "/license" },
]

function Footer({
  brand = "ParticleUI",
  tagline = "The component library that ships with you.",
  groups = defaultGroups,
  legal = defaultLegal,
  copyright = `© ${new Date().getFullYear()} ParticleUI. Open source under MIT.`,
}: FooterProps) {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-1)]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="text-lg font-bold text-[var(--color-text-1)]">{brand}</div>
            <p className="text-sm text-[var(--color-text-3)] max-w-48 leading-relaxed">{tagline}</p>
          </div>

          {/* Link groups */}
          {groups.map((g) => (
            <div key={g.title} className="flex flex-col gap-3">
              <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-4)]">
                {g.title}
              </div>
              <ul className="flex flex-col gap-2">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-[var(--color-text-3)] hover:text-[var(--color-text-1)] transition-colors duration-150"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-4)]">{copyright}</p>
          <div className="flex items-center gap-4">
            {legal.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs text-[var(--color-text-4)] hover:text-[var(--color-text-2)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
