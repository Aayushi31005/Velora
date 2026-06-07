import { NavLink, Outlet } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";

import { BrandMark } from "../components/BrandMark";
import { CartDrawer } from "../features/cart/components/CartDrawer";
import { useCart } from "../features/cart/hooks/useCart";
import { useCartUiStore } from "../features/cart/store/cartUiStore";
import { useAuthStore } from "../store/authStore";

const navItems = [
  { to: "/", label: "Overview" },
  { to: "/products", label: "Products" },
  { to: "/orders", label: "Orders" },
  { to: "/admin", label: "Admin" },
];

export function MainLayout() {
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const openCart = useCartUiStore((state) => state.openCart);
  const { data: cart } = useCart();

  return (
    <div className="shell shell--main">
      <header className="site-header">
        <BrandMark />
        <nav className="site-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }: NavLinkRenderProps) =>
                isActive ? "site-nav__link is-active" : "site-nav__link"
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__actions">
          <button className="button-ghost" onClick={openCart} type="button">
            Cart {cart && cart.summary.itemCount > 0 ? `(${cart.summary.itemCount})` : ""}
          </button>
          {user ? (
            <>
              <span className="user-pill">{user.role.toLowerCase()}</span>
              <button className="button-ghost" onClick={clearSession} type="button">
                Sign out
              </button>
            </>
          ) : (
            <NavLink className="button-ghost" to="/login">
              Sign in
            </NavLink>
          )}
        </div>
      </header>
      <main className="page-content">
        <Outlet />
      </main>
      <CartDrawer />
    </div>
  );
}
