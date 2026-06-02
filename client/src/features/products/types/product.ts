export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string | null;
  categoryId: string;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
}
