/**
 * SignUpPage Component
 * Handles user account creation with email and password
 * Accessibility: WCAG 2.1 AA compliant
 * Uses shadcn components for consistent UI
 */

import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import useAuthStore from "../../stores/authStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
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

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const password = form.watch("password");

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

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setSuccessMessage("");
      await signup(data.email, data.password, data.passwordConfirmation);
      setSuccessMessage("Your account created! Let's get started.");
      form.reset();
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return null;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    return strength;
  };

  const passwordStrength = getPasswordStrength();
  const isFormValid = form.formState.isValid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl">Bargain Bank</CardTitle>
          <CardDescription>
            Create your account and start saving
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Sign Up Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Message */}
          {successMessage && (
            <Alert className="bg-green-50 border-green-500 text-green-900">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
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
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          autoComplete="new-password"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? "🙈 Hide" : "👁️ Show"}
                        </button>
                      </div>
                    </FormControl>

                    {/* Password Requirements */}
                    <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200 space-y-2">
                      <p className="text-xs font-semibold text-gray-700">
                        Password requirements:
                      </p>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li
                          className={
                            password && password.length >= 8
                              ? "text-indigo-600 font-medium"
                              : ""
                          }
                        >
                          ✓ At least 8 characters
                        </li>
                        <li
                          className={
                            password && /\d/.test(password)
                              ? "text-indigo-600 font-medium"
                              : ""
                          }
                        >
                          ✓ At least 1 number
                        </li>
                        <li
                          className={
                            password && /[!@#$%^&*]/.test(password)
                              ? "text-indigo-600 font-medium"
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
                                    ? passwordStrength === 3
                                      ? "bg-indigo-500"
                                      : passwordStrength === 2
                                        ? "bg-yellow-500"
                                        : "bg-orange-500"
                                    : "bg-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs mt-1 font-medium text-gray-600">
                            {passwordStrength === 1 && "Weak"}
                            {passwordStrength === 2 && "Medium"}
                            {passwordStrength === 3 && "Strong"}
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
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPasswordConfirmation ? "text" : "password"}
                          placeholder="Re-enter your password"
                          autoComplete="new-password"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswordConfirmation(
                              !showPasswordConfirmation,
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1"
                          aria-label={
                            showPasswordConfirmation
                              ? "Hide password confirmation"
                              : "Show password confirmation"
                          }
                        >
                          {showPasswordConfirmation ? "🙈 Hide" : "👁️ Show"}
                        </button>
                      </div>
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
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>

          {/* Sign In Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"
            >
              Sign in here
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
