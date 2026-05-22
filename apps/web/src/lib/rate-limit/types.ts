export type RateLimitIdentity =
  | { type: "user"; id: string }
  | { type: "ip"; id: string }
  | { type: "team"; id: string }
  | { type: "token"; id: string }

export type RateLimitPolicy = {
  name: string
  limit: number
  windowMs: number
}

export type RateLimitDecision = {
  allowed: boolean
  key: string
  limit: number
  remaining: number
  resetAt: Date
  retryAfterSeconds: number
}

export interface RateLimitStore {
  consume(input: {
    key: string
    limit: number
    windowMs: number
    now: Date
  }): Promise<RateLimitDecision>
}
