import { useNavigate } from "react-router-dom";

import type { RegisterPayload } from "../api/auth";
import { AuthForm } from "../features/auth/components/AuthForm";
import { useRegister } from "../features/auth/hooks/useRegister";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  useDocumentTitle("Register");

  return (
    <div className="panel panel--auth">
      <h2>Create your account</h2>
      <p>The form is already connected to the live backend register endpoint.</p>
      <AuthForm
        errorMessage={registerMutation.error instanceof Error ? registerMutation.error.message : undefined}
        isPending={registerMutation.isPending}
        mode="register"
        onSubmit={(values) => {
          registerMutation.mutate(values as RegisterPayload, {
            onSuccess: () => navigate("/products"),
          });
        }}
      />
    </div>
  );
}
