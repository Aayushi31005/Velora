import { Link } from "react-router-dom";

export function BrandMark() {
  return (
    <Link className="brand-mark" to="/">
      <span className="brand-mark__glyph">V</span>
      <span>
        <strong>Velora</strong>
        <small>Premium Shopping Experience</small>
      </span>
    </Link>
  );
}
