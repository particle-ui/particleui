import { Resend } from "resend"

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const FROM = "ParticleUI <no-reply@particleui.dev>"

export async function sendProWelcomeEmail({
  to,
  plan,
  token,
}: {
  to: string
  plan: "pro" | "team"
  token: string
}) {
  const planLabel = plan === "team" ? "Team" : "Pro"
  const tokenCount = plan === "team" ? "up to 5 API tokens" : "your API token"

  await getResend().emails.send({
    from: FROM,
    to,
    subject: `Welcome to ParticleUI ${planLabel} 🎉`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #09090b; color: #fafafa; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
  <div style="margin-bottom: 32px;">
    <span style="font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: oklch(78% 0.17 200); background: oklch(78% 0.17 200 / 0.12); border: 1px solid oklch(78% 0.17 200 / 0.3); border-radius: 999px; padding: 4px 12px;">
      ParticleUI ${planLabel}
    </span>
  </div>

  <h1 style="font-size: 28px; font-weight: 700; letter-spacing: -0.04em; margin: 0 0 12px; color: #fafafa;">
    You're in. 🚀
  </h1>
  <p style="font-size: 15px; color: #a1a1aa; line-height: 1.7; margin: 0 0 32px;">
    Your <strong style="color: #fafafa;">ParticleUI ${planLabel}</strong> license is active.
    Here's your auto-generated API token — save it somewhere safe.
    You can generate more from your <a href="https://particleui.dev/dashboard/tokens" style="color: oklch(78% 0.17 200);">dashboard</a>.
  </p>

  <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px 24px; margin-bottom: 32px;">
    <p style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #71717a; margin: 0 0 8px;">Your API Token</p>
    <code style="font-family: 'SF Mono', 'Fira Code', monospace; font-size: 14px; color: oklch(78% 0.17 200); word-break: break-all;">${token}</code>
  </div>

  <h2 style="font-size: 16px; font-weight: 600; color: #fafafa; margin: 0 0 16px;">Quick setup</h2>

  <p style="font-size: 13px; color: #71717a; margin: 0 0 8px; font-weight: 600;">1. Add to <code style="background: #27272a; padding: 2px 6px; border-radius: 4px; color: #a1a1aa;">.env</code></p>
  <div style="background: #18181b; border: 1px solid #27272a; border-radius: 8px; padding: 14px 18px; margin-bottom: 16px;">
    <code style="font-family: monospace; font-size: 13px; color: #a1a1aa;">PARTICLEUI_TOKEN=${token}</code>
  </div>

  <p style="font-size: 13px; color: #71717a; margin: 0 0 8px; font-weight: 600;">2. Add registry to <code style="background: #27272a; padding: 2px 6px; border-radius: 4px; color: #a1a1aa;">components.json</code></p>
  <div style="background: #18181b; border: 1px solid #27272a; border-radius: 8px; padding: 14px 18px; margin-bottom: 16px;">
    <pre style="font-family: monospace; font-size: 12px; color: #a1a1aa; margin: 0; white-space: pre-wrap;">"registries": {
  "@particleui": {
    "url": "https://particleui.dev/r/react/{name}.json",
    "headers": {
      "Authorization": "Bearer \${PARTICLEUI_TOKEN}"
    }
  }
}</pre>
  </div>

  <p style="font-size: 13px; color: #71717a; margin: 0 0 8px; font-weight: 600;">3. Install a Pro component</p>
  <div style="background: #18181b; border: 1px solid #27272a; border-radius: 8px; padding: 14px 18px; margin-bottom: 32px;">
    <code style="font-family: monospace; font-size: 13px; color: #a1a1aa;">npx shadcn add @particleui/animated-beam</code>
  </div>

  ${plan === "team" ? `<p style="font-size: 13px; color: #71717a; line-height: 1.7; margin: 0 0 32px;">
    <strong style="color: #fafafa;">Team plan:</strong> Generate ${tokenCount} from your
    <a href="https://particleui.dev/dashboard/tokens" style="color: oklch(78% 0.17 200);">tokens page</a>
    to share with your team. Each developer uses their own token.
  </p>` : ""}

  <hr style="border: none; border-top: 1px solid #27272a; margin: 0 0 24px;">
  <p style="font-size: 12px; color: #52525b; line-height: 1.7; margin: 0;">
    Questions? Reply to this email or join our
    <a href="https://particleui.dev/discord" style="color: oklch(78% 0.17 200);">Discord</a>.
    14-day refund policy — no questions asked.
  </p>
</body>
</html>`,
  })
}
