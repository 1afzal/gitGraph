import React from "react";
import HomePage from "./pages/HomePage";
import BuyCredit from "./pages/BuyCredit";
import Result from "./pages/Result";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar"; // Added missing import

export default function App() {
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buycredit" element={<BuyCredit />} />
      </Routes>
    </div>
  );
}