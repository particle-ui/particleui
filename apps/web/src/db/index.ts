import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

function createDb() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error("DATABASE_URL is not set")
  return drizzle(neon(url), { schema })
}

let _db: ReturnType<typeof createDb> | undefined

export function getDb() {
  if (!_db) _db = createDb()
  return _db
}

// Backwards-compatible proxy so existing `import { db }` still works at runtime
export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_, prop) {
    return getDb()[prop as keyof ReturnType<typeof createDb>]
  },
})

export type DB = ReturnType<typeof createDb>
