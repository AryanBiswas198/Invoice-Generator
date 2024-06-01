import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="signupPage" element={<SignupPage />} />
        <Route path="loginPage" element={<LoginPage />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="main-page" element={<MainPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
