import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export type UserPlan = "free" | "pro" | "team"

export type UserEntitlement =
  | { active: true; plan: "pro" | "team" }
  | { active: false; plan: UserPlan | null }

export interface EntitlementReader {
  getUserPlan(userId: string): Promise<UserPlan | null>
}

class DbEntitlementReader implements EntitlementReader {
  async getUserPlan(userId: string): Promise<UserPlan | null> {
    const [row] = await db
      .select({ plan: users.plan })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    return row?.plan ?? null
  }
}

const dbEntitlementReader = new DbEntitlementReader()

export function planHasProAccess(plan: UserPlan | null): plan is "pro" | "team" {
  return plan === "pro" || plan === "team"
}

export async function getUserEntitlement(
  userId: string,
  reader: EntitlementReader = dbEntitlementReader
): Promise<UserEntitlement> {
  const plan = await reader.getUserPlan(userId)
  if (planHasProAccess(plan)) {
    return { active: true, plan }
  }

  return { active: false, plan }
}

export async function canCreateProToken(
  userId: string,
  reader: EntitlementReader = dbEntitlementReader
): Promise<boolean> {
  return (await getUserEntitlement(userId, reader)).active
}
