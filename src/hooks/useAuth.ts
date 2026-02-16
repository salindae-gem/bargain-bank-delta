/**
 * useAuth Hook
 * Provides authentication mutations and state management via React Query
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';
import { login as loginApi, signup as signupApi, logout as logoutApi, getMe as getMeApi } from '../utils/authApi';
import type { LoginRequest, SignUpRequest, AuthResponse, User } from '../types/auth';

export const AUTH_QUERY_KEYS = {
    currentUser: ['auth', 'currentUser'],
    login: ['auth', 'login'],
    signup: ['auth', 'signup'],
};

export function useLogin() {
    const { setToken } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation<AuthResponse, Error, LoginRequest>({
        mutationFn: loginApi,
        onSuccess: (data) => {
            if (data.token) {
                setToken(data.token);
                // Invalidate user query to refetch user data
                queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
            }
        },
    });
}

export function useSignup() {
    const { setToken } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation<AuthResponse, Error, SignUpRequest>({
        mutationFn: signupApi,
        onSuccess: (data) => {
            if (data.token) {
                setToken(data.token);
                // Invalidate user query to refetch user data
                queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
            }
        },
    });
}

export function useLogout() {
    const { clearToken } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            clearToken();
            // Clear all auth data from cache
            queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
        },
        onError: () => {
            // Clear local state even if logout fails on server
            clearToken();
            queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
        },
    });
}

export function useCurrentUser() {
    const { token } = useAuthStore();

    return useQuery<User, Error>({
        queryKey: AUTH_QUERY_KEYS.currentUser,
        queryFn: getMeApi,
        enabled: !!token,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    });
}

/**
 * useAuth - Legacy hook for component compatibility
 * Combines login, signup, logout mutations and current user query
 */
export function useAuth() {
    const loginMutation = useLogin();
    const signupMutation = useSignup();
    const logoutMutation = useLogout();
    const currentUserQuery = useCurrentUser();

    return {
        // User data
        user: currentUserQuery.data || null,
        isAuthenticated: !!currentUserQuery.data,
        
        // Loading states
        isLoading: loginMutation.isPending || signupMutation.isPending || currentUserQuery.isLoading,
        
        // Error states
        error: loginMutation.error?.message || signupMutation.error?.message || currentUserQuery.error?.message || null,
        
        // Mutations
        login: loginMutation.mutate,
        signup: signupMutation.mutate,
        logout: logoutMutation.mutate,
    };
}
