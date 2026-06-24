import { useSyncExternalStore } from "react";

export type Role = "ADMIN" | "VENDOR";

export interface AuthUser {
  email: string;
  name: string;
  role: Role;
}

const KEY = "kumbh.auth";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function read(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function signIn(email: string, password: string): AuthUser | null {
  if (typeof window === "undefined") return null;
  let user: AuthUser | null = null;
  if (email.trim().toLowerCase() === "admin@kumbhmela.com" && password === "Admin@123") {
    user = { email: "admin@kumbhmela.com", name: "Admin", role: "ADMIN" };
  } else if (email.trim().length > 0 && password.length > 0) {
    user = { email: email.trim(), name: "Ravi Kumar", role: "VENDOR" };
  }
  if (user) {
    window.localStorage.setItem(KEY, JSON.stringify(user));
    emit();
  }
  return user;
}

export function signOut() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  emit();
}

export function useAuth(): AuthUser | null {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      const onStorage = () => cb();
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    read,
    () => null,
  );
}