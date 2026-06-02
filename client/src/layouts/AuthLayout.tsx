import { NavLink, Outlet } from "react-router-dom";

import { BrandMark } from "../components/BrandMark";

export function AuthLayout() {
  return (
    <div className="shell shell--auth">
      <div className="auth-layout">
        <aside className="auth-layout__panel">
          <BrandMark />
          <h1>Secure customer access for storefront and admin flows.</h1>
          <p>
            This foundation mirrors the backend module structure so auth, products, cart, and admin
            features can grow without route chaos.
          </p>
          <div className="auth-layout__links">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        </aside>
        <section className="auth-layout__content">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
