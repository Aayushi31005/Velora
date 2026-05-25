import bcrypt from "bcrypt";
import { hasDatabaseUrl, isDevelopment } from "../../config/env";
import { prisma } from "../../config/prisma";
import { HttpError } from "../../middleware/error.middleware";
import { generateToken } from "../../utils/generateToken";
import {
  createDevUser,
  findDevUserByEmail,
  toPublicAuthUser,
} from "./auth.store";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  if (!hasDatabaseUrl() && isDevelopment()) {
    const existingDevUser = await findDevUserByEmail(email);

    if (existingDevUser) {
      throw new HttpError(409, "Email already exists");
    }

    const user = await createDevUser(name, email, password);
    const token = generateToken(user.id, user.role);

    return {
      token,
      user: toPublicAuthUser(user),
      mode: "memory",
    };
  }

  if (!hasDatabaseUrl()) {
    throw new HttpError(500, "Missing required environment variable: DATABASE_URL");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new HttpError(409, "Email already exists");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
    },
  });

  const token = generateToken(user.id, user.role);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    mode: "database",
  };
};

export const loginUser = async (
  email: string,
  password: string
) => {
  if (!hasDatabaseUrl() && isDevelopment()) {
    const user = await findDevUserByEmail(email);

    if (!user) {
      throw new HttpError(401, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new HttpError(401, "Invalid credentials");
    }

    const token = generateToken(user.id, user.role);

    return {
      token,
      user: toPublicAuthUser(user),
      mode: "memory",
    };
  }

  if (!hasDatabaseUrl()) {
    throw new HttpError(500, "Missing required environment variable: DATABASE_URL");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new HttpError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new HttpError(401, "Invalid credentials");
  }

  const token = generateToken(user.id, user.role);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    mode: "database",
  };
};
