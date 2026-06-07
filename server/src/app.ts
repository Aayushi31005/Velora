import cors from "cors";
import express from "express";

import { getMissingEnvVars, hasDatabaseUrl, isUsingDefaultJwtSecret } from "./config/env";
import { prisma } from "./config/prisma";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";
import authRouter from "./modules/auth/auth.routes";
import adminRouter from "./modules/admin/admin.routes";
import categoryRouter from "./modules/categories/category.routes";
import cartRouter from "./modules/cart/cart.routes";
import ordersRouter from "./modules/orders/orders.routes";
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
      admin: {
        analytics: {
          method: "GET",
          path: "/api/admin/analytics",
          headers: {
            Authorization: "Bearer <admin-token>",
          },
        },
      },
      categories: {
        list: {
          method: "GET",
          path: "/api/categories",
        },
        create: {
          method: "POST",
          path: "/api/categories",
          headers: {
            Authorization: "Bearer <admin-token>",
          },
          body: {
            name: "string",
          },
        },
        update: {
          method: "PATCH",
          path: "/api/categories/:categoryId",
          headers: {
            Authorization: "Bearer <admin-token>",
          },
          body: {
            name: "string",
          },
        },
        delete: {
          method: "DELETE",
          path: "/api/categories/:categoryId",
          headers: {
            Authorization: "Bearer <admin-token>",
          },
        },
      },
      cart: {
        get: {
          method: "GET",
          path: "/api/cart",
          headers: {
            Authorization: "Bearer <token>",
          },
        },
        add: {
          method: "POST",
          path: "/api/cart",
          headers: {
            Authorization: "Bearer <token>",
          },
          body: {
            productId: "string",
            quantity: 1,
          },
        },
        update: {
          method: "PATCH",
          path: "/api/cart/:cartItemId",
          headers: {
            Authorization: "Bearer <token>",
          },
          body: {
            quantity: 2,
          },
        },
        remove: {
          method: "DELETE",
          path: "/api/cart/:cartItemId",
          headers: {
            Authorization: "Bearer <token>",
          },
        },
      },
      orders: {
        checkout: {
          method: "POST",
          path: "/api/orders/checkout",
          headers: {
            Authorization: "Bearer <token>",
          },
        },
        list: {
          method: "GET",
          path: "/api/orders",
          headers: {
            Authorization: "Bearer <token>",
          },
        },
        detail: {
          method: "GET",
          path: "/api/orders/:orderId",
          headers: {
            Authorization: "Bearer <token>",
          },
        },
        adminList: {
          method: "GET",
          path: "/api/orders/admin/all",
          headers: {
            Authorization: "Bearer <admin-token>",
          },
        },
        updateStatus: {
          method: "PATCH",
          path: "/api/orders/:orderId/status",
          headers: {
            Authorization: "Bearer <admin-token>",
          },
          body: {
            status: "SHIPPED",
          },
        },
      },
      products: {
        list: {
          method: "GET",
          path: "/api/products",
        },
        create: {
          method: "POST",
          path: "/api/products",
          headers: {
            Authorization: "Bearer <admin-token>",
          },
        },
      },
    },
  });
});

app.get("/debug-db", async (_req, res) => {
  const count = await prisma.product.count();

  res.json({
    count,
  });
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/products", productRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
