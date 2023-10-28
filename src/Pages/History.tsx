import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiRefreshCw } from "react-icons/fi";

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const transactionData = [
  { id: 1, amount: 1500, category: "Food", status: "Success" },
  { id: 2, amount: 800, category: "Entertainment", status: "Success" },
  { id: 3, amount: 500, category: "Bills", status: "Failed" },
];

const History = () => {
  const [transactions, setTransactions] = useState(transactionData);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Amount");

  const fetchTransactionHistory = () => {
    setTransactions(transactionData);
    toast.info("Transaction history refreshed.");
  };

  const filterTransactions = (category: string) => {
    setFilter(category);
  };

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((transaction) => transaction.category === filter);

  const sortTransactions = (criteria: string) => {
    let sortedTransactions = [...filteredTransactions];
    switch (criteria) {
      case "amount":
        sortedTransactions.sort((a, b) => b.amount - a.amount);
        setSort("Amount");
        break;
      case "category":
        sortedTransactions.sort((a, b) => a.category.localeCompare(b.category));
        setSort("Category");
        break;
      default:
        break;
    }
    setTransactions(sortedTransactions);
  };

  return (
    <div className="min-h-screen bg-slate-300 flex items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="bg-white shadow-md rounded-lg p-8 w-4/5 sm:w-3/4 md:w-2/3 lg:w-2/4"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 font-bold text-gray-900">
          Transaction History
        </h2>
        <button
          onClick={fetchTransactionHistory}
          className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg mb-4 focus:outline-none focus:shadow-outline text-sm sm:text-lg md:text-xl flex items-center"
        >
          <FiRefreshCw className="text-base sm:text-lg mr-2 text-green-400" />
          Refresh History
        </button>
        <div className="flex flex-col md:justify-between mb-4">
          <div className="mb-4">
            <label className="block text-gray-900 text-base sm:text-lg font-bold mb-2">
              Filter by Category:
            </label>
            <div className="flex space-x-2 overflow-y-auto md:space-x-4">
              {["All", "Food", "Entertainment", "Bills"].map((category) => (
                <button
                  key={category}
                  onClick={() => filterTransactions(category)}
                  className={`${
                    filter === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-900"
                  } font-bold py-2 px-3 md:px-4 rounded-lg focus:outline-none focus:shadow-outline text-sm sm:text-lg`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-900 text-base sm:text-lg font-bold mb-2">
              Sort by:
            </label>
            <div className="flex space-x-2 md:space-x-4">
              {["Amount", "Category"].map((criteria) => (
                <button
                  key={criteria}
                  onClick={() => sortTransactions(criteria.toLowerCase())}
                  className={`${
                    sort === criteria
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-900"
                  } font-bold py-2 px-3 md:px-4 rounded-lg focus:outline-none focus:shadow-outline text-sm sm:text-lg`}
                >
                  {criteria}
                </button>
              ))}
            </div>
          </div>
        </div>
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-900 mt-4">
            No transaction history available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="mt-4 w-full min-w-max">
              <thead>
                <tr>
                  <th className="py-2 px-3 bg-gray-200 font-medium text-gray-900 text-sm sm:text-lg">
                    ID
                  </th>
                  <th className="py-2 px-3 bg-gray-200 font-medium text-gray-900 text-sm sm:text-lg">
                    Amount
                  </th>
                  <th className="py-2 px-3 bg-gray-200 font-medium text-gray-900 text-sm sm:text-lg">
                    Category
                  </th>
                  <th className="py-2 px-3 bg-gray-200 font-medium text-gray-900 text-sm sm:text-lg">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="text-center">
                    <td className="py-2 px-3 border-b text-sm sm:text-lg">
                      {transaction.id}
                    </td>
                    <td className="py-2 px-3 border-b text-sm sm:text-lg">
                      {transaction.amount}
                    </td>
                    <td className="py-2 px-3 border-b text-sm sm:text-lg">
                      {transaction.category}
                    </td>
                    <td className="py-2 px-3 border-b">
                      <span
                        className={`${
                          transaction.status === "Success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        } py-1 px-2 rounded-lg text-sm sm:text-lg`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default History;
