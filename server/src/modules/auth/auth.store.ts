import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

type UserRole = "CUSTOMER" | "ADMIN";

export interface StoredAuthUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicAuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const devUsers: StoredAuthUser[] = [];

export const toPublicAuthUser = (user: StoredAuthUser): PublicAuthUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const findDevUserByEmail = async (email: string) =>
  devUsers.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;

export const createDevUser = async (
  name: string,
  email: string,
  password: string,
  role: UserRole = "CUSTOMER",
) => {
  const now = new Date();
  const user: StoredAuthUser = {
    id: randomUUID(),
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
    role,
    createdAt: now,
    updatedAt: now,
  };

  devUsers.push(user);

  return user;
};
