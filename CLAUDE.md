## Agent skills

### Issue tracker

Issues live in GitHub Issues for this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses default label vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo — one `CONTEXT.md` + `docs/adr/` at the root. See `docs/agents/domain.md`.

## UI skills

### Visual verification
Playwright is installed (`@playwright/test ^1.60.0`, root devDependency). Chromium browser is available at `~/.cache/ms-playwright/chromium-1223`.
Dev server runs on `http://localhost:3000` (`next dev --turbopack`). All skill scripts default to this URL.
Run `npx playwright install chromium` if screenshots fail.

### Accessibility scanning
axe-core is installed (root devDependency). `/a11y` uses it for programmatic WCAG 2.1 AA scanning.
**Known gap:** No skip link in any layout — `/a11y` should add one.

### Token home
Design tokens live in `apps/web/src/styles/globals.css` in the `@theme { }` block (Tailwind v4).
`/tokens` reads and writes here. Global changes go in this file — not in individual components.

### Internationalisation
No i18n library. `/copy` edits strings directly in component files.

### Design brief
Visual direction is documented in `DESIGN-BRIEF.md` (project root). All UI skills read this before starting.
**Summary:** Dark espresso surfaces, cream accent, Geist font. Precise + confident + craft-forward personality.
Expressive but disciplined animation. Marketing headings compressed, docs headings airy. 12px corners, flat borders.

### Skills available
| Skill | When to use |
|-------|-------------|
| `/uiux` | Redesign any screen — pixel-perfect, recursive |
| `/animate` | Add or fix animations and micro-interactions |
| `/copy` | Audit and rewrite all user-facing strings |
| `/a11y` | Fix accessibility violations — WCAG 2.1 AA |
| `/tokens` | Find hardcoded design values and replace with tokens |
| `/landing` | Optimise a marketing or product landing page for conversion |
