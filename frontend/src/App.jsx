import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import CartPopup from "./components/CartPopup.jsx";
import Home from "./pages/Home.jsx";
import Checkout from "./pages/Checkout.jsx";
import useCart from "./hooks/useCart.js";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const {
    cart,
    cartCount,
    subtotal,
    deliveryFee,
    total,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />

      <CartPopup
        cart={cart}
        isOpen={isCartOpen}
        closeCartPopup={() => setIsCartOpen(false)}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        subtotal={subtotal}
      />

      <Routes>
        <Route path="/" element={<Home addToCart={handleAddToCart} />} />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              clearCart={clearCart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
