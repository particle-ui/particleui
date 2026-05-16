"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EnvelopeSimple } from "@phosphor-icons/react"

interface AuthVerifyEmailProps {
  email?: string
  onOpenEmailApp?: () => void
  onResend?: () => void
  openEmailHref?: string
  resendCooldown?: number
}

function AuthVerifyEmail({
  email = "email@example.com",
  onOpenEmailApp,
  onResend,
  openEmailHref = "https://mail.google.com",
  resendCooldown = 60,
}: AuthVerifyEmailProps) {
  const [seconds, setSeconds] = React.useState(resendCooldown)
  const [canResend, setCanResend] = React.useState(false)
  const [resending, setResending] = React.useState(false)

  React.useEffect(() => {
    if (seconds <= 0) {
      setCanResend(true)
      return
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds])

  const handleResend = async () => {
    if (!canResend) return
    setResending(true)
    try {
      await onResend?.()
    } finally {
      setResending(false)
      setCanResend(false)
      setSeconds(resendCooldown)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[420px] px-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader className="gap-3 items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)]">
            <EnvelopeSimple size={32} weight="duotone" className="text-[var(--color-accent)]" />
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl">Verify your email</CardTitle>
            <CardDescription>
              We sent a verification link to{" "}
              <span className="font-medium text-[var(--color-text-2)]">{email}</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <Button asChild className="w-full" onClick={onOpenEmailApp}>
            <a href={openEmailHref} target="_blank" rel="noopener noreferrer">
              Open email app
            </a>
          </Button>
        </CardContent>

        <CardFooter className="justify-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-xs text-[var(--color-accent-text)] hover:text-[var(--color-accent)] transition-colors disabled:opacity-50"
            >
              {resending ? "Resending…" : "Resend email"}
            </button>
          ) : (
            <p className="text-xs text-[var(--color-text-3)]">
              Resend in{" "}
              <span className="tabular-nums text-[var(--color-text-2)]">{seconds}s</span>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export { AuthVerifyEmail }
export default AuthVerifyEmail
