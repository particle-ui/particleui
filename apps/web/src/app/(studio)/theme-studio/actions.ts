"use server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/db"
import { themes } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { generateSlug } from "@/lib/themes/serialize"
import { revalidatePath } from "next/cache"

export async function saveThemeAction(name: string, tokensJson: string) {
  const { userId } = await auth()
  if (!userId) return { error: "Not signed in" }

  const slug = generateSlug(name) || `theme-${Date.now()}`

  await db
    .insert(themes)
    .values({ slug, userId, name, tokensJson })
    .onConflictDoUpdate({
      target: [themes.slug],
      set: { name, tokensJson, updatedAt: new Date() },
    })

  return { slug }
}

export async function publishThemeAction(slug: string) {
  const { userId } = await auth()
  if (!userId) return { error: "Not signed in" }

  await db
    .update(themes)
    .set({ isPublic: true })
    .where(and(eq(themes.slug, slug), eq(themes.userId, userId)))

  revalidatePath("/themes")
  return { url: `https://particleui.dev/themes/${slug}` }
}
