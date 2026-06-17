import { useState } from "react";
import { Link } from "react-router-dom";
import { createOrder } from "../services/api.js";

export default function Checkout({
  cart,
  subtotal,
  deliveryFee,
  total,
  clearCart,
}) {
  const [ordered, setOrdered] = useState(false);
  const [error, setError] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const placeOrder = async () => {
    const hasEmptyField = Object.values(formData).some(
      (value) => value.trim() === ""
    );

    if (cart.length === 0) {
      setError("Your cart is empty. Please add an item before placing an order.");
      return;
    }

    if (hasEmptyField) {
      setError(
        "Please fill out all delivery and payment fields before placing your order."
      );
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const payload = {
        items: cart,
        deliveryFee,
        customer: {
          name: formData.fullName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          phone: formData.phone,
        },
      };

      const data = await createOrder(payload);

      if (data.success) {
        setOrderTotal(data.order?.total || total);
        setOrdered(true);
        clearCart();
      } else {
        setError("Order failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Server error. Make sure your backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (ordered) {
    return (
      <main className="page checkout">
        <div className="confirmationBox">
          <h1>Order Confirmed 🎉</h1>
          <p>Thank you for your order. It shall be delivered soon.</p>

          <div className="confirmationDetails">
            <div>
              <span>Order Total</span>
              <strong>${Number(orderTotal).toFixed(2)}</strong>
            </div>
            <div>
              <span>Estimated Delivery</span>
              <strong>30 - 45 minutes</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>Preparing your food</strong>
            </div>
          </div>

          <Link className="primaryBtn" to="/">
            Back to Home
          </Link>
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
          <Link className="primaryBtn" to="/">
            Back to Menu
          </Link>
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
                  <p>
                    {item.quantity} × ${item.price}
                  </p>
                </div>
              </div>
            ))}

            <div className="summaryItem">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summaryItem">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

            <div className="summaryTotal">
              <strong>Total</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </section>

          <section className="checkoutForm">
            <h2>Delivery Information</h2>

            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <h2>Payment Demo</h2>

            <input
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
            />
            <input
              name="expirationDate"
              placeholder="Expiration Date"
              value={formData.expirationDate}
              onChange={handleChange}
            />
            <input
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
            />

            <button onClick={placeOrder} disabled={isSubmitting}>
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
