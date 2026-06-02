import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Category } from "../../../../api/categories";
import type { Product } from "../../../products/types/product";

const productSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  price: z.string().trim().min(1, "Price is required"),
  stock: z.number().int().nonnegative(),
  imageUrl: z.string().trim().optional(),
  categoryId: z.string().min(1, "Select a category"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  categories: Category[];
  errorMessage?: string;
  isPending?: boolean;
  onCancel?: () => void;
  onSubmit: (values: ProductFormValues) => void;
  product?: Product | null;
}

export function ProductForm({
  categories,
  errorMessage,
  isPending,
  onCancel,
  onSubmit,
  product,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title ?? "",
      description: product?.description ?? "",
      price: product?.price ? String(product.price) : "",
      stock: product?.stock ?? 0,
      imageUrl: product?.imageUrl ?? "",
      categoryId: product?.categoryId ?? "",
    },
  });

  useEffect(() => {
    reset({
      title: product?.title ?? "",
      description: product?.description ?? "",
      price: product?.price ? String(product.price) : "",
      stock: product?.stock ?? 0,
      imageUrl: product?.imageUrl ?? "",
      categoryId: product?.categoryId ?? "",
    });
  }, [product, reset]);

  return (
    <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>Title</span>
        <input placeholder="Trail running shoes" {...register("title")} />
        <small>{errors.title?.message}</small>
      </label>
      <label>
        <span>Description</span>
        <textarea placeholder="Describe the product clearly" rows={4} {...register("description")} />
        <small>{errors.description?.message}</small>
      </label>
      <div className="admin-form__grid">
        <label>
          <span>Price</span>
          <input placeholder="4999" {...register("price")} />
          <small>{errors.price?.message}</small>
        </label>
        <label>
          <span>Stock</span>
          <input type="number" {...register("stock", { valueAsNumber: true })} />
          <small>{errors.stock?.message}</small>
        </label>
      </div>
      <label>
        <span>Category</span>
        <select {...register("categoryId")}>
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <small>{errors.categoryId?.message}</small>
      </label>
      <label>
        <span>Image URL</span>
        <input placeholder="https://example.com/product.jpg" {...register("imageUrl")} />
        <small>{errors.imageUrl?.message}</small>
      </label>
      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
      <div className="admin-form__actions">
        <button className="button-primary" disabled={isPending} type="submit">
          {isPending ? "Saving..." : product ? "Update product" : "Create product"}
        </button>
        {product && onCancel ? (
          <button className="button-ghost" onClick={onCancel} type="button">
            Cancel edit
          </button>
        ) : null}
      </div>
    </form>
  );
}
