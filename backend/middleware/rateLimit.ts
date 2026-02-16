/**
 * Rate Limiting Middleware
 * Prevents brute force attacks on login endpoint
 */

import { Context, Next } from 'hono';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function rateLimitMiddleware(c: Context, next: Next) {
  const email = (c.req.json?.()?.email as string) || c.req.header('X-Forward-For') || 'unknown';

  const now = Date.now();
  const entry = rateLimitMap.get(email);

  if (entry && now < entry.resetTime) {
    if (entry.count >= MAX_ATTEMPTS) {
      return c.json(
        { error: 'Too many login attempts. Please try again later.' },
        429
      );
    }
    entry.count++;
  } else {
    rateLimitMap.set(email, { count: 1, resetTime: now + WINDOW_MS });
  }

  await next();
}

export function resetRateLimit(email: string) {
  rateLimitMap.delete(email);
}
