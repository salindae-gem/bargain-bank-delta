/**
 * DashboardPage Component
 * Shows user's savings dashboard (placeholder for MVP)
 */

import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.email}!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Placeholder Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Savings Goals
            </h2>
            <p className="text-gray-600">
              Your savings goals will appear here (coming soon in Phase 2)
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <p className="text-gray-600">
              Recent savings actions will appear here (coming soon in Phase 2)
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Profile Information
          </h2>
          <dl className="space-y-2">
            <div>
              <dt className="font-medium text-gray-700">Email:</dt>
              <dd className="text-gray-600">{user?.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">User ID:</dt>
              <dd className="text-gray-600 text-sm font-mono">{user?.id}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Joined:</dt>
              <dd className="text-gray-600">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : 'N/A'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
