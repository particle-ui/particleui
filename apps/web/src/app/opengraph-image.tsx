import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "ParticleUI — Premium UI components"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0906",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Subtle noise/grain texture via radial gradient */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,240,232,0.04) 0%, transparent 70%)",
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f5f0e8" }} />
          <span style={{ fontSize: 22, fontWeight: 700, color: "#c8c3bc", letterSpacing: "-0.02em" }}>
            ParticleUI
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <span style={{ fontSize: 80, fontWeight: 800, color: "#f5f0e8", letterSpacing: "-0.05em", lineHeight: 1 }}>
            Components so good
          </span>
          <span style={{ fontSize: 80, fontWeight: 800, color: "#6b6560", letterSpacing: "-0.05em", lineHeight: 1 }}>
            your users stop scrolling.
          </span>
        </div>

        {/* Subtitle */}
        <p style={{ fontSize: 22, color: "#4a4540", marginTop: 32, letterSpacing: "-0.01em" }}>
          85+ free, open-source components · React · Vue · Svelte
        </p>

        {/* Bottom */}
        <div style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          gap: 20,
          fontSize: 15,
          color: "#3a3530",
        }}>
          <span>particleui.dev</span>
          <span>·</span>
          <span>MIT License</span>
          <span>·</span>
          <span>One command install</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
