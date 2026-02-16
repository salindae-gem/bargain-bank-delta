/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 */

import type { ReactNode } from 'react';
import { useAuthStore } from '../stores/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return fallback || <div>Redirecting to login...</div>;
  }

  return children;
}
