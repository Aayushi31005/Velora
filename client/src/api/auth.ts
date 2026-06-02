import { api } from "./client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
  mode?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

export interface MeResponse {
  user: {
    userId: string;
    role: "CUSTOMER" | "ADMIN";
    iat: number;
    exp: number;
  };
}

export const authApi = {
  register: async (payload: RegisterPayload) => {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
  },
  login: async (payload: LoginPayload) => {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  },
  me: async () => {
    const { data } = await api.get<MeResponse>("/auth/me");
    return data;
  },
};
