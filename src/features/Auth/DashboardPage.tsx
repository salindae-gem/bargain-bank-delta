/**
 * DashboardPage Component
 * Shows user's savings dashboard (placeholder for MVP)
 * Accessibility: WCAG 2.1 AA compliant
 * Uses shadcn components for consistent UI
 */

import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { formatDate } from "../../utils/dateFormat";

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.email}!
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="destructive"
            size="lg"
            className="w-full sm:w-auto"
          >
            Logout
          </Button>
        </div>

        {/* Placeholder Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Savings Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your savings goals will appear here (coming soon in Phase 2)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Recent savings actions will appear here (coming soon in Phase 2)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="space-y-1">
                <dt className="font-semibold text-foreground">Email</dt>
                <dd className="text-muted-foreground">{user?.email}</dd>
              </div>
              <div className="space-y-1">
                <dt className="font-semibold text-foreground">User ID</dt>
                <dd className="text-muted-foreground text-sm font-mono break-all">
                  {user?.id}
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="font-semibold text-foreground">Joined</dt>
                <dd className="text-muted-foreground">
                  {user?.created_at ? formatDate(user.created_at) : "N/A"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
