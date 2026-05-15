"use client"

import * as React from "react"
import { EnvelopeSimple, CheckCircle } from "@phosphor-icons/react"
import { GlowCard } from "@/components/ui/glow-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface NewsletterSectionProps {
  heading?: string
  description?: string
  placeholder?: string
  ctaLabel?: string
  disclaimer?: string
  onSubscribe?: (email: string) => void
}

function NewsletterSection({
  heading = "Stay in the loop",
  description = "Get notified when new components drop, design tips land, and the Pro tier opens up. No spam, ever.",
  placeholder = "you@company.com",
  ctaLabel = "Subscribe",
  disclaimer = "No spam. Unsubscribe anytime.",
  onSubscribe,
}: NewsletterSectionProps) {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)

    // Simulate async (replace with real call)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      onSubscribe?.(email)
    }, 800)
  }

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-xl">
        <GlowCard className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-10 text-center">
          {submitted ? (
            /* Success state */
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)]">
                <CheckCircle size={28} weight="duotone" className="text-[var(--color-accent)]" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-text-1)]">You&apos;re on the list!</h2>
              <p className="text-sm text-[var(--color-text-2)]">
                Thanks for subscribing. We&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            /* Default state */
            <>
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)]">
                <EnvelopeSimple size={28} weight="duotone" className="text-[var(--color-accent)]" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-1)]">
                {heading}
              </h2>
              <p className="mt-3 text-base text-[var(--color-text-2)]">{description}</p>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2"
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 bg-[var(--color-surface-2)] border-[var(--color-border)] text-[var(--color-text-1)] placeholder:text-[var(--color-text-4)]"
                />
                <Button type="submit" disabled={loading} className="shrink-0">
                  {loading ? "Subscribing…" : ctaLabel}
                </Button>
              </form>

              <p className="mt-4 text-xs text-[var(--color-text-3)]">{disclaimer}</p>
            </>
          )}
        </GlowCard>
      </div>
    </section>
  )
}

export { NewsletterSection }
