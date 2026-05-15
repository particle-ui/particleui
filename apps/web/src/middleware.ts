import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublic = createRouteMatcher([
  "/",
  "/pricing",
  "/blog(.*)",
  "/compare",
  "/components(.*)",
  "/docs(.*)",
  "/r/(.*)",
  "/api/webhooks/(.*)",
  "/api/mcp/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/generate(.*)",
  "/theme-studio(.*)",
  "/themes(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublic(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
}
