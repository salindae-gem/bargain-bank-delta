# Bargain Bank - AI Coding Agent Guidelines

**Project:** Bargain Bank - A gamified savings app  
**Motto:** "Simplicity is best"  
**Current Phase:** Requirements & planning (greenfield project)

---

## Project Context

Bargain Bank is a mobile-first savings application designed to help everyday users develop better financial habits through gamification and instant positive feedback. The app emphasizes simplicity, accessibility, and dopamine-driven engagement without financial jargon.
NOTE: use additional Guidelines in the [GUIDELINES.md](./Gurdrails.md) file for more context on tone, style, and approach.

**Key Design Principles:**

- Simplicity over complexity
- Instant positive feedback for all savings actions
- Mobile-first, responsive design
- Accessibility-first approach
- Playful, non-intrusive interactions
- Minimal data storage

See [docs/business-requirements.md](../docs/business-requirements.md) for full product vision.

---

## Tech Stack & Architecture

### Recommended Stack (for PWA MVP)

- **Frontend Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS v4 + shadcn/ui components
- **State Management:** TanStack Query for async + Zustand for client state
- **Routing:** TanStack Router
- **Testing:** Vitest + React Testing Library
- **Backend:** Hono.js (for API routes)
- **Database:** SQLite or PostgreSQL
- **PWA Support:** Vite PWA plugin

### Architecture Decision

## **PWA** - Single web codebase for fastest MVP deployment

## Code Structure

```
bargain-bank/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components (shadcn/ui)
│   │   ├── features/          # Feature-specific pages & logic
│   │   ├── hooks/             # Custom React hooks
│   │   ├── stores/            # Zustand stores for client state
│   │   ├── utils/             # Utilities, helpers
│   │   ├── types/             # TypeScript types & interfaces
│   │   └── main.tsx           # Entry point
│   ├── public/                # Static assets, PWA manifest
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── routes/            # API endpoints
│   │   ├── db/                # Database schema & migrations
│   │   ├── services/          # Business logic
│   │   └── middleware/
│   ├── package.json
│   └── wrangler.toml          # (if using Cloudflare Workers)
├── docs/
│   ├── business-requirements.md
│   ├── technical/
│   └── user-stories/
└── .github/
    └── copilot-instructions.md
```

---

## Code Style & Conventions

### TypeScript

- Use `strict: true` in `tsconfig.json`
- Prefer explicit types over `any`
- Use consistent naming: `PascalCase` for types/interfaces, `camelCase` for functions/variables
- Export types separately when used across components

### React Components

- Functional components only (no class components)
- Use component co-location: place styles and hooks near where they're used
- Prefer composition over deeply nested props
- Keep components focused on a single responsibility
- Use shadcn/ui components for base UI elements, customize with Tailwind as needed

### File Naming

- Components: `PascalCase` (e.g., `SaveGoalForm.tsx`)
- Hooks: `camelCase` with `use` prefix (e.g., `useGoalProgress.ts`)
- Utilities: `camelCase` (e.g., `calculateStreak.ts`)
- Pages/Features: `PascalCase` (e.g., `SavingsGoals/`)

### Styling

- Use TailwindCSS for responsive, utility-first styling
- Use shadcn/ui components for base UI elements
- Avoid custom CSS where Tailwind can solve it
- Mobile-first: start with mobile styles, then add breakpoints

### Color Palette

- Use **TailwindCSS theme-based colors** (Tailwind's default palette already complies with WCAG 2.1 AA contrast requirements)
- Leverage Tailwind's semantic color utilities (e.g., `text-primary`, `bg-primary`) for consistency

### Testing

- Test behavior, not implementation details
- Use React Testing Library for component testing
- Aim for 60%+ coverage of critical features
- Test accessibility (screen reader, keyboard navigation)

---

## Key Features & User Flows

### Feature: Record Savings Action (US-001)

- User logs in → clicks "Save" → records amount → receives instant feedback
- **Feedback elements:** celebratory animation + sound + encouraging message
- **Requirements:** Vary feedback, highlight streaks, accessibility support, enable/disable options

See [docs/user-stories/US-001-celebrate-saving-action.md](../docs/user-stories/US-001-celebrate-saving-action.md) for full requirements.

### Core Data Model

```
User
├── Profile (settings, preferences)
└── SavingsGoals[]
    ├── Goal metadata (name, target, deadline)
    ├── Progress (current total)
    └── SavingsActions[]
        ├── Amount, timestamp
        ├── Streak info
        └── Feedback history
```

---

## Build & Development Commands

```bash
# Frontend
pnpm install                 # Install dependencies
pnpm run dev                # Start dev server (localhost:5173 frontend, localhost:3000 backend) (both backend and frontend)
pnpm run build              # Build for production
pnpm run preview            # Preview production build locally
pnpm run test               # Run tests
pnpm run test:coverage      # Run tests with coverage

# Backend (if applicable)
pnpm run dev:server        # Start backend dev server (localhost:3000)
pnpm run deploy             # Deploy (Cloudflare/Node.js)
```

**Note:** Commands will be added once project is initialized.

---

## Accessibility Requirements

All features must meet WCAG 2.1 AA standards:

- **Visual Feedback:** No animation should cause photosensitivity (< 3 flashes/sec)
- **Color Contrast:** Text must have 4.5:1 contrast ratio
- **Screen Reader Support:** All interactive elements have proper ARIA labels
- **Keyboard Navigation:** All features usable via keyboard alone
- **Captions:** Sounds have visual alternatives or captions
- **Settings:** Users must be able to disable/customize feedback

---

## Performance Considerations

- **Animations:** Must not block interaction (use CSS transforms/opacity or requestAnimationFrame)
- **Bundle Size:** Keep JS bundle < 100KB (gzipped) for fast load on mobile networks
- **PWA Offline:** Critical features must work offline with service workers
- **Database Queries:** Optimize to minimize round-trips for instant feedback

---

## Integration Points

### External Dependencies

- **Authentication:** To be determined (email, phone, social login)
- **Analytics/Tracking:** Optional (only with user consent)
- **Push Notifications:** For reminders (PWA or native)

### Development vs. Production

- Local dev: Use SQLite or mock data
- Production: Configure environment variables in deployment platform

---

## Security Considerations

- Passwords must be hashed (bcrypt or similar)
- API endpoints must validate user authentication (JWT tokens recommended)
- Sanitize user input to prevent XSS
- HTTPS enforced in production
- No sensitive financial data stored (only savings goals/actions)

---

## Development workflow

1. **Confirm implementation plan** from [docs/plan/](../docs/plans//)
2. **Follow the plan** update Todo task based on the plan
3. **Implement changes** one by one task and update task status
4. **Testing & refinement**

---

## Resources

- [Business Requirements](../docs/business-requirements.md)
- [User Story](../docs/user-stories/)

---

**Last Updated:** February 15, 2026  
**Maintained By:** Development Team
