import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="shell shell--auth">
      <div className="panel panel--auth">
        <h1>Page not found</h1>
        <p>The route exists in neither the storefront nor the admin workspace.</p>
        <Link className="button-primary" to="/">
          Return home
        </Link>
      </div>
    </div>
  );
}
