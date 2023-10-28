import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MdPayment } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount === "") {
      toast.error("Please enter the amount.");
    } else {
      try {
        switch (selectedPaymentMethod) {
          case "creditCard":
            await performRazorpayPayment();
            break;
          case "debitCard":
            await performRazorpayPayment();
            break;
          case "bankTransfer":
            await performRazorpayPayment();
            break;
          case "digitalWallet":
            await performRazorpayPayment();
            break;
          default:
            toast.error("Invalid payment method.");
            break;
        }
        setAmount("");
      } catch (error) {
        toast.error("Payment failed. Please try again.");
      }
    }
  };

  const performRazorpayPayment = async () => {
    const options = {
      key: "rzp_test_K3zhLdvlnkrpSw",
      amount: parseInt(amount) * 100,
      currency: "INR",
      name: "GladPlay",
      description: "For testing purpose",
      prefill: {
        name: "Abhi Varde",
        email: "abhivarde189@gmail.com",
        contact: "9925368660",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.success", function (_response: any) {
      toast.success(
        `Payment successful. Payment ID: ${_response.razorpay_payment_id}`
      );
      setAmount("");
    });

    razorpay.on("payment.error", function (_response: any) {
      toast.error("Payment failed. Please try again.");
    });

    razorpay.open();
  };

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="bg-white shadow-md rounded-lg p-8 w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/4"
      >
        <h2 className="text-3xl sm:text-4xl mb-6 font-bold text-gray-900">
          Make a Payment
        </h2>
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
          <div className="mb-8">
            <label className="block text-gray-700 text-base sm:text-lg font-bold mb-2">
              Select Payment Method
            </label>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            >
              <option value="creditCard">Credit Card</option>
              <option value="debitCard">Debit Card</option>
              <option value="bankTransfer">Bank Transfer</option>
              <option value="digitalWallet">Digital Wallet</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-8 rounded-lg focus:outline-none focus:shadow-outline text-base sm:text-lg flex items-center"
            >
              <MdPayment className="text-xl mr-2 text-green-400" />
              Proceed to Pay
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Payment;
