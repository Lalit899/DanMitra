"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import { getPaymentHistory, userdetails } from "../../../../utils/api";
import { format } from "date-fns";

const donationOptions = [
  {
    title: "Smile Foundation",
    description:
      "It empowers underprivileged children, youth, and women through access to education, healthcare, and livelihood opportunities.",
    logo: "https://www.smilefoundationindia.org/wp-content/uploads/2024/07/SMILE-FOUNDATION-LOGO-e1662456150120-1-300x235.png",
  },
  {
    title: "Goonj",
    description:
      "It addresses basic but neglected needs like clothing, hygiene, and rural development using urban surplus as a tool for development.",
    logo: "https://goonj.org/wp-content/uploads/2020/06/Goonj-logo-10June20.png",
  },
  {
    title: "Akshaya Patra",
    description:
      "It ensures that no child in India is deprived of education due to hunger.",
    logo: "https://www.akshayapatra.org/includefiles/settings/logo1.png",
  },
  {
    title: "GiveIndia",
    description:
      "It alleviates poverty by enabling the world to give more effectively and transparently.",
    logo: "https://cfstatic.give.do/4a8e5f5d-659d-4558-8ae9-378ec1e92b1b.webp",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [totalDonated, setTotalDonated] = useState(0);
  const [lastTransaction, setLastTransaction] = useState(0);
  const [username, setUsername] = useState("User");
  const [lastlogin, setLastlogin] = useState("fetching...");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const useremail = localStorage.getItem("user-email");
      const res = await userdetails(useremail);
      if (res.success) {
        setUsername(res.data.user.firstname);
        setLastlogin(res.data.user.last_login);
        localStorage.setItem("customer_id", res.data.user.razorpay_customer_id);
        localStorage.setItem("customer_name", res.data.user.firstname);
        localStorage.setItem("customer_lastname", res.data.user.lastname);
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
          Welcome back,{" "}
          <span className="capitalize text-indigo-800">{username}</span>
        </h1>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Start Donating!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {donationOptions.map((option) => (
              <div
                key={option.title}
                className="bg-purple-50 p-5 w-30  rounded-2xl shadow-md hover:shadow-lg transition-all duration-500"
              >
                <img
                  className="w-24 h-16 mb-4 object-contain"
                  src={option.logo}
                  alt={option.title + " logo"}
                ></img>
                <h3 className="text-md font-semibold">{option.title}</h3>
                <p className="text-xs ml-0.5 text-gray-600 h-12">
                  {option.description}
                </p>
                <button
                  className="text-sm mt-3 px-3 py-2 transition-colors bg-purple-600 text-white rounded hover:bg-purple-700"
                  onClick={() => {
                    router.push(`/pages/user/start-donation#${option.title}`);
                  }}
                >
                  Support Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mt-9">
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
                  : "no transactions yet!"}
              </span>
            </p>
          </div>
        </section>
        <section className="mt-5">
          <h2 className="text-2xl font-semibold mb-4">Recent Logins</h2>
          <div className="bg-purple-50 p-4 rounded-xl shadow-md text-gray-600">
            <p>
              Last Login:{" "}
              <span className="font-semibold">
                {lastlogin ? lastlogin : "first login"}
              </span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
