/**
 * Root Layout Component
 * Main layout wrapper for all routes
 */

import { Outlet } from '@tanstack/react-router';

export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
