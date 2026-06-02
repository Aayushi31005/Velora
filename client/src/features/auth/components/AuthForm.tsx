import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (values: LoginValues | RegisterValues) => void;
  isPending?: boolean;
  errorMessage?: string;
}

export function AuthForm({ errorMessage, isPending, mode, onSubmit }: AuthFormProps) {
  const schema = mode === "register" ? registerSchema : loginSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues | RegisterValues>({
    resolver: zodResolver(schema),
    defaultValues:
      mode === "register"
        ? { name: "", email: "", password: "" }
        : { email: "", password: "" },
  });

  return (
    <form className="auth-form" onSubmit={handleSubmit((values) => onSubmit(values))}>
      {mode === "register" ? (
        <label>
          <span>Name</span>
          <input placeholder="Ada Lovelace" {...register("name" as const)} />
          {"name" in errors ? <small>{errors.name?.message}</small> : null}
        </label>
      ) : null}

      <label>
        <span>Email</span>
        <input placeholder="ada@example.com" {...register("email")} />
        <small>{errors.email?.message}</small>
      </label>

      <label>
        <span>Password</span>
        <input placeholder="secret123" type="password" {...register("password")} />
        <small>{errors.password?.message}</small>
      </label>

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

      <button className="button-primary" disabled={isPending} type="submit">
        {isPending ? "Submitting..." : mode === "register" ? "Create account" : "Sign in"}
      </button>
    </form>
  );
}
