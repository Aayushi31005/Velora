import { api } from "./client";

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface CategoryPayload {
  name: string;
}

export const categoriesApi = {
  list: async () => {
    const { data } = await api.get<Category[]>("/categories");
    return data;
  },
  create: async (payload: CategoryPayload) => {
    const { data } = await api.post<Category>("/categories", payload);
    return data;
  },
  update: async (categoryId: string, payload: CategoryPayload) => {
    const { data } = await api.patch<Category>(`/categories/${categoryId}`, payload);
    return data;
  },
  delete: async (categoryId: string) => {
    const { data } = await api.delete<{ message: string }>(`/categories/${categoryId}`);
    return data;
  },
};
