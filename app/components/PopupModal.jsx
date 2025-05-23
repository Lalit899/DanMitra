import React, { useState } from "react";
import RazorpayBtn from "./RazorpayBtn";
import { IoCloseCircle } from "react-icons/io5";

const PaymentModal = ({ isOpen, onClose, onConfirm, ngoName }) => {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-950 bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-2xl w-full max-w-md shadow-xl">
        <button
          onClick={onClose}
          className="absolute text-3xl left-[945px] text-indigo-900 rounded-full hover:text-red-900 transition-all duration-300"
        >
          <IoCloseCircle />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          Donate to {ngoName}
        </h2>

        <p className="text-gray-700 text-sm mb-4">
          Your contribution can make a huge difference!
        </p>
        <input
          type="number"
          placeholder="Enter amount you wish to donate"
          min="1"
          value={amount}
          required
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border-2 border-blue-800 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <div className="flex justify-end space-x-3">
          {/* <RazorpayBtn
            onClick={() => {
              onConfirm(amount);
              setAmount("");
            }}
            amount={amount}
          /> */}
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Cryptomus
          </button>
          <RazorpayBtn
            onClick={() => {
              onConfirm(amount);
              setAmount("");
            }}
            amount={amount}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
