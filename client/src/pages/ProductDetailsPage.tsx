import { useParams } from "react-router-dom";

import { ErrorState } from "../components/ErrorState";
import { SectionHeading } from "../components/SectionHeading";
import { AddToCartButton } from "../features/cart/components/AddToCartButton";
import { useProduct } from "../features/products/hooks/useProduct";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function ProductDetailsPage() {
  const { slug = "" } = useParams();
  const productQuery = useProduct(slug);

  useDocumentTitle(slug ? `Product ${slug}` : "Product");

  if (productQuery.isPending) {
    return <div className="panel">Loading product details...</div>;
  }

  if (productQuery.isError || !productQuery.data) {
    return (
      <ErrorState
        description="This route is wired and ready for backend-generated product slugs."
        title="Product not available"
      />
    );
  }

  const product = productQuery.data;

  return (
    <section className="panel stack">
      <SectionHeading eyebrow={product.category.name} title={product.title}>
        {product.description}
      </SectionHeading>
      <div className="detail-grid">
        <div>
          <span className="metric-label">Price</span>
          <strong className="metric-value">${Number(product.price).toFixed(2)}</strong>
        </div>
        <div>
          <span className="metric-label">Stock</span>
          <strong className="metric-value">{product.stock}</strong>
        </div>
        <div>
          <span className="metric-label">Slug</span>
          <strong className="metric-value">{product.slug}</strong>
        </div>
      </div>
      <div className="detail-actions">
        <AddToCartButton product={product} />
      </div>
    </section>
  );
}
