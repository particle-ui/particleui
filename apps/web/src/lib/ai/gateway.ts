import { groq } from "@ai-sdk/groq"
import { generateObject } from "ai"
import { z } from "zod"

export const BLOCK_CATALOG: Record<string, string> = {
  "hero-split": "Full-width hero with headline, bullets, CTA buttons, and illustration panel",
  "hero-centered": "Centered hero with badge, gradient headline, and two CTAs",
  "feature-grid": "3-column grid of feature cards with icons and descriptions",
  "feature-alternating": "Alternating left/right sections with image + text",
  "stats": "Row of 4 animated counters with metric labels",
  "testimonials": "Grid of testimonial cards with star ratings and avatars",
  "pricing": "Pricing cards (Free / Pro / Team) with feature lists and CTAs",
  "faq": "Accordion FAQ with expandable Q&A items",
  "logo-cloud": "Infinite marquee of partner/integration logos",
  "how-it-works": "3-step process with numbered steps and connectors",
  "cta-section": "Bold CTA section with headline, subtext, and button",
  "newsletter": "Email signup form with success state",
  "footer": "Full site footer with nav columns, social links, and copyright",
  "auth-sign-in": "Sign-in form card with email, password, OAuth buttons",
  "auth-sign-up": "Sign-up form card with name, email, password fields",
  "dashboard-analytics": "Analytics dashboard with charts, stat cards, recent activity",
  "ai-chat": "AI chat interface with message bubbles and input",
  "settings-page": "Settings page with profile, billing, notifications sections",
}

const LayoutSchema = z.object({
  blocks: z
    .array(
      z.object({
        component: z.string(),
        reason: z.string().optional(),
      })
    )
    .min(1)
    .max(8),
})

export type GeneratedLayout = z.infer<typeof LayoutSchema>

const SYSTEM_PROMPT = `You are a UI layout generator for ParticleUI, a premium React component library.
When given a description of a page or product, you select the best combination of ParticleUI blocks to build it.

Available blocks:
${Object.entries(BLOCK_CATALOG)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}

Rules:
- Always start with a hero block (hero-split or hero-centered)
- Always end with footer
- Pick 3-7 blocks total that make a complete, cohesive page
- Only use blocks from the list above
- For SaaS products: hero + features + stats/social proof + pricing + faq + footer
- For simple landing: hero + features + cta + footer
- For dashboards: dashboard-analytics + stats (no hero/footer)`

export async function generateLayout(prompt: string): Promise<GeneratedLayout> {
  const { object } = await generateObject({
    model: groq("llama-3.3-70b-versatile"),
    schema: LayoutSchema,
    system: SYSTEM_PROMPT,
    prompt,
  })

  // Filter to only valid block names
  const valid = new Set(Object.keys(BLOCK_CATALOG))
  return {
    blocks: object.blocks.filter((b) => valid.has(b.component)),
  }
}
