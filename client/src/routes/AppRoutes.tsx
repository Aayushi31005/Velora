import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AdminLayout } from "../layouts/AdminLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { MainLayout } from "../layouts/MainLayout";
import { AdminRoute } from "./AdminRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminPage } from "../pages/AdminPage";
import { AdminAnalyticsPage } from "../pages/AdminAnalyticsPage";
import { AdminCategoriesPage } from "../pages/AdminCategoriesPage";
import { AdminOrdersPage } from "../pages/AdminOrdersPage";
import { AdminProductsPage } from "../pages/AdminProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { OrderDetailsPage } from "../pages/OrderDetailsPage";
import { OrderSuccessPage } from "../pages/OrderSuccessPage";
import { OrdersPage } from "../pages/OrdersPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { ProductsPage } from "../pages/ProductsPage";
import { RegisterPage } from "../pages/RegisterPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductDetailsPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:orderId" element={<OrderDetailsPage />} />
            <Route path="orders/:orderId/success" element={<OrderSuccessPage />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="admin" element={<AdminPage />} />
              <Route path="admin/products" element={<AdminProductsPage />} />
              <Route path="admin/categories" element={<AdminCategoriesPage />} />
              <Route path="admin/orders" element={<AdminOrdersPage />} />
              <Route path="admin/analytics" element={<AdminAnalyticsPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
        <Route path="home" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
