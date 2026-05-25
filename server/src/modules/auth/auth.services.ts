import bcrypt from "bcrypt";
import { hasDatabaseUrl } from "../../config/env";
import { prisma } from "../../config/prisma";
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
  if (!hasDatabaseUrl()) {
    const existingDevUser = await findDevUserByEmail(email);

    if (existingDevUser) {
      throw new Error("Email already exists");
    }

    const user = await createDevUser(name, email, password);
    const token = generateToken(user.id, user.role);

    return {
      token,
      user: toPublicAuthUser(user),
      mode: "memory",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
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
  if (!hasDatabaseUrl()) {
    const user = await findDevUserByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user.id, user.role);

    return {
      token,
      user: toPublicAuthUser(user),
      mode: "memory",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
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
