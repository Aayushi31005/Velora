export interface CartProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface CartItem {
  id: string;
  quantity: number;
  createdAt: string;
  lineTotal: number;
  product: CartProduct;
}

export interface CartSummary {
  subtotal: number;
  itemCount: number;
}

export interface CartResponse {
  items: CartItem[];
  summary: CartSummary;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}
