import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { Nav } from "../../_components/nav"

const POSTS: Record<
  string,
  { title: string; description: string; category: string; date: string; readTime: string }
> = {
  "oklch-color-space": {
    title: "OKLCH: The color space your design system has been waiting for",
    description:
      "Why we abandoned hex and HSL for perceptual color, and how OKLCH gave us a dark mode that actually works across every screen.",
    category: "Design Systems",
    date: "May 12, 2026",
    readTime: "6 min read",
  },
  "shadcn-registry-architecture": {
    title: "Building a shadcn-compatible registry in 2026",
    description:
      "The architecture behind ParticleUI's multi-framework registry: how one JSON schema powers React, Vue, and Svelte components from a single source of truth.",
    category: "Engineering",
    date: "May 8, 2026",
    readTime: "8 min read",
  },
  "particle-layer-design": {
    title: "The particle layer: adding motion without chaos",
    description:
      "How we designed the animated component layer to be drop-in replacements for their static counterparts — same props, same API, zero breaking changes.",
    category: "Design",
    date: "April 28, 2026",
    readTime: "5 min read",
  },
}

// ---------------------------------------------------------------------------
// Shared prose primitives
// ---------------------------------------------------------------------------

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[0.9375rem] leading-[1.85] text-[var(--color-text-2)]">{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold tracking-tight text-[var(--color-text-1)] pt-6 pb-1">
    {children}
  </h2>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-[var(--color-surface-2)] px-1.5 py-0.5 text-xs font-mono text-[var(--color-text-1)]">
    {children}
  </code>
)

const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-[var(--color-text-1)]">{children}</strong>
)

const Pre = ({ children }: { children: React.ReactNode }) => (
  <pre className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5 overflow-x-auto text-xs font-mono leading-relaxed text-[var(--color-text-2)]">
    {children}
  </pre>
)

const Callout = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] px-5 py-4 text-sm text-[var(--color-text-2)] leading-relaxed">
    {children}
  </div>
)

// ---------------------------------------------------------------------------
// Article content
// ---------------------------------------------------------------------------

