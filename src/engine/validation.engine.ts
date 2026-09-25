/* ABIHANI — Validation rules
 * Pure logic. No UI. No network. No side effects. */

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 5) return false;
  if (trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function isValidOtp(value: string): boolean {
  return /^\d{6}$/.test(value.trim());
}

export function isValidRecoveryCode(value: string): boolean {
  return /^\d{8}$/.test(value.replace(/\s+/g, ''));
}

export function isValidAccountNumber(value: string): boolean {
  return /^\d{10}$/.test(value.trim());
}

export function isValidBio(value: string, maxChars: number): boolean {
  return value.trim().length <= maxChars;
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function generateRecoveryCode(): string {
  return String(Math.floor(10000000 + Math.random() * 90000000));
}

export function formatRecoveryCode(code: string): string {
  const digits = code.replace(/\s+/g, '');
  if (digits.length !== 8) return code;
  return `${digits.slice(0, 4)} ${digits.slice(4)}`;
}