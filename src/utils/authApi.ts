/**
 * Authentication API Client
 * Handles API calls to auth endpoints with React Query
 */

import type { LoginRequest, SignUpRequest, AuthResponse, User } from '../types/auth';
import { getAuthToken } from './authToken';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Handles API errors and returns a formatted error message
 */
function handleApiError(error: Response | unknown): string {
  if (error instanceof Response) {
    if (error.status === 401) return 'Unauthorized. Please check your credentials.';
    if (error.status === 400) return 'Bad request. Please check your input.';
    if (error.status === 409) return 'This email is already registered.';
    if (error.status === 500) return 'Server error. Please try again later.';
    return `Error: ${error.statusText}`;
  }
  return error instanceof Error ? error.message : 'An unexpected error occurred';
}

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(handleApiError(response));
  }

  const data: AuthResponse = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Login failed');
  }
  
  return data;
}

export async function signup(credentials: SignUpRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(handleApiError(response));
  }

  const data: AuthResponse = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Sign up failed');
  }

  return data;
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(handleApiError(response));
  }
}

export async function getMe(): Promise<User> {
  const token = getAuthToken();

  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(handleApiError(response));
  }

  const data: AuthResponse = await response.json();
  if (!data.success || !data.user) {
    throw new Error('Failed to fetch user');
  }

  return data.user;
}
