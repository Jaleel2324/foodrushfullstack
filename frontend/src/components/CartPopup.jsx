import { useNavigate } from "react-router-dom";

export default function CartPopup({
  cart,
  isOpen,
  closeCartPopup,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  subtotal,
}) {
  const navigate = useNavigate();

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

                  <button
                    className="removeBtn"
                    onClick={() => removeFromCart(item.id)}
                  >
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
