import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidBank } from "react-icons/bi";
import { MdRemoveCircle } from "react-icons/md";
import { BalanceContext } from "../App";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const Balance = () => {
  const balance = useContext(BalanceContext);
  const [bankDetails, setBankDetails] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBankDetails = localStorage.getItem("bankDetails");
    if (storedBankDetails) {
      setBankDetails(JSON.parse(storedBankDetails));
    }
  }, []);

  const addBankDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bankName = e.currentTarget.bankName.value;
    const accountNumber = e.currentTarget.accountNumber.value;
    const branch = e.currentTarget.branch.value;

    if (!bankName || !accountNumber || !branch) {
      toast.error("Please enter all the bank details.");
      return;
    }

    if (!/^\d+$/.test(accountNumber)) {
      toast.error("Please enter a valid account number.");
      return;
    }

    if (!/^[a-zA-Z\s]*$/.test(branch)) {
      toast.error("Please enter a valid branch name.");
      return;
    }

    const bankDetailsData = {
      bankName,
      accountNumber,
      branch,
    };
    setBankDetails(bankDetailsData);
    localStorage.setItem("bankDetails", JSON.stringify(bankDetailsData));
    toast.success("Bank details added successfully.");
  };

  const removeBankDetails = () => {
    localStorage.removeItem("bankDetails");
    setBankDetails(null);
    toast.success("Bank details removed successfully.");
  };

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="bg-white shadow-md rounded-lg p-8 flex flex-col items-center"
      >
        <h2 className="text-3xl sm:text-4xl mb-6 font-bold">Balance</h2>
        {bankDetails ? (
          <>
            <p className="text-3xl sm:text-4xl font-bold mb-6">₹ {balance}</p>
            <div className="text-base sm:text-lg text-gray-700 mb-4">
              <p>Bank Name: {bankDetails.bankName}</p>
              <p>Account Number: {bankDetails.accountNumber}</p>
              <p>Branch: {bankDetails.branch}</p>
            </div>
            <button
              type="button"
              onClick={removeBankDetails}
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold mb-2 py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline text-lg flex items-center"
            >
              <MdRemoveCircle className="text-xl mr-2 text-green-400" />
              Remove Bank Details
            </button>
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-8 rounded-lg focus:outline-none focus:shadow-outline text-base sm:text-lg flex items-center"
              onClick={() => navigate("/add-money")}
            >
              <FaPlusCircle className="text-xl mr-2 text-green-400" />
              Add Money
            </button>
          </>
        ) : (
          <form onSubmit={addBankDetails}>
            <div className="mb-4">
              <label
                htmlFor="bankName"
                className="block text-gray-700 text-base sm:text-lg font-bold mb-2"
              >
                Bank Name
              </label>
              <input
                id="bankName"
                type="text"
                pattern="[A-Za-z\s]+"
                className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                placeholder="Enter Bank Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="accountNumber"
                className="block text-gray-700 text-base sm:text-lg font-bold mb-2"
              >
                Account Number
              </label>
              <input
                id="accountNumber"
                type="text"
                pattern="[0-9]+"
                className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                placeholder="Enter Account Number"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="branch"
                className="block text-gray-700 text-base sm:text-lg font-bold mb-2"
              >
                Branch
              </label>
              <input
                id="branch"
                type="text"
                pattern="[A-Za-z\s]+"
                className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                placeholder="Enter Branch"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline text-base sm:text-lg flex items-center"
              >
                <BiSolidBank className="text-xl mr-2 text-green-400" />
                Add Bank Details
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Balance;
