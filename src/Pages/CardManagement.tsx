import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillShieldLockFill } from "react-icons/bs";

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const CardManagement = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cardNumber === "" || expiryDate === "" || cvv === "") {
      toast.error("Please enter all the card details.");
    } else {
      toast.success("Card details saved successfully.");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-3x00 flex flex-col items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="bg-white shadow-md rounded-lg p-8 max-w-md"
      >
        <h2 className="text-3xl sm:text-4xl mb-6 font-bold">Card Management</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-base sm:text-lg font-bold mb-2"
              htmlFor="cardNumber"
            >
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              placeholder="Enter Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-base sm:text-lg font-bold mb-2"
              htmlFor="expiryDate"
            >
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="text"
              placeholder="Enter Expiry Date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-base sm:text-lg font-bold mb-2"
              htmlFor="cvv"
            >
              CVV
            </label>
            <input
              id="cvv"
              type="text"
              placeholder="Enter CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline text-base sm:text-lg flex items-center"
            >
              <BsFillShieldLockFill className="text-xl mr-2 text-green-400" />
              Save Card
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CardManagement;
