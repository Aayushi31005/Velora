import jwt from "jsonwebtoken";
import { getJwtSecret } from "../config/env";

export const generateToken = (
  userId: string,
  role: string
) => {
  return jwt.sign(
    { userId, role },
    getJwtSecret(),
    { expiresIn: "7d" }
  );
};
