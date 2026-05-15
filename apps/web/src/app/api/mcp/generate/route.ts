import { NextRequest, NextResponse } from "next/server"
import { generateLayout } from "@/lib/ai/gateway"
import { validateToken } from "@/lib/auth/token"

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const token = authHeader?.replace(/^Bearer\s+/i, "")

  if (!token) {
    return NextResponse.json({ error: "Missing Authorization header" }, { status: 401 })
  }

  const tokenRecord = await validateToken(token)
  if (!tokenRecord.valid) {
    return NextResponse.json({ error: "Invalid or revoked token" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const prompt = typeof body.prompt === "string" ? body.prompt.slice(0, 500) : ""
  if (!prompt) {
    return NextResponse.json({ error: "prompt is required" }, { status: 400 })
  }

  const layout = await generateLayout(prompt)

  const installCmd =
    "npx particleui-cli add " + layout.blocks.map((b) => b.component).join(" ")

  return NextResponse.json({ layout, installCmd })
}
