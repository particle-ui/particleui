import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { apiTokens, users } from "@/db/schema"
import { eq, isNull } from "drizzle-orm"
import { createToken, revokeToken } from "@/lib/auth/token"
import { TokenRow } from "./token-row"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  // Upsert user on first visit
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

  return (
    <main className="min-h-svh bg-particle-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-particle-400 text-sm">
              Manage your ParticleUI API tokens
            </p>
          </div>
          <PlanBadge plan={user?.plan ?? "free"} />
        </div>

        <section className="rounded-xl border border-particle-800 bg-particle-900/40 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">API Tokens</h2>
            <CreateTokenForm userId={userId} />
          </div>

          {tokens.length === 0 ? (
            <p className="text-sm text-particle-500 py-4 text-center">
              No tokens yet. Create one to start installing Pro components.
            </p>
          ) : (
            <div className="space-y-3">
              {tokens.map((t) => (
                <TokenRow key={t.id} token={t} />
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-particle-800 bg-particle-900/40 p-6">
          <h2 className="font-semibold mb-4">Quick install setup</h2>
          <p className="text-sm text-particle-400 mb-4">
            Add your token to <code className="text-electric-400">.env</code> and configure{" "}
            <code className="text-electric-400">components.json</code>:
          </p>
          <pre className="rounded-lg bg-particle-950 border border-particle-800 p-4 text-xs text-particle-300 overflow-x-auto">
            {`# .env
PARTICLEUI_TOKEN=your-token-here

# components.json — add under "registries":
"@particleui": {
  "url": "https://particleui.dev/r/react/{name}.json",
  "headers": {
    "Authorization": "Bearer \${PARTICLEUI_TOKEN}"
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
          ? "bg-electric-500/10 border border-electric-500/30 text-electric-400"
          : "bg-particle-800 text-particle-400"
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
        className="rounded-md bg-electric-500/10 border border-electric-500/30 text-electric-400 px-4 py-1.5 text-sm hover:bg-electric-500/20 transition-colors"
      >
        + New token
      </button>
    </form>
  )
}
