import { create } from "zustand";

import type { AuthUser } from "../api/auth";

const tokenStorageKey = "velora-auth-token";
const userStorageKey = "velora-auth-user";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setSession: (token: string, user: AuthUser) => void;
  clearSession: () => void;
}

const getStoredUser = () => {
  const raw = localStorage.getItem(userStorageKey);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    localStorage.removeItem(userStorageKey);
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem(tokenStorageKey),
  user: getStoredUser(),
  setSession: (token, user) => {
    localStorage.setItem(tokenStorageKey, token);
    localStorage.setItem(userStorageKey, JSON.stringify(user));
    set({ token, user });
  },
  clearSession: () => {
    localStorage.removeItem(tokenStorageKey);
    localStorage.removeItem(userStorageKey);
    set({ token: null, user: null });
  },
}));
