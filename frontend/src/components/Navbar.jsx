import { Link } from "react-router-dom";

export default function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span>Food</span>Rush
      </Link>

      <div className="navLinks">
        <Link to="/">Home</Link>
        <a href="#menu">Menu</a>
        <a href="#reviews">Reviews</a>
        <a href="#contact">Contact</a>
        <Link className="cartIcon" to="/checkout">
          🛒 <span>{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
}
