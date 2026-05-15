export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { readRegistryItem } from "@/lib/registry/reader"
import { validateToken } from "@/lib/auth/token"
import { isProItem } from "@/lib/registry/catalog"
import { db } from "@/db"
import { componentInstalls } from "@/db/schema"

function isCLIRequest(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? ""
  return /shadcn|node|curl|bun|deno/i.test(ua)
}

function getTierFromName(name: string): string {
  // Infer from catalog — pro items are tracked separately
  return "core"
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ fw: string; name: string }> }
) {
  const { fw, name } = await params

  if (!["react", "vue", "svelte"].includes(fw)) {
    return NextResponse.json({ error: "Unknown framework" }, { status: 404 })
  }

  const item = await readRegistryItem(fw, name)
  if (!item) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 })
  }

  let userId: string | undefined
  let tokenId: string | undefined
  const itemRecord = item as Record<string, unknown>
  const cats = Array.isArray(itemRecord.categories) ? (itemRecord.categories as string[]) : []
  let tier = cats.includes("pro") ? "pro" : (cats[0] ?? "core")

  if (isProItem(fw, name)) {
    const authHeader = req.headers.get("authorization")
    const token = authHeader?.replace(/^Bearer\s+/i, "")

    if (!token) {
      return NextResponse.json(
        {
          type: "https://particleui.dev/errors/unauthorized",
          title: "Unauthorized",
          detail:
            "This is a ParticleUI Pro component. Add your API token to components.json: \"headers\": { \"Authorization\": \"Bearer ${PARTICLEUI_TOKEN}\" }. Get a token at https://particleui.dev/dashboard.",
          status: 401,
        },
        {
          status: 401,
          headers: { "Content-Type": "application/problem+json" },
        }
      )
    }

    const result = await validateToken(token)
    if (!result.valid) {
      return NextResponse.json(
        {
          type: "https://particleui.dev/errors/forbidden",
          title: "Invalid token",
          detail:
            "Your ParticleUI token is invalid or expired. Renew it at https://particleui.dev/dashboard.",
          status: 403,
        },
        {
          status: 403,
          headers: { "Content-Type": "application/problem+json" },
        }
      )
    }

    userId = result.userId
    tokenId = result.tokenId
    tier = "pro"
  }

  // Fire-and-forget install tracking
  if (userId || isCLIRequest(req)) {
    db.insert(componentInstalls)
      .values({
        userId: userId ?? null,
        tokenId: tokenId ? (tokenId as `${string}-${string}-${string}-${string}-${string}`) : null,
        componentName: name,
        framework: fw,
        tier,
      })
      .execute()
      .catch(() => {})
  }

  return NextResponse.json(item, {
    headers: {
      "Content-Type": "application/vnd.shadcn.v1+json",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
