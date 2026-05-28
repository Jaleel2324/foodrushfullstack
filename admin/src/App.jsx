import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/orders");
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.log("Error updating:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const outForDeliveryOrders = orders.filter(
    (order) => order.status === "Out for Delivery"
  ).length;

  return (
    <main className="adminPage">
      <header className="adminHeader">
        <div>
          <h1>FoodRush Admin</h1>
          <p>Live order dashboard connected to MongoDB</p>
        </div>

        <button onClick={fetchOrders}>Refresh</button>
      </header>

      <section className="statsGrid">
        <div className="statCard">
          <span>Total Orders</span>
          <h2>{totalOrders}</h2>
        </div>

        <div className="statCard">
          <span>Total Revenue</span>
          <h2>${totalRevenue.toFixed(2)}</h2>
        </div>

        <div className="statCard">
          <span>Preparing</span>
          <h2>{preparingOrders}</h2>
        </div>

        <div className="statCard">
          <span>Out for Delivery</span>
          <h2>{outForDeliveryOrders}</h2>
        </div>

        <div className="statCard">
          <span>Delivered</span>
          <h2>{deliveredOrders}</h2>
        </div>
      </section>

      <section className="analyticsPanel">
        <h2>Order Status Overview</h2>

        <div className="barGroup">
          <div>
            <span>Preparing</span>
            <div className="barTrack">
              <div
                className="barFill"
                style={{
                  width: totalOrders
                    ? `${(preparingOrders / totalOrders) * 100}%`
                    : "0%",
                }}
              ></div>
            </div>
          </div>

          <div>
            <span>Out for Delivery</span>
            <div className="barTrack">
              <div
                className="barFill"
                style={{
                  width: totalOrders
                    ? `${(outForDeliveryOrders / totalOrders) * 100}%`
                    : "0%",
                }}
              ></div>
            </div>
          </div>

          <div>
            <span>Delivered</span>
            <div className="barTrack">
              <div
                className="barFill"
                style={{
                  width: totalOrders
                    ? `${(deliveredOrders / totalOrders) * 100}%`
                    : "0%",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {orders.length === 0 ? (
        <div className="emptyAdmin">
          <h2>No orders yet</h2>
          <p>Place an order from your main site.</p>
        </div>
      ) : (
        <div className="ordersGrid">
          {orders.map((order) => (
            <div className="orderCard" key={order._id}>
              <div className="orderTop">
                <div>
                  <h2>Order #{order._id}</h2>
                  <p>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "No date"}
                  </p>
                </div>

                <span className="statusBadge">{order.status}</span>
              </div>

              <div className="orderSection">
                <h3>Customer</h3>
                <p><strong>Name:</strong> {order.customer?.name}</p>
                <p><strong>Email:</strong> {order.customer?.email}</p>
                <p><strong>Address:</strong> {order.customer?.address}</p>
                <p><strong>City:</strong> {order.customer?.city}</p>
                <p><strong>Phone:</strong> {order.customer?.phone}</p>
              </div>

              <div className="orderSection">
                <h3>Items</h3>

                {order.items?.map((item, index) => (
                  <div key={index} className="adminItem">
                    <span>
                      {item.image} {item.name}
                    </span>
                    <span>
                      {item.quantity} × ${item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="orderTotal">
                <span>Total</span>
                <strong>${Number(order.total || 0).toFixed(2)}</strong>
              </div>

              <div className="statusControls">
                <button onClick={() => updateStatus(order._id, "Preparing")}>
                  Preparing
                </button>

                <button onClick={() => updateStatus(order._id, "Out for Delivery")}>
                  Out for Delivery
                </button>

                <button onClick={() => updateStatus(order._id, "Delivered")}>
                  Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default App;