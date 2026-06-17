export default function ProductCard({ item, onAddToCart }) {
  return (
    <div className="foodCard">
      {item.popular && <span className="badge">Popular</span>}

      <div className="itemImageBox">
        <div className="emojiImg">{item.image}</div>
      </div>

      <div className="productMeta">
        <span>⭐ {item.rating}</span>
        <span>⏱ {item.prepTime}</span>
      </div>

      <h3>{item.name}</h3>
      <p>{item.desc}</p>

      <div className="cardBottom">
        <strong>${item.price}</strong>
        <button onClick={() => onAddToCart(item)}>Add to Cart</button>
      </div>
    </div>
  );
}
