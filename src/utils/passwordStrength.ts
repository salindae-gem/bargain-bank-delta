/**
 * Password strength utilities
 * Provides functions to calculate and determine password strength levels
 */

export function getPasswordStrength(password: string): number {
    if (!password) return 0;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    return strength;
}

export type PasswordStrengthLevel = "weak" | "medium" | "strong" | null;

export function getPasswordStrengthLevel(
    strength: number
): PasswordStrengthLevel {
    if (strength === 0) return null;
    if (strength === 1) return "weak";
    if (strength === 2) return "medium";
    return "strong";
}

export function getStrengthColor(strength: number): string {
    if (strength === 1) return "bg-orange-600";
    if (strength === 2) return "bg-yellow-600";
    return "bg-primary";
}

export function getStrengthLabel(strength: number): string {
    if (strength === 1) return "Weak";
    if (strength === 2) return "Medium";
    if (strength === 3) return "Strong";
    return "";
}
