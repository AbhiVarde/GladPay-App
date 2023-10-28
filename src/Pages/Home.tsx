import { Link } from "react-router-dom";
import { MdPayments } from "react-icons/md";
import {
  FaMoneyBillAlt,
  FaHistory,
  FaCreditCard,
  FaPlusCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../images/GladPay.jpg";

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="bg-white shadow-md rounded-lg p-8 flex flex-col items-center max-w-md w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/4"
      >
        <img src={logo} alt="App Logo" className="h-16 mb-4" />
        <h2 className="text-3xl sm:text-4xl text-gray-900 mb-2 font-bold">
          GladPay
        </h2>
        <p className="text-gray-900 mb-6 text-center text-base sm:text-lg">
          Where Payments Meet Delightful Experiences!{" "}
        </p>
        <Link
          to="/payment"
          className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg mb-4 w-full flex items-center justify-center "
        >
          <MdPayments className="text-xl mr-2 text-green-400" />
          <span className="text-sm sm:text-lg">Make a Payment</span>
        </Link>
        <Link
          to="/history"
          className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg mb-4 w-full flex items-center justify-center"
        >
          <FaHistory className="text-lg mr-2 text-green-400" />
          <span className="text-sm sm:text-lg">Transaction History</span>
        </Link>
        <Link
          to="/balance"
          className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg mb-4 w-full flex items-center justify-center"
        >
          <FaMoneyBillAlt className="text-lg mr-2 text-green-400" />
          <span className="text-sm sm:text-lg">Check Balance</span>
        </Link>
        <Link
          to="/add-money"
          className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg mb-4 w-full flex items-center justify-center"
        >
          <FaPlusCircle className="text-lg mr-2 text-green-400" />
          <span className="text-sm sm:text-lg">Add Money</span>
        </Link>
        <Link
          to="/card-management"
          className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg w-full flex items-center justify-center"
        >
          <FaCreditCard className="text-lg mr-2 text-green-400" />
          <span className="text-sm sm:text-lg">Card Management</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
