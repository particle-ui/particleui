import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { phNotifyConfirmEmail } from "@/lib/email/templates/ph-notify-confirm"

const resend = new Resend(process.env.RESEND_API_KEY)
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ""

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}))

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  }

  if (!AUDIENCE_ID) {
    console.warn("RESEND_AUDIENCE_ID not set — email not stored:", email)
    return NextResponse.json({ ok: true })
  }

  try {
    await resend.contacts.create({
      audienceId: AUDIENCE_ID,
      email,
      unsubscribed: false,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    if (!msg.includes("already exists")) {
      console.error("Resend contact error:", err)
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
    }
    // Duplicate — still send the confirmation so they know they're on the list
  }

  try {
    await resend.emails.send({
      from: "ParticleUI <hello@particleui.dev>",
      to: email,
      subject: "You're on the ParticleUI launch list ✦",
      html: phNotifyConfirmEmail(),
    })
  } catch (err) {
    // Log but don't fail the request — contact is already saved
    console.error("Resend confirmation email error:", err)
  }

  return NextResponse.json({ ok: true })
}
