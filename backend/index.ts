/**
 * Server Entry Point
 * Starts the Hono API server
 */

import { serve } from '@hono/node-server';
import app from './server';

const port = parseInt(process.env.PORT || '3000', 10);

serve({
  fetch: app.fetch,
  port,
});

console.log(`Server running at http://localhost:${port}`);
console.log(`Server running at http://localhost:${port}`);
