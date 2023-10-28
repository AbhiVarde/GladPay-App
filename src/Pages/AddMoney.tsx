import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlusCircle } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const AddMoney = ({
  onAmountAdded,
}: {
  onAmountAdded: (amount: number) => void;
}) => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedBankDetails = localStorage.getItem("bankDetails");
    if (amount === "") {
      toast.info("Please enter the amount.");
    } else if (!storedBankDetails) {
      toast.error("Please Add your bank details!");
      navigate("/balance");
    } else {
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount)) {
        onAmountAdded(parsedAmount);
        toast.success(`Added ₹${parsedAmount} to your account.`);
        setAmount("");
      } else {
        toast.error("Please enter a valid amount.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="bg-white shadow-md rounded-lg p-8 max-w-md"
      >
        <h2 className="text-3xl sm:text-4xl mb-6 font-bold">Add Money</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label
              className="block text-gray-700 text-base sm:text-lg font-bold mb-2"
              htmlFor="amount"
            >
              Enter Amount
            </label>
            <input
              id="amount"
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-8 rounded-lg justify-center  focus:outline-none focus:shadow-outline text-base sm:text-lg flex items-center mb-2"
            >
              <FaPlusCircle className="text-xl mr-2 text-green-400" />
              Add Money
            </button>
          </div>
        </form>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-8 rounded-lg focus:outline-none focus:shadow-outline text-base sm:text-lg flex items-center"
            onClick={() => navigate("/balance")}
          >
            <MdAccountBalanceWallet className="text-xl mr-2 text-green-400" />
            Check Balance
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddMoney;
