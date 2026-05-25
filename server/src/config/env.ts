import "dotenv/config";

const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"] as const;
const defaultDevJwtSecret = "velora-local-dev-secret";

type RequiredEnvVar = (typeof requiredEnvVars)[number];

const normalizeEnvValue = (value: string | undefined) => {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();

  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
};

const isMissing = (value: string | undefined) => normalizeEnvValue(value).length === 0;

export const getNodeEnv = () => process.env.NODE_ENV ?? "development";

export const isDevelopment = () => getNodeEnv() === "development";

export const getMissingEnvVars = () =>
  requiredEnvVars.filter((key) => isMissing(process.env[key]));

export const ensureEnvVars = (...keys: RequiredEnvVar[]) => {
  const missing = keys.filter((key) => isMissing(process.env[key]));

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`,
    );
  }
};

export const hasDatabaseUrl = () => !isMissing(process.env.DATABASE_URL);

export const getJwtSecret = () => {
  if (!isMissing(process.env.JWT_SECRET)) {
    return process.env.JWT_SECRET as string;
  }

  if (isDevelopment()) {
    return defaultDevJwtSecret;
  }

  throw new Error("Missing required environment variable: JWT_SECRET");
};

export const isUsingDefaultJwtSecret = () => isMissing(process.env.JWT_SECRET);
