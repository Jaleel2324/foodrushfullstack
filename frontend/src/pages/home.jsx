import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { products, categories } from "../data/products.js";

export default function Home({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toast, setToast] = useState("");

  const filteredProducts = products.filter((item) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(search) ||
      item.desc.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAdd = (item) => {
    addToCart(item);
    setToast(`${item.name} added to cart`);
    setTimeout(() => setToast(""), 1800);
  };

  return (
    <main className="page home">
      {toast && <div className="toast">{toast}</div>}

      <section className="hero">
        <div className="heroContent">
          <p className="tagline">Fast • Fresh • Delivered</p>
          <h1>Premium food delivery for busy people.</h1>
          <p className="heroText">
            Search your favorite meals, build your cart, checkout, and manage
            orders through a connected admin dashboard.
          </p>

          <div className="heroActions">
            <a href="#menu" className="primaryBtn">
              Explore Menu
            </a>
            <a className="secondaryBtn" href="#reviews">
              See Reviews
            </a>
          </div>

          <div className="heroStats">
            <div>
              <strong>4.9★</strong>
              <span>Average rating</span>
            </div>
            <div>
              <strong>30min</strong>
              <span>Delivery target</span>
            </div>
            <div>
              <strong>Live</strong>
              <span>Admin tracking</span>
            </div>
          </div>
        </div>

        <div className="heroVisual">
          <div className="floatingDish">🍔</div>
          <div className="floatingDish small one">🍕</div>
          <div className="floatingDish small two">🥤</div>
        </div>
      </section>

      <section id="menu" className="menu">
        <div className="menuHeader">
          <div>
            <p className="eyebrow">Fresh picks</p>
            <h2>Popular Items</h2>
            <p>Filter meals by category or search by name.</p>
          </div>

          <input
            className="searchInput"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="categoryRow">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "activeCategory" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="emptyCart">
            <h2>No food found</h2>
            <p>Try another search or category.</p>
          </div>
        ) : (
          <div className="foodGrid">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} onAddToCart={handleAdd} />
            ))}
          </div>
        )}
      </section>

      <section id="reviews" className="reviewsSection">
        <div className="sectionHeader">
          <p className="eyebrow">Social proof</p>
          <h2>Customer Reviews</h2>
          <p>Built-in feedback section for a real business website feel.</p>
        </div>

        <div className="reviewList">
          <div className="reviewCard">
            <div className="reviewTop">
              <h3>Marcus</h3>
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p>Great food and super clean checkout flow.</p>
          </div>

          <div className="reviewCard">
            <div className="reviewTop">
              <h3>Ari</h3>
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p>The site feels smooth and easy to use.</p>
          </div>

          <div className="reviewCard">
            <div className="reviewTop">
              <h3>Client Demo</h3>
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p>The admin dashboard makes this feel like a real business tool.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contactSection">
        <div>
          <p className="eyebrow">Support</p>
          <h2>Customer Support</h2>
          <p>Need help with an order? Contact our support team anytime.</p>
        </div>

        <div className="contactCards">
          <div className="contactCard">
            <h3>Email</h3>
            <p>support@foodrushdemo.com</p>
          </div>
          <div className="contactCard">
            <h3>Phone</h3>
            <p>(555) 123-4567</p>
          </div>
          <div className="contactCard">
            <h3>Hours</h3>
            <p>Mon - Sat, 9 AM - 8 PM</p>
          </div>
        </div>
      </section>
    </main>
  );
}
