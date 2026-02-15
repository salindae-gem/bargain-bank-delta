/**
 * Authentication Routes
 * Handles login, logout, signup, and user profile endpoints
 */

import { Hono, Context } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z, ZodError } from 'zod';
import { authMiddleware, generateToken, Variables } from '../middleware/auth';
import { rateLimitMiddleware } from '../middleware/rateLimit';
import {
  getUserByEmail,
  getUserById,
  verifyPassword,
  logLoginAttempt,
  hashPassword,
  createUser,
} from '../services/authService';

type AppContext = Context<{ Variables: Variables }>;

const authRouter = new Hono<{ Variables: Variables }>();

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*]/,
        'Password must contain at least one special character (!@#$%^&*)'
      ),
    passwordConfirmation: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

// Helper function to format Zod errors
function formatZodErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  if (error.issues) {
    error.issues.forEach((issue) => {
      const field = issue.path.join('.');
      errors[field || 'root'] = issue.message;
    });
  }
  return errors;
}

// POST /auth/login
authRouter.post(
  '/login',
  rateLimitMiddleware,
  zValidator('json', loginSchema),
  async (c) => {
    const { email, password } = c.req.valid('json');
    const ipAddress = c.req.header('X-Forwarded-For') || 'unknown';

    try {
      // Lookup user by email
      const user = getUserByEmail(email);

      if (!user) {
        logLoginAttempt(email, false, ipAddress);
        // Return generic error to prevent email enumeration
        return c.json(
          { success: false, error: 'Invalid email or password' },
          401
        );
      }

      // Verify password
      const isValidPassword = await verifyPassword(password, user.password_hash);

      if (!isValidPassword) {
        logLoginAttempt(email, false, ipAddress);
        return c.json(
          { success: false, error: 'Invalid email or password' },
          401
        );
      }

      // Generate token
      const token = await generateToken(user.id, user.email);

      logLoginAttempt(email, true, ipAddress);

      return c.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      return c.json(
        { success: false, error: 'An error occurred during login' },
        500
      );
    }
  }
);

// POST /auth/signup
authRouter.post('/signup', rateLimitMiddleware, async (c) => {
  try {
    // Parse and validate JSON
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json(
        { success: false, error: 'Invalid JSON' },
        400
      );
    }

    // Validate with Zod
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = formatZodErrors(validationResult.error);
      return c.json(
        {
          success: false,
          error: 'Validation failed',
          errors,
        },
        400
      );
    }

    const { email, password } = validationResult.data;

    // Check if email already exists
    const existingUser = getUserByEmail(email);

    if (existingUser) {
      return c.json(
        {
          success: false,
          error: 'This email is already registered',
          field: 'email',
        },
        409
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const newUser = createUser(email, passwordHash);

    // Generate token
    const token = await generateToken(newUser.id, newUser.email);

    return c.json(
      {
        success: true,
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          created_at: newUser.created_at,
        },
        message: 'Account created successfully!',
      },
      201
    );
  } catch (error) {
    console.error('Signup error:', error);
    return c.json(
      { success: false, error: 'An error occurred during sign up' },
      500
    );
  }
});

// POST /auth/logout
authRouter.post('/logout', (c) => {
  // In a real app, you might invalidate tokens here
  // For now, just return success - token invalidation happens client-side
  return c.json({ success: true });
});

// GET /auth/me (protected)
authRouter.get('/me', authMiddleware, async (c: AppContext) => {
  try {
    const user = c.get('user');

    if (!user) {
      return c.json({ error: 'User not found' }, 401);
    }

    const userRecord = getUserById(user.id);

    if (!userRecord) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({
      success: true,
      user: {
        id: userRecord.id,
        email: userRecord.email,
        created_at: userRecord.created_at,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return c.json(
      { success: false, error: 'An error occurred' },
      500
    );
  }
});

export default authRouter;


