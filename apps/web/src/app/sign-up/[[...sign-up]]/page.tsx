import type { Metadata } from "next"
import { SignUp } from "@clerk/nextjs"

export const metadata: Metadata = { title: "Sign up" }

export default function SignUpPage() {
  return (
    <div className="min-h-svh flex items-center justify-center bg-[var(--color-bg)]">
      <SignUp />
    </div>
  )
}
