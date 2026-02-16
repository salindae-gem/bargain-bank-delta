# LoginPage Component - Prompt Generator & Evaluation

## Three Prompt Options & Evaluation

### Option 1: Form-Focused Approach

**Prompt:**

```
You are a Senior Frontend Engineer tasked with creating a LoginPage React component for Bargain Bank mobile-first savings app.

Purpose: Create a professional, accessible login form that displays email and password fields with validation, error handling, and loading states.

Project Context:
- Tech Stack: React 18+, TypeScript, TailwindCSS v4, shadcn/ui, TanStack Query, Zod validation
- Design Principles: Simplicity, mobile-first, accessibility-first (WCAG 2.1 AA)
- Code Style: Functional components, explicit types, PascalCase components, camelCase functions
- File Location: src/features/Auth/LoginPage.tsx

Component Requirements:
1. Display email input field with validation
2. Display password input with show/hide toggle button
3. Submit button with loading state during API call
4. Form validation using Zod schema
5. API error handling with generic error messages
6. Navigate to /dashboard on successful login
7. Navigation to /forgot-password link (placeholder)

Accessibility Requirements (WCAG 2.1 AA):
- Proper ARIA labels on all form fields
- form role attribute
- Keyboard navigation support (Tab through fields, Enter submits)
- Focus management (visible focus indicators)
- Color contrast 4.5:1 minimum
- Error messages associated with inputs using aria-describedby

Mobile Optimization:
- Touch-friendly input sizes (min 44px tap targets on iOS)
- Input fields full width or max 100% container width
- Touch-friendly password toggle button
- Responsive layout for different screen sizes

Success Criteria:
- Form renders without errors
- Tab navigation works through all inputs
- Screen readers announce all labels and error messages
- Form submits on valid data
- Loading state shows during API call
- Error messages display for validation failures
```

**Pros:**

- Clear, specific requirements
- Covers accessibility and mobile requirements
- Good separation of concerns (form, validation, API)
- Includes success criteria

**Cons:**

- May miss design nuances
- Doesn't explicitly ask about styling approach (Tailwind utilities vs custom classes)
- No mention of form state library preference

---

### Option 2: Comprehensive Design-Focused Approach

**Prompt:**

```
Design and implement a LoginPage component for Bargain Bank - a gamified mobile-first savings app emphasizing "Simplicity is best".

Senior Frontend Engineer Context:
You are following Bargain Bank's [copilot-instructions.md](#code-style--conventions) guidelines. Your component must adhere to:
- React 18+ with TypeScript (strict mode)
- TailwindCSS v4 + shadcn/ui components
- react-hook-form with Zod validation
- TanStack Query (useQuery/useMutation) for async operations
- Zustand for persistent auth state
- WCAG 2.1 AA accessibility compliance

Component Design:
- Simple, clean UI with minimal visual hierarchy
- Mobile-first responsive design (single column on mobile, consider desktop at breakpoints)
- Instant visual feedback on user actions
- Error states with context-specific guidance

Functional Requirements:
1. Email field: type="email", validation (required, valid format)
2. Password field: type="password" with toggle visibility
3. Submit button: shows loading spinner during auth call, disabled during loading
4. Form validation: Client-side with Zod, server validation on backend
5. Error display: Generic "Invalid email or password" for auth failures, specific errors for validation
6. Success: Store JWT token, redirect to /dashboard
7. Additional UI: "Forgot password?" link (route: /forgot-password)

Accessibility & Mobile:
- All inputs labeled with <label htmlFor="...">
- Error messages with aria-describedby linking to error IDs
- Focus outline visible (use focus:outline-2 focus:outline-offset-2)
- Min 44px touch targets for buttons/inputs on iOS
- Color contrast: Text on background must be 4.5:1
- Test with keyboard-only navigation (no mouse)
- Test with screen reader (VoiceOver on macOS)

Implementation Constraints:
- Use page/form-level state with react-hook-form
- Validate password minimum requirements (8+ characters, no common passwords)
- Do NOT expose sensitive error details (prevent email enumeration)
- Use environment variable VITE_API_BASE_URL for API endpoint
```

**Pros:**

