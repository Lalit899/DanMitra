"use client";
import Sidebar from "@/app/components/Sidebar";
import React from "react";

export default function StartDonationPage() {
  return (
    <div className="flex min-h-screen bg-purple-50 text-gray-900">
      <Sidebar />
      <main className="min-h-screen  p-7">
        <h1 className="text-3xl font-bold mb-6">Start a Donation</h1>
        <p className="text-gray-700">
          Here you can choose causes and enter donation details.
        </p>
        {/* Add your donation form or flow here */}
      </main>
    </div>
  );
}
