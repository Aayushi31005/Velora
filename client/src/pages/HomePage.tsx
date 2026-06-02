import { Link } from "react-router-dom";

import { SectionHeading } from "../components/SectionHeading";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const routes = [
  "/products",
  "/products/:slug",
  "/cart",
  "/checkout",
  "/orders",
  "/login",
  "/register",
  "/admin",
];

const modules = [
  "features/auth",
  "features/products",
  "store",
  "routes",
  "layouts",
  "api",
];

export function HomePage() {
  useDocumentTitle("Frontend architecture");

  return (
    <div className="stack">
      <section className="hero-panel">
        <div>
          <span className="section-heading__eyebrow">Frontend foundation</span>
          <h1>Feature-based React structure for the Velora storefront.</h1>
          <p>
            The frontend now mirrors your backend philosophy: shared infrastructure in small global
            folders, domain logic inside feature modules, and routes layered with auth guards.
          </p>
        </div>
        <div className="hero-panel__actions">
          <Link className="button-primary" to="/products">
            Explore products
          </Link>
          <Link className="button-ghost" to="/login">
            Test auth flow
          </Link>
        </div>
      </section>

      <section className="info-grid">
        <div className="panel">
          <SectionHeading eyebrow="Routes" title="Planned route map">
            Central route definitions are ready for public, protected, and admin-only pages.
          </SectionHeading>
          <ul className="list-grid">
            {routes.map((route) => (
              <li key={route}>
                <code>{route}</code>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <SectionHeading eyebrow="Modules" title="Feature-first organization">
            These folders now hold the fastest-growing domain code instead of scattering logic
            across global buckets.
          </SectionHeading>
          <ul className="list-grid">
            {modules.map((moduleName) => (
              <li key={moduleName}>
                <code>{moduleName}</code>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
