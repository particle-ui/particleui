"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EnvelopeSimple, CheckCircle } from "@phosphor-icons/react"

interface AuthForgotPasswordProps {
  heading?: string
  description?: string
  onSubmit?: (email: string) => void
  signInHref?: string
}

function AuthForgotPassword({
  heading = "Forgot your password?",
  description = "Enter your email and we'll send you a reset link",
  onSubmit,
  signInHref = "/sign-in",
}: AuthForgotPasswordProps) {
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit?.(email)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[420px] px-4">
      <Card className="w-full max-w-sm">
        {submitted ? (
          <>
            <CardHeader className="gap-1 items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] mb-2">
                <EnvelopeSimple size={28} weight="duotone" className="text-[var(--color-accent)]" />
              </div>
              <CardTitle className="text-xl">Check your email</CardTitle>
              <CardDescription>
                We sent a password reset link to{" "}
                <span className="font-medium text-[var(--color-text-2)]">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] px-4 py-3 text-sm text-[var(--color-accent-text)]">
                <CheckCircle size={16} weight="duotone" />
                Reset link sent
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-xs text-[var(--color-text-3)]">
                Didn&apos;t receive it?{" "}
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setEmail("") }}
                  className="text-[var(--color-accent-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Try again
                </button>
              </p>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="gap-1">
              <CardTitle className="text-xl">{heading}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending…" : "Send reset link"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-xs text-[var(--color-text-3)]">
                Remember your password?{" "}
                <a
                  href={signInHref}
                  className="text-[var(--color-accent-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Back to sign in
                </a>
              </p>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}

export { AuthForgotPassword }
export default AuthForgotPassword
