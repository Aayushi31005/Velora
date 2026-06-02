import { useMemo, useState } from "react";

import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { SectionHeading } from "../components/SectionHeading";
import { ProductGrid } from "../features/products/components/ProductGrid";
import { useCategories } from "../features/products/hooks/useCategories";
import { useProducts } from "../features/products/hooks/useProducts";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  useDocumentTitle("Products");

  const productsQuery = useProducts({
    categorySlug: selectedCategory,
    limit: 12,
  });
  const categoriesQuery = useCategories();

  const categories = useMemo(() => categoriesQuery.data ?? [], [categoriesQuery.data]);

  return (
    <div className="stack">
      <section className="panel">
        <SectionHeading eyebrow="Catalog" title="Product discovery">
          Products are fetched through a shared API client and React Query hooks inside the products
          feature module.
        </SectionHeading>

        <div className="filter-row">
          <button
            className={!selectedCategory ? "filter-chip is-active" : "filter-chip"}
            onClick={() => setSelectedCategory(undefined)}
            type="button"
          >
            All categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={selectedCategory === category.slug ? "filter-chip is-active" : "filter-chip"}
              onClick={() => setSelectedCategory(category.slug)}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {productsQuery.isPending ? <div className="panel">Loading products...</div> : null}

      {productsQuery.isError ? (
        <ErrorState
          description="The backend product catalog is not returning data yet. Once DATABASE_URL is configured, this page will populate automatically."
          title="Product query failed"
        />
      ) : null}

      {productsQuery.data && productsQuery.data.items.length > 0 ? (
        <ProductGrid products={productsQuery.data.items} />
      ) : null}

      {productsQuery.data && productsQuery.data.items.length === 0 ? (
        <EmptyState
          description="Your frontend scaffolding is ready. Seed the backend catalog next to make this grid come alive."
          title="No products yet"
        />
      ) : null}
    </div>
  );
}
