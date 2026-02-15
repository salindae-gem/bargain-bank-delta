/**
 * Router Configuration
 * TanStack Router setup with authentication
 */

import { createRootRoute, createRoute, Router, redirect } from '@tanstack/react-router';
import { LoginPage } from './features/Auth/LoginPage';
import { DashboardPage } from './features/Auth/DashboardPage';
import useAuthStore from './stores/authStore';
import RootLayout from './layouts/RootLayout';

// Root route
const rootRoute = createRootRoute({
    component: RootLayout,
});

// Login route
const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage,
});

// Dashboard route (protected)
const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    beforeLoad: async () => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        if (!isAuthenticated) {
            throw redirect({
                to: '/login',
            });
        }
    },
    component: DashboardPage,
});

// Index route - redirect to login or dashboard based on auth status
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    beforeLoad: async () => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        throw redirect({
            to: isAuthenticated ? '/dashboard' : '/login',
        });
    },
    component: () => null,
});

// Create route tree
const routeTree = rootRoute.addChildren([
    loginRoute,
    dashboardRoute,
    indexRoute,
]);

// Create and export router
export const router = new Router({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
