import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Category } from "../../../../api/categories";

const categorySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category?: Category | null;
  errorMessage?: string;
  isPending?: boolean;
  onCancel?: () => void;
  onSubmit: (values: CategoryFormValues) => void;
}

export function CategoryForm({
  category,
  errorMessage,
  isPending,
  onCancel,
  onSubmit,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
    },
  });

  useEffect(() => {
    reset({
      name: category?.name ?? "",
    });
  }, [category, reset]);

  return (
    <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>Name</span>
        <input placeholder="Accessories" {...register("name")} />
        <small>{errors.name?.message}</small>
      </label>
      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
      <div className="admin-form__actions">
        <button className="button-primary" disabled={isPending} type="submit">
          {isPending ? "Saving..." : category ? "Update category" : "Create category"}
        </button>
        {category && onCancel ? (
          <button className="button-ghost" onClick={onCancel} type="button">
            Cancel edit
          </button>
        ) : null}
      </div>
    </form>
  );
}
