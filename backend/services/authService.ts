/**
 * Authentication Service
 * Handles password hashing and user authentication logic
 */

import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index';

export interface UserRecord {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createUser(email: string, passwordHash: string): UserRecord {
  const id = uuidv4();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO users (id, email, password_hash, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(id, email, passwordHash, now, now);

  return {
    id,
    email,
    password_hash: passwordHash,
    created_at: now,
    updated_at: now,
  };
}

export function getUserByEmail(email: string): UserRecord | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email) as UserRecord | undefined;
}

export function getUserById(id: string): UserRecord | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as UserRecord | undefined;
}

export function logLoginAttempt(email: string, success: boolean, ipAddress?: string): void {
  const id = uuidv4();
  const stmt = db.prepare(`
    INSERT INTO login_attempts (id, email, ip_address, success)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(id, email, ipAddress || null, success ? 1 : 0);
}
