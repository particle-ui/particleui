export const dynamic = "force-dynamic"

import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { UserProfile } from "@clerk/nextjs"
import { Sparkle } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Profile" }

export default async function ProfilePage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const clerkUser = await currentUser()
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  const isPro = user?.plan === "pro"

  const avatarUrl = clerkUser?.imageUrl
  const name = [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") || "—"
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "—"
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "—"

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-1">Profile</h1>
        <p className="text-sm text-[var(--color-text-3)]">Your identity and account details.</p>
      </div>

      {/* Identity card */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 mb-6">
        <div className="flex items-center gap-4 mb-5">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={name}
              width={56}
              height={56}
              className="rounded-full border border-[var(--color-border)]"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-lg font-bold text-[var(--color-text-2)]">
              {name.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-base font-semibold text-[var(--color-text-1)]">{name}</h2>
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                isPro
                  ? "bg-[var(--color-accent-dim)] border border-[var(--color-accent-border)] text-[var(--color-accent-text)]"
                  : "bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-4)]"
              }`}>
                {isPro && <Sparkle size={8} weight="fill" />}
                {isPro ? "Pro" : "Free"}
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-3)]">{email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--color-border)]">
          {[
            ["Member since", memberSince],
            ["Clerk ID", userId.slice(0, 20) + "…"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)] mb-0.5">{label}</p>
              <p className="text-sm font-mono text-[var(--color-text-2)]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Clerk UserProfile — manage name, email, password, 2FA */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h2 className="text-sm font-semibold text-[var(--color-text-1)]">Manage account</h2>
          <p className="text-xs text-[var(--color-text-3)]">Update your name, email, password, and connected accounts.</p>
        </div>
        <div className="p-4">
          <UserProfile
            routing="hash"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none border-none w-full",
                navbar: "hidden",
                pageScrollBox: "px-0",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
