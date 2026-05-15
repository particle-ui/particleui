import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { themes } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { tokensToRegistryItem } from "@/lib/themes/serialize"
import type { ThemeTokens } from "@/lib/themes/serialize"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  let theme: typeof themes.$inferSelect | undefined
  try {
    ;[theme] = await db
      .select()
      .from(themes)
      .where(and(eq(themes.slug, slug), eq(themes.isPublic, true)))
      .limit(1)
  } catch {
    return NextResponse.json({ error: "Theme not found" }, { status: 404 })
  }

  if (!theme) {
    return NextResponse.json({ error: "Theme not found" }, { status: 404 })
  }

  let tokens: ThemeTokens
  try {
    tokens = JSON.parse(theme.tokensJson) as ThemeTokens
  } catch {
    return NextResponse.json({ error: "Invalid theme data" }, { status: 500 })
  }

  const item = tokensToRegistryItem(theme.name, theme.slug, tokens)
  return NextResponse.json(item)
}
