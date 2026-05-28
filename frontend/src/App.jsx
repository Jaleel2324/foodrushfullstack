import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Burger3D from "./components/Burger3D";
import "./index.css";

const products = [
  {
    id: 1,
    name: "Cheese Burger",
    price: 12,
    image: "🍔",
    desc: "Stacked burger with melted cheese, crisp lettuce, and house sauce.",
    category: "Burger",
    rating: 4.8,
    prepTime: "15 min",
    popular: true,
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    price: 18,
    image: "🍕",
    desc: "Golden crust pizza with pepperoni, mozzarella, and tomato sauce.",
    category: "Pizza",
    rating: 4.9,
    prepTime: "20 min",
    popular: true,
  },
  {
    id: 3,
    name: "Chicken Pasta",
    price: 15,
    image: "🍝",
    desc: "Creamy pasta with grilled chicken, parmesan, and herbs.",
    category: "Pasta",
    rating: 4.7,
    prepTime: "18 min",
    popular: false,
  },
];

const categories = ["All", "Burger", "Pizza", "Pasta"];

function Navbar({ cart }) {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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

function Home({ addToCart }) {
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
            <a href="#menu" className="primaryBtn">Explore Menu</a>
            <Link className="secondaryBtn" to="/checkout">Go Checkout</Link>
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
              <div className="foodCard" key={item.id}>
                {item.popular && <span className="badge">Popular</span>}

                <div className="itemImageBox">
                  {item.name === "Cheese Burger" ? (
                    <Burger3D />
                  ) : (
                    <div className="emojiImg">{item.image}</div>
                  )}
                </div>

                <div className="productMeta">
                  <span>⭐ {item.rating}</span>
                  <span>⏱ {item.prepTime}</span>
                </div>

                <h3>{item.name}</h3>
                <p>{item.desc}</p>

                <div className="cardBottom">
                  <strong>${item.price}</strong>
                  <button onClick={() => handleAdd(item)}>Add to Cart</button>
                </div>
              </div>
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

function CartPopup({
  cart,
  isOpen,
  closeCartPopup,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const navigate = useNavigate();
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const goToCheckout = () => {
    closeCartPopup();
    navigate("/checkout");
  };

  return (
    <div className="cartOverlay">
      <div className="cartPopup">
        <div className="popupHeader">
          <div>
            <p className="eyebrow">Cart</p>
            <h2>Your Order</h2>
          </div>
          <button onClick={closeCartPopup}>×</button>
        </div>

        {cart.length === 0 ? (
          <div className="popupEmpty">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="popupCartItems">
              {cart.map((item) => (
                <div className="popupCartRow" key={item.id}>
                  <div className="smallFoodIcon">{item.image}</div>

                  <div className="popupItemInfo">
                    <h3>{item.name}</h3>
                    <p>${item.price} each</p>

                    <div className="quantityBox">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>

                  <button className="removeBtn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="popupTotal">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            <button className="checkoutPopupBtn" onClick={goToCheckout}>
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Checkout({ cart, clearCart }) {
  const [ordered, setOrdered] = useState(false);
  const [error, setError] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 3 : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    const hasEmptyField = Object.values(formData).some((value) => value.trim() === "");

    if (cart.length === 0) {
      setError("Your cart is empty. Please add an item before placing an order.");
      return;
    }

    if (hasEmptyField) {
      setError("Please fill out all delivery and payment fields before placing your order.");
      return;
    }

    const orderData = {
      items: cart,
      total,
      customer: {
        name: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
      },
    };

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        setError("");
        setOrderTotal(total);
        setOrdered(true);
        clearCart();
      } else {
        setError("Order failed. Please try again.");
      }
    } catch {
      setError("Server error. Make sure your backend is running.");
    }
  };

  if (ordered) {
    return (
      <main className="page checkout">
        <div className="confirmationBox">
          <h1>Order Confirmed 🎉</h1>
          <p>Thank you for your order. It shall be delivered soon.</p>

          <div className="confirmationDetails">
            <div><span>Order Total</span><strong>${orderTotal.toFixed(2)}</strong></div>
            <div><span>Estimated Delivery</span><strong>30 - 45 minutes</strong></div>
            <div><span>Status</span><strong>Preparing your food</strong></div>
          </div>

          <Link className="primaryBtn" to="/">Back to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page checkout">
      <h1>Checkout</h1>

      {error && <div className="errorMessage">{error}</div>}

      {cart.length === 0 ? (
        <div className="emptyCart">
          <h2>Your cart is empty</h2>
          <p>Add food from the homepage before checking out.</p>
          <Link className="primaryBtn" to="/">Back to Menu</Link>
        </div>
      ) : (
        <div className="checkoutBox">
          <section className="orderSummary">
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div className="cartItemPreview" key={item.id}>
                <div className="smallFoodIcon">{item.image}</div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.quantity} × ${item.price}</p>
                </div>
              </div>
            ))}

            <div className="summaryItem"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summaryItem"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
            <div className="summaryTotal"><strong>Total</strong><strong>${total.toFixed(2)}</strong></div>
          </section>

          <section className="checkoutForm">
            <h2>Delivery Information</h2>

            <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
            <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            <input name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} />
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />

            <h2>Payment Demo</h2>

            <input name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} />
            <input name="expirationDate" placeholder="Expiration Date" value={formData.expirationDate} onChange={handleChange} />
            <input name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} />

            <button onClick={placeOrder}>Place Order</button>
          </section>
        </div>
      )}
    </main>
  );
}

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("foodrush-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("foodrush-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <BrowserRouter>
      <Navbar cart={cart} />

      <CartPopup
        cart={cart}
        isOpen={isCartOpen}
        closeCartPopup={() => setIsCartOpen(false)}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;