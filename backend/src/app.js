const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
