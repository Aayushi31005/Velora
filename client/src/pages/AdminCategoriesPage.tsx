import { useMemo, useState } from "react";

import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { CategoryForm, type CategoryFormValues } from "../features/admin/categories/components/CategoryForm";
import { useAdminCategories } from "../features/admin/categories/hooks/useAdminCategories";
import { useCreateCategory } from "../features/admin/categories/hooks/useCreateCategory";
import { useDeleteCategory } from "../features/admin/categories/hooks/useDeleteCategory";
import { useUpdateCategory } from "../features/admin/categories/hooks/useUpdateCategory";
import { AdminSectionHeader } from "../features/admin/shared/components/AdminSectionHeader";
import type { Category } from "../api/categories";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function AdminCategoriesPage() {
  useDocumentTitle("Admin categories");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categoriesQuery = useAdminCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const mutationError = useMemo(() => {
    const error = createCategory.error ?? updateCategory.error ?? deleteCategory.error;
    return error instanceof Error ? error.message : undefined;
  }, [createCategory.error, deleteCategory.error, updateCategory.error]);

  if (categoriesQuery.isError) {
    return (
      <ErrorState
        description="Category management depends on protected admin CRUD APIs and a configured database."
        title="Unable to load categories"
      />
    );
  }

  const categories = categoriesQuery.data ?? [];

  const submitCategory = (values: CategoryFormValues) => {
    if (selectedCategory) {
      updateCategory.mutate(
        { categoryId: selectedCategory.id, payload: values },
        {
          onSuccess: () => setSelectedCategory(null),
        },
      );
      return;
    }

    createCategory.mutate(values);
  };

  return (
    <div className="admin-page-grid">
      <section className="panel">
        <AdminSectionHeader
          description="Categories are operational domain objects now, not just a background lookup table."
          title="Category management"
        />
        <CategoryForm
          category={selectedCategory}
          errorMessage={mutationError}
          isPending={createCategory.isPending || updateCategory.isPending}
          onCancel={() => setSelectedCategory(null)}
          onSubmit={submitCategory}
        />
      </section>
      <section className="panel">
        <AdminSectionHeader
          description="Deletion is blocked when products still belong to a category to avoid orphaned catalog data."
          title="Existing categories"
        />
        <div className="admin-list">
          {categories.length > 0 ? (
            categories.map((category) => (
              <article key={category.id} className="admin-list-item">
                <div>
                  <strong>{category.name}</strong>
                  <p>{category.slug}</p>
                </div>
                <div className="admin-table__actions">
                  <button className="button-ghost" onClick={() => setSelectedCategory(category)} type="button">
                    Rename
                  </button>
                  <button
                    className="button-ghost button-ghost--danger"
                    disabled={deleteCategory.isPending}
                    onClick={() => deleteCategory.mutate(category.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          ) : (
            <EmptyState
              description="Create categories here so storefront filters and product assignments stay organized."
              title="No categories yet"
            />
          )}
        </div>
      </section>
    </div>
  );
}
