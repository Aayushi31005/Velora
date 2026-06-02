import { useEffect } from "react";

import { authApi } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export function AuthBootstrap() {
  const token = useAuthStore((state) => state.token);
  const clearSession = useAuthStore((state) => state.clearSession);

  useEffect(() => {
    if (!token) {
      return;
    }

    authApi.me().catch(() => {
      clearSession();
    });
  }, [clearSession, token]);

  return null;
}
