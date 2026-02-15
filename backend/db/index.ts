/**
 * Database Schema
 * Defines the database tables and structure
 */

import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('./bargain-bank.db');
export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

export function initializeDatabase() {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `);

  // Create sessions table for rate limiting
  db.exec(`
    CREATE TABLE IF NOT EXISTS login_attempts (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      ip_address TEXT,
      attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      success BOOLEAN DEFAULT FALSE
    );

    CREATE INDEX IF NOT EXISTS idx_login_attempts_email_time 
    ON login_attempts(email, attempted_at);
  `);

  console.log('Database initialized successfully');
}
