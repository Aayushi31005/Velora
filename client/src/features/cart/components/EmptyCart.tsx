import { Link } from "react-router-dom";

export function EmptyCart() {
  return (
    <div className="empty-cart">
      <span className="section-heading__eyebrow">Your cart is waiting</span>
      <h3>Nothing added yet.</h3>
      <p>Browse the catalog and add a few products. Your cart will stay in sync with the server.</p>
      <Link className="button-primary" to="/products">
        Continue shopping
      </Link>
    </div>
  );
}
