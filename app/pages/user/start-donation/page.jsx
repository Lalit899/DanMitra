"use client";
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DonationCard from "../../../components/Donationcard";
import PaymentModal from "../../../components/PopupModal";

const donations = [
  {
    ngoName: "Helping Hands Foundation",
    description:
      "Provides food, shelter, and education to underprivileged children.\nOperates community centers in rural areas.\nEmpowers families through training.",
  },
  {
    ngoName: "Green Earth Initiative",
    description:
      "Focused on reforestation and climate change awareness.\nConducts tree plantation drives and clean-up campaigns.\nEducates youth on sustainable living.",
  },
  {
    ngoName: "Smile for All Trust",
    description:
      "Delivers free healthcare to remote and tribal areas.\nOrganizes health camps and medical distributions.\nPromotes hygiene and wellness education.",
  },
  {
    ngoName: "Paws & Hope Rescue",
    description:
      "Rescues and rehabilitates injured and abandoned animals.\nRuns adoption drives and veterinary camps.\nAdvocates for animal welfare and legal rights.",
  },
];

export default function StartDonationPage() {
  const [selectedNGO, setSelectedNGO] = useState(null);

  const handleConfirmPayment = (amount) => {
    alert(`Donated ₹${amount} to ${selectedNGO}`);
    setSelectedNGO(null);
    // Add payment API or logic here
  };
  return (
    <div className="flex min-h-screen bg-purple-100 text-gray-900">
      <Sidebar />
      <main className="min-h-screen flex flex-wrap flex-col w-[1250px] p-7">
        <h1 className="text-3xl font-bold mb-4">
          Start a Donation. Support a Cause!
        </h1>
        <p className="text-gray-700 mb-4">
          Here you can choose causes and enter donation details.
        </p>
        <hr className="border-2 border-purple-200 rounded mb-8 " />

        <div className="space-y-6">
          {donations.map((donation, index) => (
            <DonationCard
              key={index}
              ngoName={donation.ngoName}
              description={donation.description}
              onPay={() => setSelectedNGO(donation.ngoName)}
            />
          ))}
        </div>

        <PaymentModal
          isOpen={selectedNGO !== null}
          onClose={() => setSelectedNGO(null)}
          onConfirm={handleConfirmPayment}
          ngoName={selectedNGO}
        />

        {/* Add your donation form or flow here */}
      </main>
    </div>
  );
}
