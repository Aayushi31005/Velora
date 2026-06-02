import { useNavigate } from "react-router-dom";

import { AuthForm } from "../features/auth/components/AuthForm";
import { useLogin } from "../features/auth/hooks/useLogin";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  useDocumentTitle("Login");

  return (
    <div className="panel panel--auth">
      <h2>Welcome back</h2>
      <p>Sign in with the backend auth flow you already tested from the API docs page.</p>
      <AuthForm
        errorMessage={loginMutation.error instanceof Error ? loginMutation.error.message : undefined}
        isPending={loginMutation.isPending}
        mode="login"
        onSubmit={(values) => {
          loginMutation.mutate(values, {
            onSuccess: () => navigate("/products"),
          });
        }}
      />
    </div>
  );
}
