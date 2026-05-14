import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { apiTokens, users } from "@/db/schema"
import { eq, isNull } from "drizzle-orm"
import { createToken } from "@/lib/auth/token"
import { TokenRow } from "./token-row"
import {
  Key,
  Plus,
  Lightning,
  ArrowSquareOut,
} from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const clerkUser = await currentUser()
  if (clerkUser) {
    await db
      .insert(users)
      .values({
        id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        plan: "free",
      })
      .onConflictDoNothing()
  }

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)

  const tokens = await db
    .select()
    .from(apiTokens)
    .where(eq(apiTokens.userId, userId) && isNull(apiTokens.revokedAt))
    .orderBy(apiTokens.createdAt)

  const isPro = user?.plan === "pro"

  return (
    <main className="min-h-svh bg-[#090909] text-white">
      <header className="border-b border-white/[0.06] bg-[#090909]">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <Lightning weight="fill" size={16} className="text-[#00d4ff]" />
            ParticleUI
          </Link>
          <Link
            href="/docs"
            className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#888] transition-colors"
          >
            Docs <ArrowSquareOut size={12} />
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Header row */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
            <p className="text-sm text-[#555]">
              {clerkUser?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
          <PlanBadge plan={user?.plan ?? "free"} />
        </div>

        {/* Upgrade nudge */}
        {!isPro && (
          <div className="mb-8 rounded-xl border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.05)] p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium mb-0.5">Unlock Pro components</p>
              <p className="text-xs text-[#555]">
                Particle Hero, Magnetic Button, Aurora Background, and more.
              </p>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 rounded-md bg-[#00d4ff] px-4 py-2 text-xs font-semibold text-black hover:bg-[#22e0ff] transition-colors"
            >
              Upgrade — $149
            </Link>
          </div>
        )}

        {/* Tokens card */}
        <section className="rounded-xl border border-white/[0.07] bg-[#0e0e0e] p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Key size={18} weight="duotone" className="text-[#00d4ff]" />
              <h2 className="font-semibold text-sm">API Tokens</h2>
            </div>
            <CreateTokenForm userId={userId} />
          </div>

          {tokens.length === 0 ? (
            <div className="py-8 text-center">
              <Key size={28} weight="thin" className="text-[#333] mx-auto mb-3" />
              <p className="text-sm text-[#444]">No tokens yet.</p>
              <p className="text-xs text-[#333] mt-1">Create one to start installing Pro components.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {tokens.map((t) => (
                <TokenRow key={t.id} token={t} />
              ))}
            </div>
          )}
        </section>

        {/* Setup snippet */}
        <section className="rounded-xl border border-white/[0.07] bg-[#0e0e0e] p-6">
          <h2 className="font-semibold text-sm mb-4">Quick setup</h2>
          <p className="text-xs text-[#555] mb-4">
            Add your token to <code className="text-[#00d4ff]">.env</code>, then configure{" "}
            <code className="text-[#00d4ff]">components.json</code>:
          </p>
          <pre className="rounded-lg bg-[#090909] border border-white/[0.06] p-4 text-xs text-[#666] overflow-x-auto leading-relaxed">
{`# .env
PARTICLEUI_TOKEN=<your-token>

# components.json
"registries": {
  "@particleui": {
    "url": "https://particleui.dev/r/react/{name}.json",
    "headers": {
      "Authorization": "Bearer \${PARTICLEUI_TOKEN}"
    }
  }
}`}
          </pre>
        </section>
      </div>
    </main>
  )
}

function PlanBadge({ plan }: { plan: string }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        plan === "pro"
          ? "border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff]"
          : "border border-white/[0.08] bg-white/[0.04] text-[#555]"
      }`}
    >
      {plan === "pro" ? "Pro" : "Free"}
    </span>
  )
}

async function CreateTokenForm({ userId }: { userId: string }) {
  async function create() {
    "use server"
    await createToken(userId, "Default")
    const { revalidatePath } = await import("next/cache")
    revalidatePath("/dashboard")
  }

  return (
    <form action={create}>
      <button
        type="submit"
        className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-[#888] hover:border-white/20 hover:text-white transition-colors"
      >
        <Plus size={12} weight="bold" />
        New token
      </button>
    </form>
  )
}
