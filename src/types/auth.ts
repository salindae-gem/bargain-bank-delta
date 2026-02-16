/**
 * Authentication Types
 * Defines all authentication-related interfaces and types
 */

export interface User {
    id: string;
    email: string;
    created_at: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface SignUpResponse {
    success: boolean;
    token?: string;
    user?: User;
    error?: string;
    errors?: Record<string, string>;
}

export interface AuthResponse {
    success: boolean;
    token?: string;
    user?: User;
    error?: string;
    errors?: Record<string, string>;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
