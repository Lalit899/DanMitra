"use client";
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import DonationCard from "../../../components/Donationcard";
import PaymentModal from "../../../components/PopupModal";
import { BiSolidDonateHeart } from "react-icons/bi";

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
  {
    ngoName: "Shiksha Jyoti Foundation",
    description:
      "Provides scholarships and digital learning tools to underprivileged students.\nBuilds libraries and computer labs in government schools.\nTrains teachers in rural areas.",
  },
  {
    ngoName: "Swasthya Sewa Mission",
    description:
      "Offers free medical checkups and mobile clinics in underserved regions.\nDistributes medicines and health kits to low-income families.\nRaises awareness about chronic diseases.",
  },
  {
    ngoName: "Women Rise Alliance",
    description:
      "Supports women entrepreneurs with micro-loans and mentorship.\nConducts workshops on rights, safety, and leadership.\nFights against domestic violence and inequality.",
  },
  {
    ngoName: "Jal Jeevan Trust",
    description:
      "Works on clean water access and sanitation in drought-prone areas.\nInstalls rainwater harvesting systems and hand pumps.\nEducates communities on water conservation.",
  },
  {
    ngoName: "Aarogya Foundation",
    description:
      "Provides critical care and surgeries to children with life-threatening conditions.\nPartners with hospitals for subsidized treatment.\nRuns awareness campaigns on rare diseases.",
  },
  {
    ngoName: "Voice for the Voiceless",
    description:
      "Fights for the rights of marginalized communities.\nOffers legal aid, shelters, and skill training to the homeless and displaced.\nPromotes social justice and inclusion.",
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
        <h1 className="text-3xl font-bold mb-4 flex flex-row items-center">
          Start a <span className="text-indigo-800 ml-2">Donation</span>. Support a
          Cause!
          <BiSolidDonateHeart className="ml-2 text-4xl text-indigo-800" />
        </h1>
        <p className="text-gray-700 mb-4">
          Here you can choose causes and enter donation details.
        </p>
        <hr className="border-2 border-purple-200 rounded mb-7" />

        <div className="space-y-6 p-4 overflow-x-auto max-w-[500vw] overflow-y-scroll rounded-2xl border-2 border-purple-200 max-h-[33vw] custom-scrollbar">
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
