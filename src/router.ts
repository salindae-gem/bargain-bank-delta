/**
 * Router Configuration
 * TanStack Router setup with authentication
 */

import { createRootRoute, createRoute, Router, redirect } from '@tanstack/react-router';
import { LoginPage } from './features/Auth/LoginPage';
import { SignUpPage } from './features/Auth/SignUpPage';
import { DashboardPage } from './features/Auth/DashboardPage';
import { useAuthStore } from './stores/authStore';
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

// Sign up route
const signupRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/signup',
    component: SignUpPage,
});

// Dashboard route (protected)
const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    beforeLoad: async () => {
        const token = useAuthStore.getState().token;
        if (!token) {
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
        const token = useAuthStore.getState().token;
        throw redirect({
            to: token ? '/dashboard' : '/login',
        });
    },
    component: () => null,
});

// Create route tree
const routeTree = rootRoute.addChildren([
    loginRoute,
    signupRoute,
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
