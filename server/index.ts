import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import api from "./routes.js";

const app = new Hono();

// API routes at /api
app.route("/api", api);

// Serve frontend static files (production)
app.use(
  "/*",
  serveStatic({
    root: "../dist",
  }),
);

export default {
  port: 3001,
  fetch: app.fetch,
};
