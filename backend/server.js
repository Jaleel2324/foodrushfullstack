const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Order schema
const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  customer: Object,
  status: {
    type: String,
    default: "Preparing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API running");
});

// GET ORDERS
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// CREATE ORDER
app.post("/orders", async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      status: "Preparing",
    });

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// UPDATE STATUS
app.patch("/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });

    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});