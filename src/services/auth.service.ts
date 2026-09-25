import type { User } from '../types/user.types';
import { generateRecoveryCode } from '../engine/validation.engine';

/* ABIHANI — Auth service
 * Stage 3 runs on mock data. No network. No Supabase.
 * Later, only this file changes to become real. */

type MockAccount = {
  email: string;
  recoveryCode: string;
  createdAt: number;
};

const ACCOUNTS_KEY = 'abihani.mock.accounts';
const SESSION_KEY = 'abihani.mock.session';

function loadAccounts(): MockAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as MockAccount[]) : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: MockAccount[]): void {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // Storage may be blocked. Silent.
  }
}

function makeUserFromEmail(email: string): User {
  const handle = '@' + email.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase();
  return {
    id: `u_${Math.random().toString(36).slice(2, 10)}`,
    email,
    handle,
    displayName: handle.replace('@', ''),
    avatarUrl: null,
    bio: '',
    country: 'NG',
    state: null,
    city: null,
    role: 'user',
    canBuy: true,
    canSell: false,
    verified: false,
    coverUrl: null,
    createdAt: Date.now(),
  };
}

export async function requestOtp(email: string): Promise<void> {
  // Mock: pretend we sent an email. Wait 800ms to feel real.
  await new Promise((r) => setTimeout(r, 800));
  const accounts = loadAccounts();
  if (!accounts.find((a) => a.email === email)) {
    accounts.push({
      email,
      recoveryCode: generateRecoveryCode(),
      createdAt: Date.now(),
    });
    saveAccounts(accounts);
  }
}

export async function verifyOtp(email: string, code: string): Promise<User | null> {
  await new Promise((r) => setTimeout(r, 500));
  if (!/^\d{6}$/.test(code)) return null;
  // Mock: any 6 digits pass.
  return makeUserFromEmail(email);
}

export async function getRecoveryCode(email: string): Promise<string | null> {
  const accounts = loadAccounts();
  const found = accounts.find((a) => a.email === email);
  return found ? found.recoveryCode : null;
}

export function saveSession(user: User): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    // Silent.
  }
}

export function loadSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Silent.
  }
}

export function forgetAccount(email: string): void {
  const accounts = loadAccounts().filter((a) => a.email !== email);
  saveAccounts(accounts);
}