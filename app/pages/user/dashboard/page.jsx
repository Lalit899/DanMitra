"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import { getPaymentHistory, userdetails } from "../../../../utils/api";
import { format } from "date-fns";

const donationOptions = [
  {
    title: "Families in Need",
    description: "Support basic essentials for struggling families",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    title: "Orphanages",
    description: "Help children with food, education, and care",
    icon: "👶",
  },
  {
    title: "Senior Citizens",
    description: "Provide medical and daily needs for elderly",
    icon: "👴",
  },
  {
    title: "Students",
    description: "Fund education and supplies for students",
    icon: "🎓",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [totalDonated, setTotalDonated] = useState(0);
  const [lastTransaction, setLastTransaction] = useState(0);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const useremail = localStorage.getItem("user-email");
      const res = await userdetails(useremail);
      if (res.success) {
        setUsername(res.data.user.firstname);
        localStorage.setItem("customer_id", res.data.user.razorpay_customer_id);
      } else {
        Error("Error fetching user details:", res.message);
      }
    };
    fetchUserDetails();

    const customerid = localStorage.getItem("customer_id");
    const email = localStorage.getItem("user-email");
    const fetchTransactionHistory = async () => {
      const res = await getPaymentHistory(customerid, email);
      if (res.success) {
        if (res.data.status === 404) {
          setLastTransaction(0);
        } else {
          setLastTransaction(res.data[0]);
          const totalAmount = res.data
            .filter((item) => item.status === "captured")
            .reduce((sum, item) => sum + item.amount, 0);
          setTotalDonated(totalAmount);
        }
      } else {
        Error("Error fetching user details:", res.message);
      }
    };
    fetchTransactionHistory();
  }, []);

  return (
    <div className="flex min-h-screen bg-purple-100 text-gray-900">
      <Sidebar />
      {/* Main content */}
      <main className="flex-1  p-7">
        <h1 className="text-3xl font-bold mb-4">
          Welcome back, <span className="capitalize">{username}</span>
        </h1>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Start Donating!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {donationOptions.map((option) => (
              <div
                key={option.title}
                className="bg-purple-50 p-5 w-30  rounded-2xl shadow-md"
              >
                <div className="text-7xl mb-4">{option.icon}</div>
                <h3 className="text-lg font-semibold">{option.title}</h3>
                <p className="text-sm text-gray-600 h-10">
                  {option.description}
                </p>
                <button
                  className="text-sm mt-4 px-3 py-2 transition-colors bg-purple-600 text-white rounded hover:bg-purple-700"
                  onClick={() => {
                    router.push("/pages/user/start-donation");
                  }}
                >
                  Donate Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Your Donation Summary</h2>
          <div className="bg-purple-50 p-4 rounded-xl shadow-md text-gray-600">
            {/* Add actual summary info here */}
            <p>
              Total Donated:{" "}
              <span className="font-semibold">
                ₹{(totalDonated / 100).toFixed(2)}
              </span>
            </p>
            <p>
              Recent Donations:{" "}
              <span className="font-semibold">
                {lastTransaction
                  ? `₹${(lastTransaction.amount / 100).toFixed(2)} on ${format(
                      Date(lastTransaction.created_at * 1000),
                      "dd MMM yyyy"
                    )} was ${
                      lastTransaction.status === "captured"
                        ? "successful"
                        : "failed"
                    }`
                  : "none yet"}
              </span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
