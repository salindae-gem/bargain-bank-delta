import { Hono } from 'hono'
const api = new Hono()

// Health check
api.get('/health', (c) => c.json({ status: 'ok' }))

export default api
