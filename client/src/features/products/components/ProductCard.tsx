import { Link } from "react-router-dom";

import { AddToCartButton } from "../../cart/components/AddToCartButton";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.title}
          className="product-card__image"
        />
      )}

      <div className="product-card__meta">
        <span>{product.category.name}</span>
        <span>{product.stock > 0 ? "In stock" : "Out of stock"}</span>
      </div>

      <h3>{product.title}</h3>

      <p className="product-card__description">
        {product.description}
      </p>

      <div className="product-card__footer">
        <strong>${Number(product.price).toFixed(2)}</strong>

        <div className="product-card__cta">
          <AddToCartButton product={product} />

          <Link to={`/products/${product.slug}`}>
            View product
          </Link>
        </div>
      </div>
    </article>
  );
}