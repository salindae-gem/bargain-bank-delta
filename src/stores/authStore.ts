/**
 * Authentication Store (Zustand)
 * Manages global authentication state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '../types/auth';

interface AuthStoreActions {
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setError: (error: string | null) => void;
    setIsLoading: (loading: boolean) => void;
    logout: () => void;
    login: (user: User, token: string) => void;
}

type AuthStore = AuthState & AuthStoreActions;

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            // Initial state
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Actions
            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: user !== null,
                }),

            setToken: (token) =>
                set({
                    token,
                    isAuthenticated: token !== null,
                }),

            setError: (error) => set({ error }),

            setIsLoading: (loading) => set({ isLoading: loading }),

            login: (user, token) =>
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    error: null,
                }),

            logout: () =>
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    error: null,
                }),
        }),
        {
            name: 'auth-store',
            partialize: (state) => ({
                token: state.token,
                user: state.user,
            }),
        }
    )
);

export default useAuthStore;
