const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const fs = require("fs");
const paymentRoutes = require("./routes/payment");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors({ origin: "https://daanmitraserver.onrender.com/", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running"));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const readData = () => {
  if (fs.existsSync("orders.json")) {
    const data = fs.readFileSync("data.json");
    return JSON.parse(data);
  }
  return [];
};
const writeData = (data) => {
  fs.writeFileSync("orders.json", JSON.stringify(data, null, 2));
};

if (!fs.existsSync("orders.json")) {
  writeData([]);
}
