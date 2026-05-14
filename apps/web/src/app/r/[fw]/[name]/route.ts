import { NextRequest, NextResponse } from "next/server"
import { readRegistryItem } from "@/lib/registry/reader"
import { validateToken } from "@/lib/auth/token"
import { isProItem } from "@/lib/registry/catalog"

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

    const valid = await validateToken(token)
    if (!valid) {
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
  }

  return NextResponse.json(item, {
    headers: {
      "Content-Type": "application/vnd.shadcn.v1+json",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
