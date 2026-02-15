/**
 * SignUpPage Component
 * Handles user account creation with email and password
 * Accessibility: WCAG 2.1 AA compliant
 * Uses shadcn components for consistent UI
 */

import { useEffect, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import useAuthStore from "../../stores/authStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { PasswordInput } from "../../components/PasswordInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  signupSchema,
  type SignUpFormData,
} from "../../utils/validation/signupSchema";
import {
  getPasswordStrength,
  getStrengthColor,
  getStrengthLabel,
} from "../../utils/passwordStrength";

export function SignUpPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [displayedError, setDisplayedError] = useState<string | null>(null);
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const password = form.watch("password");
  const passwordStrength = getPasswordStrength(password);
  const isFormValid = form.formState.isValid;

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  // Redirect after successful signup
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  // Handle error display with auto-dismiss
  useEffect(() => {
    if (!error) {
      return;
    }

    // Defer state update to next microtask to avoid cascading renders
    queueMicrotask(() => setDisplayedError(error));
    const timeoutId = setTimeout(() => setDisplayedError(null), 5000);
    return () => clearTimeout(timeoutId);
  }, [error]);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setSuccessMessage("");
      setDisplayedError(null);
      await signup(data.email, data.password, data.passwordConfirmation);
      setSuccessMessage("Your account created! Let's get started.");
      form.reset();
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center px-4 py-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl">Bargain Bank</CardTitle>
          <CardDescription>
            Create your account and start saving
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Alert */}
          {displayedError && (
            <div className="relative bg-destructive/10 border border-destructive/30 rounded-lg p-3 pr-10">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive mb-1">
                    Sign Up Error
                  </h3>
                  <p className="text-sm text-destructive/90">
                    {displayedError}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDisplayedError(null)}
                className="absolute right-2 top-2 h-6 w-6 p-0"
                aria-label="Close error message"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <div className="flex gap-3">
                <div>
                  <h3 className="font-semibold text-accent mb-1">Success</h3>
                  <p className="text-sm text-accent/90">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Sign Up Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Create a strong password"
                        autoComplete="new-password"
                        disabled={isLoading}
                      />
                    </FormControl>

                    {/* Password Requirements */}
                    <div className="mt-3 p-3 bg-muted rounded border border-border space-y-2">
                      <p className="text-xs font-semibold text-foreground">
                        Password requirements:
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li
                          className={
                            password && password.length >= 8
                              ? "text-primary font-medium"
                              : ""
                          }
                        >
                          ✓ At least 8 characters
                        </li>
                        <li
                          className={
                            password && /\d/.test(password)
                              ? "text-primary font-medium"
                              : ""
                          }
                        >
                          ✓ At least 1 number
                        </li>
                        <li
                          className={
                            password && /[!@#$%^&*]/.test(password)
                              ? "text-primary font-medium"
                              : ""
                          }
                        >
                          ✓ At least 1 special character (!@#$%^&*)
                        </li>
                      </ul>

                      {/* Password Strength Indicator */}
                      {password && (
                        <div className="mt-3">
                          <div className="flex gap-1 h-2">
                            {[0, 1, 2].map((i) => (
                              <div
                                key={i}
                                className={`flex-1 rounded-full transition-colors ${
                                  passwordStrength! > i
                                    ? getStrengthColor(passwordStrength!)
                                    : "bg-muted-foreground/20"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs mt-1 font-medium text-muted-foreground">
                            {getStrengthLabel(passwordStrength || 0)}
                          </p>
                        </div>
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Confirmation Field */}
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !isFormValid || !!successMessage}
                className="w-full"
                size="lg"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>

          {/* Sign In Link */}
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
            >
              Sign in here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