- Highly comprehensive and detailed
- Mentions code style and conventions explicitly
- Clear constraints and security considerations
- Guides design decisions (styling approach, error handling)

**Cons:**

- Very long, may be overwhelming
- Over-specifies some implementation details
- May limit creative freedom in component structure

---

### Option 3: Balanced Approach (RECOMMENDED)

**Prompt:**

```
Create a LoginPage component for Bargain Bank following project conventions and requirements.

Role Context:
You are a Senior Frontend Engineer implementing authentication for a mobile-first savings app. Follow [.github/copilot-instructions.md](#code-style--conventions) and [.github/prompt/ape-react-component.md](../ape-react-component.md) guidelines.

Tech Stack:
- React 18+ TypeScript, TailwindCSS v4, shadcn/ui
- react-hook-form + Zod validation
- TanStack Query for API calls
- Component location: src/features/Auth/LoginPage.tsx

Component Specification:
1. Form Layout: Email input, password input with visibility toggle, submit button
2. Validation: Client-side Zod schema (email required + valid format, password required)
3. API Integration: POST /auth/login with TanStack Query mutation
4. Error Handling: Generic errors for auth failures (no email enumeration)
5. Success Flow: Store auth token in localStorage, redirect to /dashboard
6. Additional: "Forgot password?" link (placeholder route: /forgot-password)

Accessibility Requirements (WCAG 2.1 AA):
- Form must be keyboard navigable (Tab, Shift+Tab, Enter submit)
- All inputs have associated labels (aria-label or <label htmlFor>)
- Error messages linked to inputs via aria-describedby
- Focus indicators visible on all interactive elements
- Text contrast minimum 4.5:1 on background
- Password field offers show/hide toggle button

Mobile-First Design:
- Full-width inputs on mobile (padding appropriate for safe areas)
- Touch targets minimum 44px (iOS) or 48px (Android)
- Responsive breakpoints for larger screens
- Clear visual feedback for loading state

Clarifying Questions (select preferred approach):
1. Should password requirements be enforced (e.g., 8+ chars, uppercase)?
   - A) Strict requirements with real-time validation feedback ✓ RECOMMENDED
   - B) Minimal requirements (just "required" field)
   - C) No client-side requirements, server validates

2. Where should the auth token be stored?
   - A) localStorage with XSS vulnerability warnings in comments ✓ RECOMMENDED
   - B) httpOnly cookies (requires backend support)
   - C) sessionStorage (lost on browser close)

3. Should the component handle "Remember me" functionality?
   - A) Yes, add checkbox for persistent login per device ✓ RECOMMENDED for MVP
   - B) No, keep it simple for MVP
   - C) Defer to Phase 2+

Success Criteria:
✓ Component compiles without TypeScript errors
✓ Form submits on valid email + password
✓ Loading state displays during API call
✓ Errors display for validation failures
✓ Keyboard navigation works (all inputs + buttons)
✓ Mobile responsive on iOS Safari and Android Chrome
✓ Accessible to screen readers (tested with VoiceOver/NVDA)
```

**Pros:**

- Balanced - not too short, not too long
- Clear, specific requirements
- Includes clarifying questions with recommendations
- Mobile-first and accessibility priorities are explicit
- References project conventions

**Cons:**

- Slightly longer than Option 1
- May still leave some ambiguity on exact styling

---

## Recommendation

**Use Option 3 (Balanced Approach)** for the following reasons:

1. **Clarity + Flexibility:** Specific enough to guide implementation but flexible enough for creative decisions
2. **Accessibility First:** Explicitly lists WCAG requirements with examples
3. **Mobile-First:** Clear mobile optimization criteria
4. **Clarifying Questions:** Guides architectural decisions (token storage, password requirements)
5. **References Guidelines:** Directs to project conventions, reducing ambiguity
6. **Proven Success:** Balanced prompts typically yield component code closer to production quality

---

## Final Prompt to Use

See Option 3 above - this is the prompt to use when generating the LoginPage component code.

---

**Status:** Phase 0 Complete ✓  
**Next:** Use Option 3 prompt to generate/implement LoginPage component (Phase 2 Frontend)
