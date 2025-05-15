const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get("/", (req, res) => {
  res.send("Auth route is working");
});

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: "donation_rcptid_" + Date.now(),
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
