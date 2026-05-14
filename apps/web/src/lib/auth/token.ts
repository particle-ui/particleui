export async function validateToken(token: string): Promise<boolean> {
  // Phase 2: replace with DB lookup against issued tokens table
  // For now during local dev, accept the env var directly
  const devToken = process.env.PARTICLEUI_DEV_TOKEN
  if (devToken && token === devToken) return true
  return false
}
