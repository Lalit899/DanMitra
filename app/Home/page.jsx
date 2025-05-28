"use client";
import Link from "next/link";
import React from "react";
import { FaEthereum, FaMobileAlt, FaHandsHelping } from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const csrData = {
  labels: [
    "Education",
    "Healthcare",
    "Rural Development",
    "Environment",
    "Others",
  ],
  datasets: [
    {
      data: [35, 28, 18, 10, 9],
      backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0"],
    },
  ],
};

const philanthropistData = {
  labels: ["Shiv Nadar", "Azim Premji", "Ratan Tata"],
  datasets: [
    {
      label: "Donations (₹ Crore)",
      data: [2000, 1500, 1200],
      backgroundColor: ["#1E88E5", "#D32F2F", "#7B1FA2"],
    },
  ],
};

function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-200 text-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-purple-600 text-white py-16 text-center">
          <h1 className="text-4xl font-bold">
            Empower Change with Blockchain & UPI
          </h1>
          <p className="mt-6 text-lg">
            A secure, transparent, and efficient way to donate to charities
            worldwide.
          </p>
          <button className="mt-8 bg-white text-blue-600 font-bold py-3 rounded-full shadow-md hover:text-purple-600/95 hover:scale-95 transform transition duration-500">
            <Link href="/login" className="px-6 py-3">
              Donate Now
            </Link>
          </button>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="px-6 py-8 bg-white shadow-md rounded-lg hover:scale-105 duration-500">
            <FaEthereum className="text-blue-600 text-4xl mx-auto" />
            <h2 className="text-xl font-semibold mt-4">Blockchain Security</h2>
            <p className="mt-2">
              Ensuring trust and transparency with immutable transaction
              records.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg hover:scale-105 duration-500">
            <FaMobileAlt className="text-blue-600 text-4xl mx-auto" />
            <h2 className="text-xl font-semibold mt-4">UPI Support</h2>
            <p className="mt-2">
              Seamless and instant donations via UPI for Indian users.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg hover:scale-105 duration-500">
            <FaHandsHelping className="text-blue-600 text-4xl mx-auto" />
            <h2 className="text-xl font-semibold mt-4">Global Reach</h2>
            <p className="mt-2">
              Helping donors and charities connect across borders.
            </p>
          </div>
        </section>

        <section className="py-10 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center">
              About DaanMitra
            </h2>

            <div className="space-y-12 text-gray-800 text-lg leading-relaxed">
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-indigo-600">
                  Our Story
                </h3>
                <p>
                  DaanMitra was born from a simple yet powerful idea: to make
                  charitable donations more transparent, trustworthy, and
                  accessible to everyone. In India, where generosity is abundant
                  but trust in donation channels can be limited, we aim to
                  bridge the gap between donors and verified causes.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 text-indigo-600">
                  What We Do
                </h3>
                <p>
                  We leverage cutting-edge blockchain technology to create a
                  transparent donation platform where every rupee and token can
                  be tracked from donor to beneficiary. DaanMitra allows users
                  to donate securely using popular UPI methods or cryptocurrency
                  payments via Cryptomus, catering to traditional and modern
                  donors alike.
                </p>
                <p className="mt-4">
                  Our platform partners only with NGOs and charities that have
                  passed strict verification and compliance standards, ensuring
                  your donations reach impactful projects addressing Education,
                  Healthcare, Environment, Disaster Relief, and more.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 text-indigo-600">
                  Why Choose DaanMitra?
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Transparency:</strong> Blockchain records provide
                    immutable proof of your donations, accessible anytime.
                  </li>
                  <li>
                    <strong>Security:</strong> Secure payment processing with
                    multiple trusted options including UPI and crypto.
                  </li>
                  <li>
                    <strong>Impactful Giving:</strong> Only verified,
                    accountable charities with real impact stories.
                  </li>
                  <li>
                    <strong>User-Friendly:</strong> Simple, clear donation flow
                    with instant receipts and tracking.
                  </li>
                  <li>
                    <strong>Community:</strong> Join a growing community of
                    conscious donors making a difference together.
                  </li>
                </ul>
              </div>

              <div className="bg-purple-100 p-5 rounded-xl ">
                <h3 className="text-2xl text-center font-semibold mb-3 text-indigo-600">
                  Our Vision
                </h3>
                <p>
                  We envision a future where technology empowers generosity,
                  making charitable giving more effective, transparent, and
                  joyful. DaanMitra strives to become the most trusted donation
                  platform in India, connecting hearts to causes with integrity
                  and innovation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/*Chart Section: Charity Data with Charts */}
        <section className=" w-ful h-full py-16 px-6 md:px-52 bg-white text-gray-900 text-center">
          <h2 className="text-2xl font-bold">Trends in Philanthropy</h2>
          <div className="mt-8 grid grid-rows-1 md:grid-cols-2 gap-8">
            <div>
              <Pie
                data={csrData}
                height={50}
                width={50}
                options={{ responsive: true, maintainAspectRatio: true }}
              />
              <h3 className="text-xl font-semibold">
                CSR Contributions by Sector
              </h3>
            </div>
            <div>
              <Bar
                data={philanthropistData}
                options={{ responsive: true, maintainAspectRatio: true }}
                height={50}
                width={80}
              />
              <h3 className="text-xl font-semibold">
                Top Philanthropists (Donations ₹ Crore)
              </h3>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
