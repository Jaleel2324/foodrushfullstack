function Checkout() {
  return (
    <main className="checkout">
      <h1>Checkout</h1>

      <div className="checkoutBox">
        <section className="orderSummary">
          <h2>Order Summary</h2>

          <div className="summaryItem">
            <span>Selected Item</span>
            <span>$12.00</span>
          </div>

          <div className="summaryItem">
            <span>Delivery Fee</span>
            <span>$3.00</span>
          </div>

          <div className="summaryTotal">
            <strong>Total</strong>
            <strong>$15.00</strong>
          </div>
        </section>

        <section className="checkoutForm">
          <h2>Delivery Information</h2>

          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Street Address" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Phone Number" />

          <button>Proceed to Payment</button>
        </section>
      </div>
    </main>
  );
}

export default Checkout;