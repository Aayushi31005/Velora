import { NavLink, Outlet } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";

const adminNavItems = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/analytics", label: "Analytics" },
];

export function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <span className="section-heading__eyebrow">Internal tooling</span>
          <h1>Velora Admin</h1>
          <p>Operational workflows, inventory visibility, and protected management surfaces.</p>
        </div>
        <nav className="admin-sidebar__nav">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }: NavLinkRenderProps) =>
                isActive ? "admin-sidebar__link is-active" : "admin-sidebar__link"
              }
              end={item.to === "/admin"}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <section className="admin-content">
        <Outlet />
      </section>
    </div>
  );
}
