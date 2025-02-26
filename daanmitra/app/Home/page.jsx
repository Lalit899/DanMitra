import Link from "next/link";
import React from "react";
import { FaEthereum, FaMobileAlt, FaHandsHelping } from "react-icons/fa";

function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-200 text-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-purple-600 text-white py-20 text-center">
          <h1 className="text-4xl font-bold">
            Empower Change with Blockchain & UPI
          </h1>
          <p className="mt-4 text-lg">
            A secure, transparent, and efficient way to donate to charities
            worldwide.
          </p>
          <button className="mt-6 bg-white text-blue-600 font-bold py-3 rounded-full shadow-md hover:text-purple-600/95 hover:scale-95 transform transition duration-500">
            <Link href="/pages/Login" className="px-6 py-3">
              Donate Now
            </Link>
          </button>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white shadow-md rounded-lg hover:scale-105 duration-500">
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
      </div>
    </>
  );
}

export default Home;
