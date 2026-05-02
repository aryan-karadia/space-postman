/**
 * ─── Constants ───────────────────────────────────────────────────
 * Global constants used throughout the application.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
export const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || 'http://localhost:3000';

export const CHAR_LIMITS = {
  sender: 50,
  recipient: 50,
  subject: 100,
  body: 5000,
} as const;

export const LETTER_EXPIRY_DAYS = 30;
