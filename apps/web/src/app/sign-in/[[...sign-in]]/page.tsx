import type { Metadata } from "next"
import { SignIn } from "@clerk/nextjs"

export const metadata: Metadata = { title: "Sign in" }

export default function SignInPage() {
  return (
    <div className="min-h-svh flex items-center justify-center bg-[var(--color-bg)]">
      <SignIn />
    </div>
  )
}
