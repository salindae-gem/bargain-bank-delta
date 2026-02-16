/**
 * Sign Up Validation Schema
 * Defines validation rules for user registration
 */

import { z } from 'zod';

export const signupSchema = z
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

export type SignUpFormData = z.infer<typeof signupSchema>;
