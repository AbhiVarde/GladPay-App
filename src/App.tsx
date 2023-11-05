import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Balance from "./Pages/Balance";
import AddMoney from "./Pages/AddMoney";
import Payment from "./Pages/Payment";
import History from "./Pages/History";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import CardManagement from "./Pages/CardManagement";
import SelectApp from "./Pages/Select";

export const BalanceContext = React.createContext<number>(0);

function App() {
  const [balance, setBalance] = useState(5000);

  const handleAmountAdded = (amount: number) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  return (
    <div className="font-Nunito min-h-screen bg-slate-300">
      <ToastContainer />
      <Router>
        <BalanceContext.Provider value={balance}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/history" element={<History />} />
            <Route path="/balance" element={<Balance />} />
            <Route
              path="/add-money"
              element={<AddMoney onAmountAdded={handleAmountAdded} />}
            />
            <Route path="/select" element={<SelectApp />} />
            <Route path="/card-management" element={<CardManagement />} />
          </Routes>
        </BalanceContext.Provider>
      </Router>
      <footer className="text-gray-900 text-sm md:text-base text-center mt-4 py-2 px-4 fixed bottom-0 w-full">
        &copy; {new Date().getFullYear()}, Designed & Build by{" "}
        <a
          href="https://abhivarde.vercel.app"
          className="text-black font-semibold"
        >
          AbhiVarde
        </a>
        .
      </footer>
    </div>
  );
}

export default App;
