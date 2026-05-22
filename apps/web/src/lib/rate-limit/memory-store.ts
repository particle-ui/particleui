import type { RateLimitDecision, RateLimitStore } from "./types"

type Bucket = {
  count: number
  resetAt: Date
}

export class MemoryRateLimitStore implements RateLimitStore {
  private readonly buckets = new Map<string, Bucket>()

  async consume(input: {
    key: string
    limit: number
    windowMs: number
    now: Date
  }): Promise<RateLimitDecision> {
    const current = this.buckets.get(input.key)
    const expired = !current || current.resetAt <= input.now
    const resetAt = expired ? new Date(input.now.getTime() + input.windowMs) : current.resetAt
    const nextCount = expired ? 1 : current.count + 1

    this.buckets.set(input.key, { count: nextCount, resetAt })

    const remaining = Math.max(input.limit - nextCount, 0)
    return {
      allowed: nextCount <= input.limit,
      key: input.key,
      limit: input.limit,
      remaining,
      resetAt,
      retryAfterSeconds: retryAfterSeconds(resetAt, input.now),
    }
  }

  clear(): void {
    this.buckets.clear()
  }
}

function retryAfterSeconds(resetAt: Date, now: Date): number {
  return Math.max(Math.ceil((resetAt.getTime() - now.getTime()) / 1000), 1)
}
