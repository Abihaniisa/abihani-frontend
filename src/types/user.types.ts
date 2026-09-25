export type UserRole = 'user' | 'admin';

export type User = {
  id: string;
  email: string;
  handle: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string;
  country: 'NG';
  state: string | null;
  city: string | null;
  role: UserRole;
  canBuy: boolean;
  canSell: boolean;
  verified: boolean;
  coverUrl: string | null;
  createdAt: number;
};

export type Session = {
  token: string;
  user: User;
};

export type DeviceAccount = {
  email: string;
  addedAt: number;
};