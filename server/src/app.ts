import cors from "cors";
import express from "express";

import { getMissingEnvVars, hasDatabaseUrl, isUsingDefaultJwtSecret } from "./config/env";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";
import authRouter from "./modules/auth/auth.routes";
import productRouter from "./modules/products/product.routes";
import { buildApiDocsPage } from "./utils/apiDocs";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.type("html").send(buildApiDocsPage());
});

app.get("/api", (_req, res) => {
  const missingEnvVars = getMissingEnvVars();

  res.json({
    message: "Velora server is running",
    configuration: {
      ready: true,
      authMode: hasDatabaseUrl() ? "database" : "memory",
      jwtMode: isUsingDefaultJwtSecret() ? "default-dev-secret" : "env-secret",
      missingEnvVars,
    },
    endpoints: {
      auth: {
        register: {
          method: "POST",
          path: "/api/auth/register",
          body: {
            name: "string",
            email: "string",
            password: "string",
          },
        },
        login: {
          method: "POST",
          path: "/api/auth/login",
          body: {
            email: "string",
            password: "string",
          },
        },
        me: {
          method: "GET",
          path: "/api/auth/me",
          headers: {
            Authorization: "Bearer <token>",
          },
        },
      },
      products: {
        list: {
          method: "GET",
          path: "/api/products",
        },
      },
    },
  });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
