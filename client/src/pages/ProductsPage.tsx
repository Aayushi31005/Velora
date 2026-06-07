import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { SectionHeading } from "../components/SectionHeading";
import { ProductGrid } from "../features/products/components/ProductGrid";
import { useCategories } from "../features/products/hooks/useCategories";
import { useProducts } from "../features/products/hooks/useProducts";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function ProductsPage() {
  useDocumentTitle("Products");

  const [searchParams, setSearchParams] =
    useSearchParams();
  const search = searchParams.get("search") ?? "";
  const selectedCategory =
    searchParams.get("category") ??
    searchParams.get("categorySlug") ??
    undefined;
  const sortByParam = searchParams.get("sortBy");
  const sortBy =
    sortByParam === "price" || sortByParam === "title"
      ? sortByParam
      : "createdAt";
  const sortOrder =
    sortBy === "createdAt" ? "desc" : "asc";

  const updateSearchParams = (
    updates: Record<string, string | undefined>
  ) => {
    const nextParams = new URLSearchParams(
      searchParams
    );

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        nextParams.set(key, value);
        return;
      }

      nextParams.delete(key);
    });

    setSearchParams(nextParams);
  };

  const productsQuery = useProducts({
    categorySlug: selectedCategory,
    search: search || undefined,
    sortBy,
    sortOrder,
    limit: 12,
  });

  const categoriesQuery = useCategories();

  const categories = useMemo(
    () => categoriesQuery.data ?? [],
    [categoriesQuery.data]
  );

  return (
    <div className="stack">
      <section className="panel">
        <SectionHeading
          eyebrow="Catalog"
          title="Discover Products"
        >
          Browse products using search, category filters,
          and sorting.
        </SectionHeading>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "1rem",
          }}
        >
          <input
            value={search}
            onChange={(e) =>
              updateSearchParams({
                search: e.target.value || undefined,
              })
            }
            placeholder="Search by product name..."
            className="input"
          />

          <select
            value={sortBy}
            onChange={(e) =>
              updateSearchParams({
                sortBy: e.target.value,
              })
            }
          >
            <option value="createdAt">Newest</option>
            <option value="price">Price</option>
            <option value="title">Name</option>
          </select>
        </div>

        <div className="filter-row">
          <button
            className={
              !selectedCategory
                ? "filter-chip is-active"
                : "filter-chip"
            }
            onClick={() =>
              updateSearchParams({
                category: undefined,
                categorySlug: undefined,
              })
            }
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              className={
                selectedCategory === category.slug
                  ? "filter-chip is-active"
                  : "filter-chip"
              }
              onClick={() =>
                updateSearchParams({
                  category: category.slug,
                  categorySlug: undefined,
                })
              }
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {productsQuery.isPending && (
        <div className="panel">
          Loading products...
        </div>
      )}

      {productsQuery.isError && (
        <ErrorState
          title="Failed to load products"
          description="Please try again later."
        />
      )}

      {productsQuery.data?.items.length ? (
        <ProductGrid
          products={productsQuery.data.items}
        />
      ) : null}

      {productsQuery.data &&
      productsQuery.data.items.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try changing your filters."
        />
      ) : null}
    </div>
  );
}
