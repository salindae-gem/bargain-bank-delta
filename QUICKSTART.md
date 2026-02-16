# Quick Start Guide - Bargain Bank Login Feature

## Installation

```bash
# Install dependencies
pnpm install
```

## Development

```bash
# Start frontend (port 5173) + backend (port 3000) together
pnpm dev:all

# Or separately:
pnpm dev              # Frontend only
pnpm dev:server       # Backend only
```

## Build & Test

```bash
# Lint code
pnpm lint

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Testing Login

1. Open http://localhost:5173
2. You'll be redirected to login page
3. Try the form with validation:
   - Leave email blank → validation error
   - Enter invalid email → validation error
   - Try non-existent email → generic error (security)

**Test Credentials** (create first):
- Currently no users in database
- Sign up endpoint coming in Phase 2

## Project Structure

```
bargain-bank/
├── backend/                  # API server (Hono)
│   ├── db/                   # Database schema
│   ├── routes/               # API endpoints (/auth/login, etc)
│   ├── middleware/           # Auth & rate limiting
│   ├── services/             # Business logic (password hashing, etc)
│   └── server/               # Hono app setup
├── src/                      # Frontend (React)
│   ├── components/           # Reusable components
│   ├── features/             # Feature modules (Auth)
│   ├── hooks/                # Custom hooks (useAuth)
│   ├── stores/               # Zustand state (authStore)
│   ├── types/                # TypeScript definitions
│   ├── utils/                # Utilities (authApi client)
│   ├── layouts/              # Layout components
│   ├── App.tsx               # Root component
│   └── main.tsx              # Entry point
├── docs/                     # Documentation
│   ├── plans/                # Implementation plans
│   └── IMPLEMENTATION-US-002.2.md  # This implementation's docs
├── .github/                  # GitHub config
│   └── prompt/               # AI prompt templates
├── .env.local                # Local environment vars
└── package.json              # Dependencies & scripts
```

## Environment Setup

Copy `.env.example` to `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Key Features Implemented

✅ **LoginPage Component**
- Email/password form with validation
- Password visibility toggle
- Real-time error messages
- Loading state
- Fully accessible (WCAG 2.1 AA)
- Mobile-responsive

✅ **Authentication Flow**
- JWT token generation (7-day expiry)
- Secure password hashing (bcryptjs)
- Rate limiting (5 attempts / 15 min)
- Generic error messages (security)
- Token persistence (localStorage)

✅ **DashboardPage Component**
- Protected route (auth-required)
- User profile display
- Logout functionality
- Placeholder for future features

## Architecture

**Frontend State Management:**
- Zustand (authStore) - User & token state
- TanStack Query - Async state & API calls
- TanStack Router - Routing & navigation
- React Hook Form + Zod - Form validation

**Backend:**
- Hono.js - Lightweight API framework
- SQLite - Database (MVP)
- bcryptjs - Password hashing
- JWT - Token authentication

## Common Tasks

### Clear Database
```bash
sqlite3 bargain-bank.db "DELETE FROM users; DELETE FROM login_attempts;"
```

### View Login Attempts
```bash
sqlite3 bargain-bank.db "SELECT * FROM login_attempts ORDER BY attempted_at DESC LIMIT 10;"
```

### Check Build Status
```bash
pnpm build 2>&1 | tail -20
```

### Run Linter
```bash
pnpm lint
```

## Troubleshooting

**"Cannot find module" errors:**
```bash
pnpm install
```

**Port 3000/5173 already in use:**
```bash
# Kill processes
lsof -ti:3000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

**Tailwind not working:**
```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
pnpm build
```

## Next Steps

1. Implement sign up (POST /auth/signup)
2. Add forgot password flow
3. Build savings goals feature
4. Implement savings action recording
5. Add gamification (streaks, badges)

## Resources

- [Implementation Plan](./docs/plans/US-002.2-login-implementation-plan.md)
- [Full Implementation Details](./docs/IMPLEMENTATION-US-002.2.md)
- [Project Instructions](./copilot-instructions.md)
- [Prompt Template](./prompt/login-form.prompt.md)

---

**Happy coding! 🚀**
