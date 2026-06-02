import { useMemo, useState } from "react";

import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { ProductForm, type ProductFormValues } from "../features/admin/products/components/ProductForm";
import { useCreateProduct } from "../features/admin/products/hooks/useCreateProduct";
import { useDeleteProduct } from "../features/admin/products/hooks/useDeleteProduct";
import { useAdminProducts } from "../features/admin/products/hooks/useAdminProducts";
import { useUpdateProduct } from "../features/admin/products/hooks/useUpdateProduct";
import { AdminSectionHeader } from "../features/admin/shared/components/AdminSectionHeader";
import { useCategories } from "../features/products/hooks/useCategories";
import type { Product } from "../features/products/types/product";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function AdminProductsPage() {
  useDocumentTitle("Admin products");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productsQuery = useAdminProducts();
  const categoriesQuery = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const mutationError = useMemo(() => {
    const error = createProduct.error ?? updateProduct.error ?? deleteProduct.error;
    return error instanceof Error ? error.message : undefined;
  }, [createProduct.error, deleteProduct.error, updateProduct.error]);

  if (productsQuery.isError || categoriesQuery.isError) {
    return (
      <ErrorState
        description="Product management depends on product and category admin APIs plus a configured backend database."
        title="Unable to load admin products"
      />
    );
  }

  const products = productsQuery.data?.items ?? [];
  const categories = categoriesQuery.data ?? [];

  const submitProduct = (values: ProductFormValues) => {
    const payload = {
      ...values,
      price: values.price,
      imageUrl: values.imageUrl?.trim() ? values.imageUrl.trim() : null,
    };

    if (selectedProduct) {
      updateProduct.mutate(
        { productId: selectedProduct.id, payload },
        {
          onSuccess: () => setSelectedProduct(null),
        },
      );
      return;
    }

    createProduct.mutate(payload);
  };

  return (
    <div className="admin-page-grid">
      <section className="panel">
        <AdminSectionHeader
          description="Create new products, edit inventory, and assign categories from one operational surface."
          title="Product management"
        />
        <ProductForm
          categories={categories}
          errorMessage={mutationError}
          isPending={createProduct.isPending || updateProduct.isPending}
          onCancel={() => setSelectedProduct(null)}
          onSubmit={submitProduct}
          product={selectedProduct}
        />
      </section>

      <section className="panel">
        <AdminSectionHeader
          description="Readable operational tables matter more than flashy dashboards here."
          title="Catalog table"
        />
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      {product.imageUrl ? (
                        <img
                          alt={product.title}
                          className="admin-table__thumbnail"
                          src={product.imageUrl}
                        />
                      ) : (
                        <div className="admin-table__thumbnail admin-table__thumbnail--placeholder">
                          {product.title.slice(0, 1).toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td>
                      <strong>{product.title}</strong>
                    </td>
                    <td>{product.category.name}</td>
                    <td>${Number(product.price).toFixed(2)}</td>
                    <td>
                      <span className={product.stock < 5 ? "stock-badge stock-badge--warning" : "stock-badge"}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="button-ghost" onClick={() => setSelectedProduct(product)} type="button">
                          Edit
                        </button>
                        <button
                          className="button-ghost button-ghost--danger"
                          disabled={deleteProduct.isPending}
                          onClick={() => deleteProduct.mutate(product.id)}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <EmptyState
                      description="Create the first product to start operational catalog management."
                      title="No products yet"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
