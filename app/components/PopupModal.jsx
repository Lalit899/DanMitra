import React, { useEffect, useState } from "react";
import RazorpayBtn from "./RazorpayBtn";
import CryptomusBtn from "./CryptomusBtn";
import { IoCloseCircle } from "react-icons/io5";

const PaymentModal = ({ isOpen, onClose, onConfirm, ngoName }) => {
  const [amount, setAmount] = useState("");
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setDisabled(amount < 1);
  }, [amount]);
  if (!isOpen) return null;
  const handleClose = () => {
    setAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-blue-950 bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex flex-row-reverse justify-between items-start  relative">
          <button
            onClick={handleClose}
            className=" text-3xl  text-indigo-900 rounded-full hover:text-red-900 transition-all duration-300"
          >
            <IoCloseCircle />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Donate to {ngoName}
          </h2>
        </div>

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
          <CryptomusBtn
            onClick={() => {
              onConfirm(amount);
              setAmount("");
            }}
            amount={amount}
            disabled={disabled}
          />
          <RazorpayBtn
            onClick={() => {
              onConfirm(amount);
              setAmount("");
            }}
            amount={amount}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
