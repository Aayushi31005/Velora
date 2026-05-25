import "dotenv/config";

const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"] as const;
const defaultDevJwtSecret = "velora-local-dev-secret";

type RequiredEnvVar = (typeof requiredEnvVars)[number];

const isMissing = (value: string | undefined) => !value || value.trim().length === 0;

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

  return defaultDevJwtSecret;
};

export const isUsingDefaultJwtSecret = () => isMissing(process.env.JWT_SECRET);
