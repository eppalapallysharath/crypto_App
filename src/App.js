import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home";
import Coins from "./components/Coins/Coins";
import CoinDetails from "./components/Coins/CoinDetails";
import Exchanges from "./components/Exchanges/Exchanges";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="exchanges/" element={<Exchanges />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
