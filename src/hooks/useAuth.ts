/**
 * useAuth Hook
 * Provides auth operations and state management
 */

import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '../stores/authStore';
import { login as loginApi } from '../utils/authApi';
import type { LoginRequest, AuthResponse } from '../types/auth';

export function useAuth() {
    const {
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        setError,
        setIsLoading,
    } = useAuthStore();

    const loginMutation = useMutation<AuthResponse, Error, LoginRequest>({
        mutationFn: loginApi,
        onMutate: () => {
            setIsLoading(true);
            setError(null);
        },
        onSuccess: (data) => {
            if (data.success && data.user && data.token) {
                login(data.user, data.token);
            } else {
                setError(data.error || 'Login failed');
            }
            setIsLoading(false);
        },
        onError: (error) => {
            setError(error.message || 'An error occurred during login');
            setIsLoading(false);
        },
    });

    const handleLogin = useCallback(
        async (email: string, password: string) => {
            return loginMutation.mutate({ email, password });
        },
        [loginMutation]
    );

    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    return {
        user,
        token,
        isAuthenticated,
        isLoading: isLoading || loginMutation.isPending,
        error,
        login: handleLogin,
        logout: handleLogout,
    };
}
