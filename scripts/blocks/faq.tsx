"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  heading?: string
  description?: string
  items?: FaqItem[]
}

const defaultItems: FaqItem[] = [
  {
    question: "Is ParticleUI free to use?",
    answer:
      "Yes — the core library and all free-tier components are MIT licensed. You own every file you copy into your project. Pro components (animations, advanced blocks) require a Pro license, but the vast majority of ParticleUI is completely free.",
  },
  {
    question: "Is ParticleUI compatible with shadcn/ui?",
    answer:
      "Absolutely. ParticleUI shares the same Radix UI foundation and Tailwind CSS approach as shadcn. You can use both libraries in the same project — ParticleUI simply extends the design language with electric tokens, particle effects, and ready-to-go blocks.",
  },
  {
    question: "Which frameworks does ParticleUI support?",
    answer:
      "ParticleUI targets React 18+ and Next.js 13+ (App Router). The components are framework-agnostic at their core and will work in Remix, Vite, Astro, or any React-compatible environment. Server components and client components are clearly marked.",
  },
  {
    question: "What does the license allow?",
    answer:
      "All free components are MIT — use them in personal projects, client work, and commercial products with no attribution required. Pro components come with a per-seat license that allows unlimited commercial use. Check the LICENSE file for the exact terms.",
  },
  {
    question: "Does ParticleUI support TypeScript?",
    answer:
      "TypeScript is a first-class citizen. Every component ships with full type definitions, exported interfaces, and strict prop types. You get autocomplete, type safety, and inline JSDoc comments right out of the box.",
  },
  {
    question: "Are Figma design files available?",
    answer:
      "Yes — a community Figma file with every free component is available to duplicate. Pro subscribers get access to the full Figma design system including variables, color tokens, and component properties synced with the code.",
  },
]

function FaqSection({
  heading = "Frequently asked questions",
  description = "Everything you need to know about ParticleUI. Can't find your answer? Reach out on Discord.",
  items = defaultItems,
}: FaqSectionProps) {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-[var(--color-text-1)]">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-2)]">{description}</p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full divide-y divide-[var(--color-border)]">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-0">
              <AccordionTrigger className="py-5 text-left text-base font-medium text-[var(--color-text-1)] hover:text-[var(--color-accent)] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-[var(--color-text-2)]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export { FaqSection }
