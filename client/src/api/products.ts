import { api } from "./client";
import type { Product } from "../features/products/types/product";

export interface ProductListResponse {
  items: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductQuery {
  categorySlug?: string;
  categoryId?: string;
  search?: string;
  inStock?: boolean;

  page?: number;
  limit?: number;

  sortBy?: "createdAt" | "price" | "title";
  sortOrder?: "asc" | "desc";
}

export interface ProductPayload {
  title: string;
  description: string;
  price: string;
  stock: number;
  imageUrl?: string | null;
  categoryId: string;
}

const normalizeProductQuery = (query: ProductQuery) => ({
  ...query,
  search: query.search?.trim() || undefined,
  inStock:
    typeof query.inStock === "boolean"
      ? String(query.inStock)
      : undefined,
});

export const productsApi = {
  list: async (query: ProductQuery = {}) => {
    const { data } = await api.get<ProductListResponse>("/products", {
      params: normalizeProductQuery(query),
    });

    return data;
  },
  getBySlug: async (slug: string) => {
    const { data } = await api.get<Product>(`/products/slug/${slug}`);
    return data;
  },
  create: async (payload: ProductPayload) => {
    const { data } = await api.post<Product>("/products", payload);
    return data;
  },
  update: async (productId: string, payload: Partial<ProductPayload>) => {
    const { data } = await api.patch<Product>(`/products/${productId}`, payload);
    return data;
  },
  delete: async (productId: string) => {
    const { data } = await api.delete<{ message: string }>(`/products/${productId}`);
    return data;
  },
};
