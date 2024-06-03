import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignupPage from "./components/core/SignupPage"
import LoginPage from "./components/core/LoginPage"
import VerifyEmail from "./pages/VerifyEmail";
import ProductPage from "./pages/ProductPage";

import "./App.css";
import GeneratePDF from "./pages/GeneratePDF";
import Navbar from "./pages/Navbar";

const App: React.FC = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signupPage" element={<SignupPage />} />
        <Route path="loginPage" element={<LoginPage />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="product-page" element={<ProductPage />} />
        <Route path="generate-pdf" element={<GeneratePDF />} />
      </Routes>
    </div>
  );
};

export default App;
