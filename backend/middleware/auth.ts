/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes
 */

import { Context, Next } from 'hono';
import { sign, verify } from 'hono/jwt';

export interface User {
  id: string;
  email: string;
}

export interface Variables {
  user: User;
}

interface JWTPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

type AppContext = Context<{ Variables: Variables }>;

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function authMiddleware(c: AppContext, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Missing or invalid authorization header' }, 401);
  }

  const token = authHeader.slice(7);

  try {
    const payload = await verify(token, JWT_SECRET, "HS256") as unknown as JWTPayload;
    c.set('user', { id: payload.sub, email: payload.email });
    await next();
  } catch {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }
}

export function generateToken(userId: string, email: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = 7 * 24 * 60 * 60; // 7 days

  return sign(
    {
      sub: userId,
      email,
      iat: now,
      exp: now + expiresIn,
    },
    JWT_SECRET
  );
}
