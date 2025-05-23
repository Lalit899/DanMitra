const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { db } = require("../models/User");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get("/", (req, res) => {
  res.send("Auth route is working");
});

router.post("/create-order", async (req, res) => {
  const { amount, customer_id } = req.body;

  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: "donation_rcptid_" + Date.now(),
      payment_capture: 1,
      customer_id,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/payment-history", async (req, res) => {
  try {
    const customer_id = req.query.customer_id;
    const email = req.query.email;

    if (!customer_id)
      return res.status(400).json({ error: "Missing customer_id" });

    const result = await razorpay.payments.all({ customer_id, count: 100 });

    // Filter by email manually
    const filteredPayments = result.items.filter(
      (payment) => payment.email === email || payment.notes?.email === email
    );

    if (filteredPayments.length === 0) {
      res.json({
        message: "No payments found",
        status: 404,
      });
    } else {
      res.json(filteredPayments, { status: 200 });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
