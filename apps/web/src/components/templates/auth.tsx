"use client"

import { AuthSignIn } from "@/components/blocks/auth-sign-in"
import { AuthSignUp } from "@/components/blocks/auth-sign-up"
import { AuthForgotPassword } from "@/components/blocks/auth-forgot-password"
import { AuthVerifyEmail } from "@/components/blocks/auth-verify-email"

export function AuthTemplate() {
  return (
    <div className="flex flex-col gap-16 py-12">
      <div>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-3)] mb-6">
          Sign In
        </p>
        <AuthSignIn />
      </div>
      <div>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-3)] mb-6">
          Sign Up
        </p>
        <AuthSignUp />
      </div>
      <div>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-3)] mb-6">
          Forgot Password
        </p>
        <AuthForgotPassword />
      </div>
      <div>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-3)] mb-6">
          Verify Email
        </p>
        <AuthVerifyEmail />
      </div>
    </div>
  )
}

export default AuthTemplate
