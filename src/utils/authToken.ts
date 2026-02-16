/**
 * Authentication Token Management
 * Utilities for managing auth token from Zustand store
 */

import { useAuthStore } from '../stores/authStore';

/**
 * Retrieves the stored auth token
 */
export function getAuthToken(): string | null {
  return useAuthStore.getState().token;
}

/**
 * Sets the auth token in store
 */
export function setAuthToken(token: string | null): void {
  if (token) {
    useAuthStore.getState().setToken(token);
  } else {
    useAuthStore.getState().clearToken();
  }
}

/**
 * Clears the auth token from store
 */
export function clearAuthToken(): void {
  useAuthStore.getState().clearToken();
}
