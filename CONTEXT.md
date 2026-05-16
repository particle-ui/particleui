# ParticleUI

A component library distributed as copyable source code via a JSON registry. Users install components directly into their project rather than importing from a package — they own the files.

## Language

### The installable unit

**RegistryItem**:
The JSON envelope representing one installable unit: source code files, npm dependencies, registry dependencies, and display metadata. The wire format the CLI fetches and unpacks.
_Avoid_: package, module

**Component**:
User-facing word for any installable RegistryItem. Use in docs, CLI output, and error messages. In internal code, prefer the specific kind (Particle, Block, etc.) or the technical term RegistryItem.
_Avoid_: widget, element, UI component (too generic)

**Particle**:
A RegistryItem that provides an animated visual effect — shimmer, glow, beam, meteor shower, cursor effects. Lives in the `particles` tier. Registry type: `registry:ui`.
_Avoid_: animation, effect, visual

**Block**:
A RegistryItem that composes a complete UI section or full page. Depends on Components and Particles via registryDependencies. Lives in the `blocks` tier. Registry type: `registry:block`.
_Avoid_: section, layout, page component

**Template**:
A RegistryItem that composes multiple Blocks into a complete page. Lives in the `templates` tier. Registry type: `registry:block`.
_Avoid_: page, scaffold, starter

### The registry

**Registry**:
Both the source JSON files in `/registry/` and the published HTTP service at `particleui.dev/r`. The build step (`pnpm registry:all`) converts source into the published form.
_Avoid_: npm registry, package registry, store

**registryDependencies**:
Other RegistryItems that must be installed alongside a given item, resolved transitively at install time. Distinct from npm `dependencies`, which must be installed by the user separately.
_Avoid_: "dependencies" unqualified — always say "registry dependencies" or "npm dependencies"

**Index**:
The per-framework flat list of RegistryItems (name, tier, title, description, categories, dependencies) served at `particleui.dev/r/<fw>/index.json`. Used by the CLI's `list` command and by search.
_Avoid_: catalog, manifest

### Organization

**Tier**:
The directory-level axis that organizes RegistryItems. Derived at build time from the source directory — not stored in individual item JSON. Determines both the kind of item and its access level.

| Tier | Kind | Access |
|------|------|--------|
| `core` | UI primitives (button, card, input) | Free |
| `particles` | Animated visual effects | Free |
| `blocks` | Section-level compositions | Free |
| `templates` | Multi-section page compositions | Free |
| `pro` | Premium components | Requires token |
| `themes` | OKLCH color theme definitions | Free |

_Avoid_: "type" for tier (type is the registry format field `registry:ui` / `registry:block`); "category" for tier

**categories**:
Metadata array on each RegistryItem used for search and filtering (e.g. `["buttons", "core", "free"]`). Overlaps with Tier but is distinct — categories are for display; tier is authoritative for access control.
_Avoid_: tags, labels

### Frameworks

**Framework**:
React, Vue, or Svelte. A first-class dimension of the registry — each framework has its own source directory and published index. Vue `button` and React `button` are separate RegistryItems.
_Avoid_: platform, target, flavor

### Access

**Pro**:
RegistryItems in the `pro` tier, requiring a bearer token to download from the registry API. Distinguished from free tiers in both directory structure and categories.
_Avoid_: premium, paid, gated, licensed

**Token** (`PARTICLEUI_TOKEN`):
Bearer token that authorizes download of Pro items. Set as an environment variable, passed as `Authorization: Bearer` header. Generated at purchase time and stored (as a SHA-256 hash) in the `api_tokens` database table. Displayed once to the user — via email on purchase and in the `/dashboard/tokens` page.
_Avoid_: API key, license, secret

**License**:
The purchased entitlement that allows a user to access Pro items. Represented in the system as a Plan on the user record plus at least one Token. A user can hold multiple Tokens under a single License.
_Avoid_: subscription, purchase

**Plan**:
The access level stored on a user record: `free`, `pro`, or `team`. Determines which Tokens can be created and how many. Changed by the Stripe webhook on successful payment or refund.
_Avoid_: tier (tier is for RegistryItems, Plan is for users)

**Checkout Session**:
A Stripe-hosted payment flow. Created server-side, executed client-side via redirect. On completion, Stripe fires a `checkout.session.completed` webhook that provisions the License.
_Avoid_: payment, order

**Billing Portal**:
Stripe's hosted page for downloading receipts, viewing invoices, and (if applicable) updating payment methods. Accessed from `/dashboard/plan` → "Manage billing".
_Avoid_: customer portal, subscription management

## Relationships

- A **Template** composes **Blocks** via `registryDependencies`
- A **Block** composes **Components** and **Particles** via `registryDependencies`
- `registryDependencies` are resolved transitively at install time — installing a Template installs its Blocks, which install their Components
- Each **Framework** has an independent set of RegistryItems and its own Index
- **Tier** is computed from directory path at build time and written into the Index, not stored in individual RegistryItem JSON

## Example dialogue

> **Dev:** "Can I add the landing page template?"
> **Domain expert:** "Yes — `particleui add landing` installs the landing **Template**, which pulls in all its **Block** registry dependencies, which in turn pull in their **Component** and **Particle** dependencies. One command installs the whole tree."

> **Dev:** "What's the difference between a particle and a component?"
> **Domain expert:** "A **Particle** is a kind of **Component** — it's animated and in the `particles` tier. When you say 'component' without qualification, you mean any installable RegistryItem."

> **Dev:** "Why is `aurora-background` behind a token?"
> **Domain expert:** "It's a **Pro** RegistryItem — lives in the `pro` tier. The registry API returns 401 if no token is provided."

## Flagged ambiguities

- **tier vs categories**: `tier` is the authoritative organization axis, derived from directory path. `categories` is a per-item metadata array used for UI filtering. Both can contain "pro" and "free" — categories for display, tier for access enforcement.
- **install vs add**: used synonymously in the codebase. The CLI command is `add`; the installer class is `ComponentInstaller`. Prefer **install** as a verb in prose, **add** as the CLI command name.
- **Registry (source) vs Registry (service)**: the same word refers to both `/registry/` source files and the `particleui.dev/r` HTTP API. Context usually makes it clear; when ambiguous, say "registry source" or "registry API".
