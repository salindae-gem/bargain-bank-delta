/**
 * Authentication Store (Zustand)
 * Minimal store for persisting auth token
 * User state and loading/error are managed by React Query
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthToken {
    token: string | null;
}

interface AuthStoreActions {
    setToken: (token: string | null) => void;
    clearToken: () => void;
}

type AuthStore = AuthToken & AuthStoreActions;

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            // Initial state
            token: null,

            // Actions
            setToken: (token) => set({ token }),
            clearToken: () => set({ token: null }),
        }),
        {
            name: 'auth-store',
            partialize: (state) => ({
                token: state.token,
            }),
        }
    )
);

// Default export for backwards compatibility
export default useAuthStore;
