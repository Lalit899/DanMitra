"use client";

import React, { useState } from "react";

import { createOrder } from "@/utils/api";

export default function RazorpayBtn({ amount }) {
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("user-email");
  const customer_id = localStorage.getItem("customer_id");

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpay = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }
    setLoading(true);
    try {
      const response = await createOrder(amount, customer_id);

      if (!response.success) {
        alert("Failed to create order. Please try again.");
        return;
      }

      const order = await response.data;

      // Check if Razorpay script is loaded
      if (!window.Razorpay) {
        alert(
          "Razorpay SDK failed to load. Please check your internet connection."
        );
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay key_id
        amount: order.amount,
        currency: order.currency,
        name: "DaanMitra",
        description: "DaanMitra Donation Payment",
        order_id: order.id, // From backend
        callback_url: "http://localhost:3000/pages/user/start-donation", // Success URL
        prefill: {
          name: "Test User",
          email: email,
          contact: "9999999999",
        },
        theme: {
          color: "#8B5CF6",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during Razorpay payment:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <>
      <div>
        <button
          onClick={handleRazorpay}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2
              rounded-lg shadow"
        >
          {loading ? "Processing..." : "Donate Now - (Razorpay-UPI/Bank/Card)"}
        </button>
      </div>
    </>
  );
}
