import { create } from 'zustand';
import type { User, DeviceAccount } from '../types/user.types';
import {
  requestOtp as serviceRequestOtp,
  verifyOtp as serviceVerifyOtp,
  getRecoveryCode as serviceGetRecoveryCode,
  saveSession,
  loadSession,
  clearSession,
} from '../services/auth.service';

type Pending = {
  email: string;
} | null;

type AuthState = {
  user: User | null;
  pending: Pending;
  deviceAccounts: DeviceAccount[];
  recoveryCode: string | null;

  startSignup: (email: string) => Promise<void>;
  verify: (code: string) => Promise<boolean>;
  finishSignup: () => void;
  logout: () => void;
  setRecoveryCode: (code: string) => void;
};

const DEVICE_KEY = 'abihani.mock.device.accounts';

function loadDeviceAccounts(): DeviceAccount[] {
  try {
    const raw = localStorage.getItem(DEVICE_KEY);
    return raw ? (JSON.parse(raw) as DeviceAccount[]) : [];
  } catch {
    return [];
  }
}

function saveDeviceAccounts(list: DeviceAccount[]): void {
  try {
    localStorage.setItem(DEVICE_KEY, JSON.stringify(list));
  } catch {
    // Silent.
  }
}

export const useAuth = create<AuthState>((set, get) => ({
  user: loadSession(),
  pending: null,
  deviceAccounts: loadDeviceAccounts(),
  recoveryCode: null,

  startSignup: async (email) => {
    await serviceRequestOtp(email);
    set({ pending: { email } });
  },

  verify: async (code) => {
    const pending = get().pending;
    if (!pending) return false;
    const user = await serviceVerifyOtp(pending.email, code);
    if (!user) return false;

    const recovery = await serviceGetRecoveryCode(pending.email);
    set({ user, recoveryCode: recovery });

    const existing = get().deviceAccounts.filter((a) => a.email !== pending.email);
    const updated = [...existing, { email: pending.email, addedAt: Date.now() }];
    saveDeviceAccounts(updated);
    set({ deviceAccounts: updated });

    return true;
  },

  finishSignup: () => {
    const user = get().user;
    if (!user) return;
    saveSession(user);
    set({ pending: null });
  },

  logout: () => {
    clearSession();
    saveDeviceAccounts([]);
    set({ user: null, pending: null, deviceAccounts: [], recoveryCode: null });
  },

  setRecoveryCode: (code) => set({ recoveryCode: code }),
}));