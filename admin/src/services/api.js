const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function fetchOrders() {
  const response = await fetch(`${API_BASE_URL}/orders`);
  return parseResponse(response);
}

export async function updateOrderStatus(id, status) {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return parseResponse(response);
}
