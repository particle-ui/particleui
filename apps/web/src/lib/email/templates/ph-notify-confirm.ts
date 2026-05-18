export function phNotifyConfirmEmail(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the ParticleUI launch list</title>
</head>
<body style="margin:0;padding:0;background:#0c0a09;font-family:'Geist','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0c0a09;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:8px;vertical-align:middle;">
                    <div style="width:18px;height:18px;background:radial-gradient(circle at 30% 30%,#f5f0e8,#c8c0b0);border-radius:50%;"></div>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="color:#f5f0e8;font-size:15px;font-weight:700;letter-spacing:-0.02em;">ParticleUI</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background:#131110;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:40px;">

              <!-- Status dot + label -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background:rgba(245,240,232,0.08);border:1px solid rgba(245,240,232,0.15);border-radius:100px;padding:6px 14px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:7px;vertical-align:middle;">
                          <div style="width:6px;height:6px;background:#f5f0e8;border-radius:50%;"></div>
                        </td>
                        <td style="vertical-align:middle;">
                          <span style="color:#f5f0e8;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">You&rsquo;re on the list</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Headline -->
              <h1 style="margin:0 0 16px;color:#f5f0e8;font-size:28px;font-weight:700;letter-spacing:-0.04em;line-height:1.15;">
                We&rsquo;ll ping you<br/>on launch day.
              </h1>

              <!-- Body -->
              <p style="margin:0 0 28px;color:#9a9189;font-size:15px;line-height:1.7;">
                ParticleUI is launching on Product Hunt soon. You&rsquo;re one of the first to know —
                we&rsquo;ll send you a direct link the moment we go live so you can be an early upvoter.
              </p>

              <!-- Divider -->
              <div style="border-top:1px solid rgba(255,255,255,0.07);margin-bottom:28px;"></div>

              <!-- What to expect -->
              <p style="margin:0 0 16px;color:#6b6360;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;">
                While you wait
              </p>

              <!-- Feature rows -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding-bottom:16px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:top;padding-top:2px;">
                          <div style="width:5px;height:5px;background:#f5f0e8;border-radius:50%;margin-top:6px;"></div>
                        </td>
                        <td>
                          <span style="color:#c8c0b0;font-size:14px;line-height:1.6;">
                            <strong style="color:#f5f0e8;">87 free components</strong> — install any of them right now with
                            <code style="background:rgba(255,255,255,0.06);padding:1px 6px;border-radius:4px;font-size:12px;color:#f5f0e8;">npx particleui-cli add button</code>
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:16px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:top;padding-top:2px;">
                          <div style="width:5px;height:5px;background:#f5f0e8;border-radius:50%;margin-top:6px;"></div>
                        </td>
                        <td>
                          <span style="color:#c8c0b0;font-size:14px;line-height:1.6;">
                            <strong style="color:#f5f0e8;">36 particle effects</strong> — cursor trails, magnetic buttons, aurora backgrounds. None of these are in shadcn.
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:top;padding-top:2px;">
                          <div style="width:5px;height:5px;background:#f5f0e8;border-radius:50%;margin-top:6px;"></div>
                        </td>
                        <td>
                          <span style="color:#c8c0b0;font-size:14px;line-height:1.6;">
                            <strong style="color:#f5f0e8;">AI-native</strong> — MCP server + Claude skills ship with every Pro component so your AI knows exactly how to use them.
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="border-top:1px solid rgba(255,255,255,0.07);margin:28px 0;"></div>

              <!-- CTA button -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:100px;background:#f5f0e8;">
                    <a href="https://particleui.dev/components" style="display:inline-block;padding:12px 24px;color:#0c0a09;font-size:13px;font-weight:600;text-decoration:none;letter-spacing:-0.01em;">
                      Browse free components &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:28px;">
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin:0;color:#4a4542;font-size:12px;line-height:1.6;">
                      You&rsquo;re receiving this because you signed up for launch notifications at
                      <a href="https://particleui.dev" style="color:#6b6360;text-decoration:none;">particleui.dev</a>.
                      <br/>
                      <a href="https://particleui.dev" style="color:#4a4542;text-decoration:underline;">Unsubscribe</a>
                    </p>
                  </td>
                  <td align="right">
                    <p style="margin:0;color:#4a4542;font-size:12px;">&copy; 2026 ParticleUI</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
