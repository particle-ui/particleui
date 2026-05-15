"use client"

import * as React from "react"
import { Marquee } from "@/components/ui/marquee"

interface LogoCloudProps {
  heading?: string
  companies?: string[]
}

const defaultCompanies: string[] = [
  "Vercel",
  "Linear",
  "Stripe",
  "Notion",
  "Figma",
  "Loom",
  "Resend",
  "Clerk",
  "Neon",
  "Supabase",
  "PlanetScale",
  "Axiom",
]

function CompanyPill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-1)] px-4 py-1.5 text-sm font-medium text-[var(--color-text-2)] transition-colors hover:border-[var(--color-accent-border)] hover:text-[var(--color-text-1)]">
      {name}
    </span>
  )
}

function LogoCloud({
  heading = "Trusted by teams at",
  companies = defaultCompanies,
}: LogoCloudProps) {
  const half = Math.ceil(companies.length / 2)
  const topRow = companies.slice(0, half)
  const bottomRow = companies.slice(half)

  return (
    <section className="px-4 py-20 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-3)]">
            {heading}
          </p>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="relative mb-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />
          <Marquee speed={35} gap={12}>
            {topRow.map((company) => (
              <CompanyPill key={company} name={company} />
            ))}
          </Marquee>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />
          <Marquee speed={35} gap={12} direction="right">
            {bottomRow.map((company) => (
              <CompanyPill key={company} name={company} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}

export { LogoCloud }
