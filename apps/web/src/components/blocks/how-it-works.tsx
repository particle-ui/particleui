"use client"

import * as React from "react"
import { TerminalWindow, Copy, Rocket } from "@phosphor-icons/react"

interface Step {
  number: number
  icon: React.ReactNode
  title: string
  description: string
  code?: string
}

interface HowItWorksProps {
  heading?: string
  description?: string
  steps?: Step[]
}

const defaultSteps: Step[] = [
  {
    number: 1,
    icon: <TerminalWindow size={24} weight="duotone" />,
    title: "Install via CLI",
    description: "Add any component in seconds with a single command. No boilerplate, no configuration files.",
    code: "npx particleui-cli add button",
  },
  {
    number: 2,
    icon: <Copy size={24} weight="duotone" />,
    title: "Copy components",
    description: "Your code, your rules. Every file lands directly in your project — fully editable, MIT licensed.",
  },
  {
    number: 3,
    icon: <Rocket size={24} weight="duotone" />,
    title: "Ship",
    description: "Production-ready from day one. Accessible, typed, and battle-tested across hundreds of projects.",
  },
]

function HowItWorks({
  heading = "Get started in minutes",
  description = "Three steps from zero to a production-quality UI. No accounts, no lock-in, no magic.",
  steps = defaultSteps,
}: HowItWorksProps) {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-[var(--color-text-1)]">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-2)] max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-8 sm:grid-cols-3">
          {/* Connector lines (desktop only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-10 hidden h-px sm:block"
            style={{
              background:
                "repeating-linear-gradient(to right, var(--color-border) 0, var(--color-border) 6px, transparent 6px, transparent 14px)",
              left: "calc(33.333% / 2 + 2.5rem)",
              right: "calc(33.333% / 2 + 2.5rem)",
            }}
          />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center gap-4 text-center">
              {/* Step number circle */}
              <div className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-[var(--color-accent-border)] bg-[var(--color-surface-1)] shadow-[0_0_20px_var(--color-accent-dim)]">
                <span className="text-[var(--color-accent)] [&>*]:text-[var(--color-accent)]">
                  {step.icon}
                </span>
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-[var(--color-bg)]">
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-[var(--color-text-1)]">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-2)] max-w-[220px]">
                {step.description}
              </p>

              {step.code && (
                <code className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1.5 font-mono text-xs text-[var(--color-accent-text)]">
                  {step.code}
                </code>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { HowItWorks }
