import { Link } from "react-router-dom";

import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { ProductGrid } from "../features/products/components/ProductGrid";
import { useProducts } from "../features/products/hooks/useProducts";
import { useCategories } from "../features/products/hooks/useCategories";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle("Velora");

  const productsQuery = useProducts({
    limit: 8,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const categoriesQuery = useCategories();

  return (
    <div className="stack">
      <section className="hero-panel">
        <div>
          <span className="section-heading__eyebrow">
            Modern Shopping Experience
          </span>

          <h1>
            Discover premium products built for
            everyday life.
          </h1>

          <p>
            Explore curated products, seamless
            shopping, and a modern commerce
            experience.
          </p>
        </div>

        <div className="hero-panel__actions">
          <Link
            className="button-primary"
            to="/products"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="panel">
        <h2>Categories</h2>

        <div className="filter-row">
          {categoriesQuery.data?.map((category) => (
            <Link
              key={category.id}
              className="filter-chip"
              to={`/products?category=${category.slug}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>Featured Products</h2>

        {productsQuery.isPending ? (
          <div className="panel">
            Loading products...
          </div>
        ) : null}

        {productsQuery.isError ? (
          <ErrorState
            title="Unable to load featured products"
            description="Refresh the page and try again."
          />
        ) : null}

        {productsQuery.data?.items.length ? (
          <ProductGrid
            products={productsQuery.data.items}
          />
        ) : null}

        {productsQuery.data &&
        productsQuery.data.items.length === 0 ? (
          <EmptyState
            title="No featured products yet"
            description="Add products to the catalog to feature them here."
          />
        ) : null}
      </section>

      <section className="panel">
        <h2>Ready to discover more?</h2>

        <p>
          Browse our complete catalog and find your
          next favorite product.
        </p>

        <Link
          className="button-primary"
          to="/products"
        >
          Browse Catalog
        </Link>
      </section>
    </div>
  );
}
