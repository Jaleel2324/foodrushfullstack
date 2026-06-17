const Order = require("../models/Order");

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function normalizeItems(items = []) {
  return items.map((item) => ({
    productId: String(item.id || item.productId || ""),
    name: String(item.name || "").trim(),
    image: String(item.image || "").trim(),
    price: Number(item.price),
    quantity: Number(item.quantity),
  }));
}

function validateItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return "Order must contain at least one item.";
  }

  for (const item of items) {
    if (!item.productId) return "Each item must include a product id.";
    if (!item.name) return "Each item must include a name.";
    if (Number.isNaN(item.price) || item.price < 0) {
      return "Each item must include a valid price.";
    }
    if (Number.isNaN(item.quantity) || item.quantity < 1) {
      return "Each item must include a valid quantity.";
    }
  }

  return null;
}

function validateCustomer(customer = {}) {
  const { name, email, address, city, phone } = customer;

  if (!name?.trim()) return "Customer name is required.";
  if (!email?.trim() || !isValidEmail(email)) return "A valid email is required.";
  if (!address?.trim()) return "Customer address is required.";
  if (!city?.trim()) return "Customer city is required.";
  if (!phone?.trim()) return "Customer phone is required.";

  return null;
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const normalizedItems = normalizeItems(req.body.items);
    const customer = req.body.customer || {};

    const itemError = validateItems(normalizedItems);
    if (itemError) {
      return res.status(400).json({
        success: false,
        message: itemError,
      });
    }

    const customerError = validateCustomer(customer);
    if (customerError) {
      return res.status(400).json({
        success: false,
        message: customerError,
      });
    }

    const subtotal = normalizedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const deliveryFee = normalizedItems.length > 0 ? 3 : 0;
    const total = subtotal + deliveryFee;

    const order = await Order.create({
      items: normalizedItems,
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim().toLowerCase(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        phone: customer.phone.trim(),
      },
      subtotal,
      deliveryFee,
      total,
      status: "Preparing",
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const allowedStatuses = ["Preparing", "Out for Delivery", "Delivered"];
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOrders,
  createOrder,
  updateOrderStatus,
};
