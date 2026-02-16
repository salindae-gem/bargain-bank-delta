/**
 * Hono Server
 * Main API server setup
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { initializeDatabase } from './db/index';
import authRouter from './routes/auth';

// Initialize database
initializeDatabase();

const app = new Hono()
  .use(logger())
  .use(
    cors({
      origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        process.env.FRONTEND_URL || '',
      ],
      credentials: true,
    })
  );

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }));

// Auth routes
app.route('/auth', authRouter);

// 404 handler
app.all('*', (c) => c.json({ error: 'Not Found' }, 404));

export default app;
