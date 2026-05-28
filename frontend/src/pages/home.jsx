function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div>
          <p className="tagline">Fast • Fresh • Delivered</p>
          <h1>Order your favorite meals online</h1>
          <p className="heroText">
            A modern food delivery website demo with menu cards, cart buttons,
            and a clean customer experience.
          </p>
          <button className="primaryBtn">View Menu</button>
        </div>
      </section>

      <section className="menu">
        <h2>Popular Items</h2>

        <div className="foodGrid">
          <div className="foodCard">
            <div className="foodImg">🍔</div>
            <h3>Cheese Burger</h3>
            <p>Juicy grilled burger with melted cheese.</p>
            <strong>$12</strong>
            <button>Add to Cart</button>
          </div>

          <div className="foodCard">
            <div className="foodImg">🍕</div>
            <h3>Pepperoni Pizza</h3>
            <p>Hot pizza with pepperoni and mozzarella.</p>
            <strong>$18</strong>
            <button>Add to Cart</button>
          </div>

          <div className="foodCard">
            <div className="foodImg">🍝</div>
            <h3>Chicken Pasta</h3>
            <p>Creamy pasta with grilled chicken.</p>
            <strong>$15</strong>
            <button>Add to Cart</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;