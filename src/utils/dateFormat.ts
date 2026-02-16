/**
 * Date formatting utilities
 * Provides consistent date formatting across the app
 */

export function formatDate(
    date: string | Date,
    locale = "en-US"
): string {
    return new Date(date).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function formatDateTime(
    date: string | Date,
    locale = "en-US"
): string {
    return new Date(date).toLocaleString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