const ARTICLE_CONTENT: Record<string, React.ReactNode> = {
  // -------------------------------------------------------------------------
  // Article 1: OKLCH
  // -------------------------------------------------------------------------
  "oklch-color-space": (
    <article className="space-y-5">
      <H2>The problem with hex and HSL</H2>
      <P>
        Hex codes are machine notation. <Code>#3b82f6</Code> tells you nothing useful —
        you have to load it into a color picker to understand what you&apos;re looking at. Experienced
        designers can sometimes squint at a hex value and guess the hue, but the lightness and
        saturation are completely opaque. That alone makes hex a poor authoring format for
        design tokens, but the deeper problem shows up when you try to build a palette.
      </P>
      <P>
        HSL was supposed to fix this. Hue, saturation, lightness — intuitive, right? In practice,
        HSL&apos;s <Strong>L channel is perceptually non-uniform</Strong>. Set{" "}
        <Code>hsl(120 100% 50%)</Code> and you get a blinding lime green that feels far brighter than
        <Code>hsl(240 100% 50%)</Code>, a deep blue — even though both claim 50% lightness. Building
        an accessible color palette in HSL means hand-tuning every shade individually to compensate
        for this unevenness. Your 500-step greens need different numeric lightness values than your
        500-step blues just to look visually equivalent. It is tedious, error-prone, and breaks down
        the moment you add a new hue to the system.
      </P>
      <P>
        Dark mode makes this worse. Inverting HSL palettes naively produces colors that look washed
        out or fluorescent. Designers end up maintaining two entirely separate sets of hand-tuned
        tokens — one for light, one for dark — and keeping them in sync becomes a full-time job.
      </P>

      <H2>What OKLCH actually is</H2>
      <P>
        OKLCH is part of CSS Color Level 4, shipping in all major browsers since late 2023. It
        defines colors with three channels: <Strong>L</Strong> (perceptual lightness, 0–1),{" "}
        <Strong>C</Strong> (chroma, roughly saturation, 0–0.4), and <Strong>H</Strong> (hue angle,
        0–360). The key word is <em>perceptual</em>. An L value of 0.5 truly looks middle-gray
        regardless of the hue. You can build a 10-step scale across any number of hues just by
        sweeping L from 0.1 to 0.95, and every step at the same L will feel equally bright.
      </P>
      <P>
        The &ldquo;OK&rdquo; in OKLCH stands for the Björn Ottosson color model on which it is based.
        It improves on its predecessor LCH by eliminating hue shift artifacts (where blues would
        drift purple under certain transformations). OKLCH is now the recommended starting point for
        any color science work in CSS.
      </P>
      <P>
        A concrete example: <Code>oklch(0.7 0.15 30)</Code> describes a warm orange at exactly 70%
        perceived brightness. Change the hue to <Code>oklch(0.7 0.15 260)</Code> and you get a muted
        indigo at the same perceived brightness — no manual compensation needed. This predictability
        is the entire point.
      </P>
      <Pre>{`/* Warm orange, 70% perceived brightness */
oklch(0.7 0.15 30)

/* Same L, same C — now indigo */
oklch(0.7 0.15 260)

/* You can also use percentage syntax */
oklch(70% 0.15 30)`}</Pre>

      <H2>Building a real scale with ParticleUI tokens</H2>
      <P>
        ParticleUI&apos;s dark theme starts with an almost-black background:{" "}
        <Code>oklch(0.04 0.005 60)</Code>. That reads as: 4% perceptual brightness, nearly zero
        chroma, hue 60 (yellow-warm). The chroma nudge toward yellow gives the background the
        &ldquo;warm espresso&rdquo; character rather than cold neutral gray. The cream foreground sits at{" "}
        <Code>oklch(0.96 0.01 80)</Code> — 96% bright, a whisper of golden chroma. Both values were
        chosen by typing numbers into <a href="https://oklch.com" className="text-[var(--color-accent)] hover:underline">oklch.com</a>{" "}
        and watching the swatch, not by converting from some hex value found in a Figma file.
      </P>
      <P>
        The CSS custom properties pattern that results is clean and intentional:
      </P>
      <Pre>{`/* globals.css — dark theme (default) */
:root {
  --color-bg:        oklch(0.04 0.005 60);   /* warm near-black */
  --color-surface-1: oklch(0.08 0.005 60);   /* card backgrounds */
  --color-surface-2: oklch(0.12 0.006 60);   /* hover surfaces */
  --color-border:    oklch(0.18 0.008 60);   /* subtle dividers */

  --color-text-1:    oklch(0.96 0.010 80);   /* primary text */
  --color-text-2:    oklch(0.78 0.008 80);   /* body text */
  --color-text-3:    oklch(0.55 0.006 80);   /* muted text */
  --color-text-4:    oklch(0.38 0.004 80);   /* disabled / hints */

  --color-accent:    oklch(0.78 0.17  58);   /* golden amber */
}`}</Pre>
      <P>
        Notice how readable this is. Every value tells you exactly where it sits in the brightness
        stack. You can add a new surface level — say <Code>oklch(0.10 0.005 60)</Code> — without
        guessing whether it will feel right. It will, because L is linear with perception.
      </P>

      <H2>Dark mode that actually works</H2>
      <P>
        This is where OKLCH earns its keep. Because L is perceptual, a light theme is just
        <Strong> an inverted L scale</Strong> — the chroma and hue stay the same, only lightness
        flips. Compare the two approaches:
      </P>
      <Pre>{`/* HSL dark mode — every value hand-tuned separately */
:root[data-theme="dark"]  { --bg: hsl(220  14%   8%); }
:root[data-theme="light"] { --bg: hsl(220  14%  98%); } /* fine */

:root[data-theme="dark"]  { --text: hsl(220  10%  90%); }
:root[data-theme="light"] { --text: hsl(220  10%  12%); } /* also fine... */

/* ...but blues look different from greens at the "same" saturation.
   You end up tuning hsl(140 60% 45%) vs hsl(220 60% 62%) by hand
   just to achieve equal perceived weight. */

/* OKLCH light mode — flip L, keep C and H */
:root {
  --color-bg:     oklch(0.98 0.005 60);  /* was 0.04, now 0.98 */
  --color-text-1: oklch(0.08 0.010 80);  /* was 0.96, now 0.08 */
  --color-accent: oklch(0.52 0.17  58);  /* same hue, same chroma, darker L */
}`}</Pre>
      <P>
        The accent color in light mode uses the same chroma (0.17) and hue (58) as dark mode —
        only L changes from 0.78 to 0.52 to maintain contrast against a light background. No new
        color was invented. No Figma hand-off saying &ldquo;use #B45309 in light mode.&rdquo; The math
        is the design.
      </P>
      <Callout>
        <Strong>Accessibility note:</Strong> OKLCH&apos;s perceptual uniformity makes contrast ratio
        calculation more predictable. If your text L is 0.08 and your background L is 0.98, the
        contrast is excellent. You can encode this as a rule rather than checking every combination
        individually.
      </Callout>

      <H2>Try it</H2>
      <P>
        The best way to start is <a href="https://oklch.com" className="text-[var(--color-accent)] hover:underline">oklch.com</a> — a
        live color picker that outputs CSS-ready <Code>oklch()</Code> values. Pick your brand&apos;s
        primary hue on the H slider, set chroma to taste, then sweep L from 0.1 to 0.9 to generate
        a full scale. If you want to see how gradients behave, the CSS gradient playground at{" "}
        <a href="https://gradient.style" className="text-[var(--color-accent)] hover:underline">gradient.style</a>{" "}
        lets you compare interpolation methods — OKLCH gradients look dramatically better than RGB
        through midpoints.
      </P>
      <P>
        You do not need to migrate your entire design system at once. Pick one token — your primary
        brand color — and define it in OKLCH. Build a 5-step scale around it. See how it feels in
        dark mode. The perceptual uniformity becomes obvious immediately, and from there the rest of
        the migration is mechanical. ParticleUI&apos;s entire token set started with a single amber
        swatch. It grew from there, one logical step at a time.
      </P>
    </article>
  ),

  // -------------------------------------------------------------------------
  // Article 2: Registry architecture
  // -------------------------------------------------------------------------
  "shadcn-registry-architecture": (
    <article className="space-y-5">
      <H2>The registry format</H2>
      <P>
        When shadcn released its registry spec, it gave the community something more valuable than
        a component library: a{" "}
        <Strong>standard JSON schema for distributable UI components</Strong>. Any server that
        returns JSON in this shape becomes a first-class citizen of the <Code>npx shadcn add</Code>{" "}
        workflow. ParticleUI is built entirely on top of this. Understanding the schema is the first
        step to building your own registry.
      </P>
      <P>
        Each registry item is a JSON object with a handful of fields. The required ones are{" "}
        <Code>name</Code> (unique identifier, kebab-case), <Code>type</Code> (either{" "}
        <Code>registry:ui</Code> for standalone components or <Code>registry:block</Code> for
        composed sections), and <Code>files</Code> (an array of file objects). Optional but important
        fields include <Code>dependencies</Code> (npm packages to install), <Code>registryDependencies</Code>{" "}
        (other registry items this one depends on), <Code>title</Code>, <Code>description</Code>, and{" "}
        <Code>categories</Code> for search and navigation.
      </P>
      <Pre>{`{
  "name": "marquee",
  "type": "registry:ui",
  "title": "Marquee",
  "description": "A GPU-accelerated horizontal scroll marquee with pause-on-hover.",
  "categories": ["animation", "display"],
  "dependencies": [],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/marquee.tsx",
      "type": "registry:ui",
      "content": "\"use client\"\\n\\nimport * as React from \\"react\\"\\n..."
    }
  ]
}`}</Pre>
      <P>
        The <Code>content</Code> field inside each file is the raw source code of the component,
        escaped as a JSON string. When the CLI writes the file to the user&apos;s project, it uses the{" "}
        <Code>path</Code> field to determine where to put it — relative to the project root by
        default, or adjusted by the user&apos;s <Code>components.json</Code> aliases.
      </P>

      <H2>How <Code>npx shadcn add</Code> works</H2>
      <P>
        The shadcn CLI is remarkably straightforward once you read its source. When you run{" "}
        <Code>npx shadcn add https://particleui.dev/r/marquee.json</Code>, it does exactly five
        things in order: fetch the JSON from your URL, read the <Code>files</Code> array and write
        each file to your project (respecting your <Code>components.json</Code> path aliases), run{" "}
        <Code>npm install</Code> (or your detected package manager) for everything in{" "}
        <Code>dependencies</Code>, recursively fetch and install each item in{" "}
        <Code>registryDependencies</Code>, and finally print a confirmation.
      </P>
      <P>
        The one-line install for any ParticleUI component looks like this:
      </P>
      <Pre>{`npx shadcn add https://particleui.dev/r/marquee.json

# Or multiple components at once:
npx shadcn add \\
  https://particleui.dev/r/marquee.json \\
  https://particleui.dev/r/glow-card.json \\
  https://particleui.dev/r/beam.json`}</Pre>
      <P>
        Because the CLI handles recursive dependencies, you never need to manually track what a
        component needs. If <Code>glow-card</Code> depends on <Code>card</Code> which depends on{" "}
        <Code>cn</Code> utility, all three are installed in the right order automatically. The
        user&apos;s project always ends up in a clean state.
      </P>

      <H2>Building the index</H2>
      <P>
        A registry needs two layers of JSON: the full item files (with source code) and a lightweight
        index for navigation and search. The index lives at <Code>/r/index.json</Code> and is an
        array of objects that describe each component without embedding their source. This keeps the
        index small — fast to fetch, easy to parse — while the full files are fetched on demand.
      </P>
      <Pre>{`// /r/index.json — lightweight catalog (no "files[].content")
[
  {
    "name": "marquee",
    "type": "registry:ui",
    "title": "Marquee",
    "description": "GPU-accelerated horizontal scroll marquee.",
    "categories": ["animation", "display"]
  },
  {
    "name": "glow-card",
    "type": "registry:ui",
    "title": "GlowCard",
    "description": "Card with animated radial glow on hover.",
    "categories": ["animation", "layout"]
  }
]`}</Pre>
      <P>
        Your docs site fetches the index once at build time and uses it to render the component
        gallery, power search, and generate static pages. The full item JSON is fetched per-component
        for preview rendering. This separation of concerns means you can cache the index aggressively
        at the CDN level while still serving fresh component source on each item endpoint.
      </P>

      <H2>The multi-framework challenge</H2>
      <P>
        React, Vue, and Svelte are not interchangeable. A React component is JSX; a Vue component is
        a Single File Component with <Code>&lt;template&gt;</Code>, <Code>&lt;script&gt;</Code>, and{" "}
        <Code>&lt;style&gt;</Code> blocks; a Svelte component is <Code>.svelte</Code> with its own
        reactivity syntax. You cannot serve one JSON file to all three ecosystems.
      </P>
      <P>
        ParticleUI handles this with separate registry paths per framework, each built from the same
        logical component specification. The React registry lives at <Code>/r/react/</Code>, Vue at{" "}
        <Code>/r/vue/</Code>, Svelte at <Code>/r/svelte/</Code>. Internally, the build script
        reads a single <Code>component.config.ts</Code> file that defines the component&apos;s
        interface, then generates three output files — one per framework — from shared logic and
        framework-specific templates.
      </P>
      <Pre>{`# React
npx shadcn add https://particleui.dev/r/react/marquee.json

# Vue
npx shadcn add https://particleui.dev/r/vue/marquee.json

# Svelte
npx shadcn add https://particleui.dev/r/svelte/marquee.json`}</Pre>
      <P>
        The docs site detects which framework a user has configured (via their{" "}
        <Code>components.json</Code> or an explicit toggle) and serves the right install command.
        This is not just a different file extension — the CSS class approach, event binding syntax,
        and slot/children patterns differ meaningfully across frameworks, so each output is a genuine
        adaptation rather than a naive find-and-replace.
      </P>

      <H2>Pro gating</H2>
      <P>
        Some ParticleUI components are available only on paid plans. The implementation is simple
        and fits naturally into the registry pattern. Each pro component endpoint is an API route
        rather than a static JSON file. When the CLI requests it, the route reads the{" "}
        <Code>Authorization</Code> header that shadcn passes from <Code>components.json</Code>:
      </P>
      <Pre>{`// app/api/r/[slug]/route.ts (simplified)
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "")

  if (!token) {
    return Response.json(
      { error: "Unauthorized", message: "A license key is required." },
      { status: 401 }
    )
  }

  const license = await db.licenses.findByTokenHash(sha256(token))

  if (!license || license.status !== "active") {
    return Response.json(
      { error: "Forbidden", message: "Invalid or expired license key." },
      { status: 403 }
    )
  }

  // Fire-and-forget install tracking (non-blocking)
  void db.installs.record({ slug: params.slug, licenseId: license.id })

  return Response.json(await getComponentJson(params.slug))
}`}</Pre>
      <Callout>
        <Strong>components.json config:</Strong> Users add their license key once to{" "}
        <Code>components.json</Code> under the <Code>headers</Code> field. The CLI passes it
        automatically on every install — no manual token management per component.
      </Callout>
      <P>
        The entire auth path adds roughly 10–30ms of latency (a DB lookup and a hash comparison),
        which is imperceptible during an install. Install tracking is fire-and-forget — the response
        is never delayed waiting for it. This keeps the developer experience fast while giving you
        meaningful usage analytics.
      </P>
    </article>
  ),

  // -------------------------------------------------------------------------
  // Article 3: Particle layer
  // -------------------------------------------------------------------------
  "particle-layer-design": (
    <article className="space-y-5">
      <H2>The motion problem</H2>
      <P>
        Most animation libraries ask you to make a commitment upfront. Framer Motion wraps your
        components in <Code>&lt;motion.div&gt;</Code>. GSAP requires refs and imperative{" "}
        <Code>gsap.to()</Code> calls scattered through your component tree. Lottie needs a{" "}
        JSON animation file and a separate player component. All of them are powerful — and all of
        them require you to <Strong>restructure your code</Strong> around motion rather than adding
        motion to existing code.
      </P>
      <P>
        This creates a painful dynamic in real projects. A designer asks for a subtle glow effect
        on the hero card. A developer looks at the component tree, sees it would require wrapping
        three layers of components in motion primitives, and either spends a day refactoring or
        files the request under &ldquo;nice to have.&rdquo; Motion becomes a negotiation rather than
        a natural part of the toolkit. The animation library that was supposed to make things
        delightful ends up making things difficult.
      </P>
      <P>
        There is also a performance trap. Many animation libraries default to JavaScript-driven
        animations that run on the main thread, block layout recalculations, or cause jank on
        lower-powered devices. Reaching for a powerful library does not automatically mean getting
        performant animations — it often means inheriting the library&apos;s performance model whether
        you understand it or not.
      </P>

      <H2>ParticleUI&apos;s constraint: drop-in compatible</H2>
      <P>
        ParticleUI&apos;s animated components follow one rule:{" "}
        <Strong>every animated component accepts the same interface as its static equivalent.</Strong>{" "}
        GlowCard wraps any children — you do not rewrite the children, you swap the container. Marquee
        is just a <Code>&lt;div&gt;</Code> with children; you move your list inside it. Beam is a
        single line element you place where you would place an <Code>&lt;hr&gt;</Code> or a
        decorative rule.
      </P>
      <P>
        In practice, switching from a plain card to GlowCard looks like this:
      </P>
      <Pre>{`// Before
<div className="rounded-xl border border-border bg-surface-1 p-6">
  <h3>Your content</h3>
  <p>Nothing changes here.</p>
</div>

// After — add the glow, keep everything else identical
<GlowCard className="rounded-xl border border-border bg-surface-1 p-6">
  <h3>Your content</h3>
  <p>Nothing changes here.</p>
</GlowCard>`}</Pre>
      <P>
        No new props are required. No ref forwarding. No animation state to manage. GlowCard tracks
        mouse position using a <Code>pointermove</Code> listener and updates a single CSS custom
        property that drives the radial gradient — the rest is CSS. If you decide the effect is not
        right for a particular screen, you swap back in 10 seconds.
      </P>

      <H2>Implementation: CSS over JS</H2>
      <P>
        The particle components are deliberately CSS-first. JavaScript is used only when CSS alone
        cannot express the behavior — mouse position for GlowCard, for example. Everything else is
        pure CSS running on the GPU compositor thread.
      </P>
      <P>
        Marquee is the clearest example. The scrolling track is a single CSS animation with a
        CSS custom property for duration:
      </P>
      <Pre>{`/* marquee.css (generated from component) */
@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  /* Duration controlled by CSS var — no JS needed for speed changes */
  animation: marquee-left var(--marquee-duration, 30s) linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}`}</Pre>
      <P>
        The Beam component is a <Code>linear-gradient</Code> on a positioned element that animates
        its <Code>background-position</Code>. The GradientText component is a CSS gradient on a
        clipped text element. Meteors are absolutely-positioned elements with a CSS diagonal
        translate animation. None of these use <Code>requestAnimationFrame</Code>. None use
        JavaScript timers. They are all GPU-composited properties: <Code>transform</Code>,{" "}
        <Code>opacity</Code>, <Code>background-position</Code>.
      </P>

      <H2>Performance details</H2>
      <P>
        A few specific choices keep the particle layer lightweight even when multiple animated
        components appear on the same page.
      </P>
      <P>
        <Strong>will-change is applied surgically.</Strong> Only the scrolling track in Marquee
        carries <Code>will-change: transform</Code> — not every item in the list. Applying{" "}
        <Code>will-change</Code> too broadly creates unnecessary GPU layers and increases memory
        consumption. One layer per scrolling track is the correct scope.
      </P>
      <P>
        <Strong>Reduced motion is respected unconditionally.</Strong> Every animated component
        wraps its keyframe definitions in a <Code>@media (prefers-reduced-motion: no-preference)</Code>{" "}
        block. Users who have enabled the system accessibility setting see static equivalents
        automatically, with zero JavaScript involvement. This is not an afterthought — it is part
        of the component spec.
      </P>
      <Pre>{`@media (prefers-reduced-motion: no-preference) {
  .marquee-track {
    animation: marquee-left var(--marquee-duration, 30s) linear infinite;
  }
}`}</Pre>
      <P>
        <Strong>Zero layout thrashing.</Strong> Components that track mouse position (GlowCard,
        SpotlightCard) read <Code>getBoundingClientRect()</Code> inside the event handler and write
        a single CSS custom property. They never read layout properties after writing — the classic
        source of forced synchronous layout. The write is batched through a single{" "}
        <Code>style.setProperty()</Code> call per event.
      </P>

      <H2>When NOT to use particles</H2>
      <P>
        Motion is a form of attention. Used well, it directs focus and rewards interaction. Used
        carelessly, it competes with the content it should be highlighting. There are three situations
        where ParticleUI&apos;s animated components consistently make things worse, not better.
      </P>
      <P>
        <Strong>Forms.</Strong> Users filling out forms are in task mode — goal-oriented, heads
        down. A glowing input border or a marquee of testimonials nearby creates peripheral
        distraction during a concentration task. Keep form UIs static.
      </P>
      <P>
        <Strong>Data tables and dashboards.</Strong> Dense information displays require sustained
        reading. Animation in or near a table — even a subtle one — draws the eye away from the
        data. The motion that felt delightful on a marketing page feels hostile in an analytics
        dashboard. Reserve particle components for marketing, landing pages, and showcase sections.
      </P>
      <P>
        <Strong>Above-the-fold on first load.</Strong> If your hero section uses a Meteors
        background or a Beam animation, those animations begin immediately on page load. On slow
        connections or low-powered devices, this competes with the content loading and can make the
        page feel slower than it is. Consider deferring particle animations below the fold, where
        they begin only when the user scrolls to them — an <Code>IntersectionObserver</Code> and
        a CSS class toggle is all you need.
      </P>
      <Callout>
        <Strong>The rule of thumb:</Strong> particles are reward and delight, not decoration.
        They should appear where users arrive after completing something, or where you want to
        highlight something worth noticing. Not on every page and not in every component.
      </Callout>

      <H2>Starting small</H2>
      <P>
        The best way to evaluate whether particle components fit your project is to replace exactly
        one element. Pick a card on your marketing page and swap it for GlowCard. Load it in your
        browser. Move your mouse over it. Either it fits your brand or it does not — you will know
        in thirty seconds. If it fits, expand. If it does not, the swap-back is just as fast.
      </P>
      <P>
        Every ParticleUI component works with zero props. <Code>&lt;GlowCard&gt;</Code>,{" "}
        <Code>&lt;Marquee&gt;</Code>, <Code>&lt;Beam /&gt;</Code> — all have sensible defaults.
        There is no required configuration, no theme provider to wrap, no initialization call. The
        zero-config rule is part of the design: if you have to read documentation before seeing
        something move, the component has failed its first job.
      </P>
      <P>
        Start with one. It is enough to know if the direction is right.
      </P>
    </article>
  ),
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) return { title: "Not found" }
  return { title: `${post.title} — ParticleUI Blog`, description: post.description }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = POSTS[slug]

  if (!post) {
    return (
      <div className="min-h-svh bg-bg text-text-1">
        <Nav />
        <main className="mx-auto max-w-2xl px-6 pt-40 pb-24 text-center">
          <p className="text-text-4 mb-4">Post not found.</p>
          <Link href="/blog" className="text-sm text-accent hover:underline">
            ← Back to blog
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-bg text-text-1">
      <Nav />

      <main className="mx-auto max-w-2xl px-6 pt-32 pb-24">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-text-4 hover:text-text-2 transition-colors mb-10"
        >
          <ArrowLeft size={12} />
          Blog
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-semibold uppercase tracking-widest rounded-full border border-border text-text-3 px-2.5 py-1">
            {post.category}
          </span>
          <span className="text-xs text-text-4">{post.date}</span>
          <span className="text-xs text-text-4">·</span>
          <span className="text-xs text-text-4">{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.15] text-text-1 mb-5">
          {post.title}
        </h1>
        <p className="text-text-2 text-lg leading-[1.75] mb-12">{post.description}</p>

        {/* Article content */}
        {ARTICLE_CONTENT[slug] ?? (
          <div className="rounded-2xl border border-border bg-surface-1 px-8 py-10 text-center">
            <p className="text-sm text-text-3">Article coming soon.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-4">© {new Date().getFullYear()} ParticleUI</p>
          <nav className="flex items-center gap-6 text-xs text-text-4">
            {["Components", "Docs", "Pricing", "Blog"].map((l) => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="hover:text-text-2 transition-colors">
                {l}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
