import React from "react";

const DonationCard = ({ ngoName, description, onPay }) => {
  return (
    <div className="flex flex-col flex-wrap md:flex-row items-center justify-between gap-4 p-5 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-1000">
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-indigo-700">{ngoName}</h2>
        <p className="text-gray-600 mt-1 ">{description}</p>
      </div>
      <div>
        <button
          onClick={onPay}
          className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all duration-500"
        >
          Donate
        </button>
      </div>
    </div>
  );
};

export default DonationCard;
