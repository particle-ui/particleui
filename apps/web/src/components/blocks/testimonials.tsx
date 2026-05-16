"use client"

import * as React from "react"
import { Star } from "@phosphor-icons/react"
import { GlowCard } from "@/components/ui/glow-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
}

interface TestimonialsSectionProps {
  heading?: string
  subheading?: string
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "ParticleUI saved us weeks of design work. The components are polished, consistent, and drop right into our Next.js app without a fight.",
    name: "Alex Rivera",
    role: "Senior Engineer at Linear",
    initials: "AR",
  },
  {
    quote: "Finally a component library that has genuine visual identity. The glow effects and dark-first tokens are exactly what we needed.",
    name: "Priya Nair",
    role: "Frontend Lead at Vercel",
    initials: "PN",
  },
  {
    quote: "We shipped our landing page in two days. ParticleUI's blocks are beautifully designed and the code is clean — no fighting the abstraction.",
    name: "James Okafor",
    role: "Founder at Resend",
    initials: "JO",
  },
  {
    quote: "The Beam, Meteors, and GlowCard components alone are worth it. Our marketing site now looks like it cost 10× what it did.",
    name: "Sarah Chen",
    role: "Design Engineer at Stripe",
    initials: "SC",
  },
  {
    quote: "TypeScript support is first-class. Every prop is typed, the defaults are sensible, and the components just work. Highly recommend.",
    name: "Marcus Webb",
    role: "Staff Engineer at Clerk",
    initials: "MW",
  },
  {
    quote: "We evaluated every component library out there. ParticleUI won on aesthetics, DX, and the MIT license. Zero lock-in, maximum flexibility.",
    name: "Leila Hassan",
    role: "CTO at Neon",
    initials: "LH",
  },
]

function TestimonialsSection({
  heading = "Loved by developers",
  subheading = "Teams shipping production apps trust ParticleUI to make their UIs beautiful without slowing them down.",
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-[var(--color-text-1)]">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-2)] max-w-xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <GlowCard key={i} className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={16} weight="fill" className="text-[var(--color-accent)]" />
                ))}
              </div>

              {/* Quote */}
              <p className="flex-1 text-sm leading-relaxed text-[var(--color-text-2)]">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-[var(--color-accent-dim)] text-[var(--color-accent-text)] text-xs font-semibold">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-1)]">{t.name}</p>
                  <p className="text-xs text-[var(--color-text-3)]">{t.role}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export { TestimonialsSection }
