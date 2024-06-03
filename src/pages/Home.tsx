import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home: React.FC = () => {
  return (
    <div className="bg-black h-full w-full tracking-wider">
      {/* <Navbar /> */}
      <section className="mt-24 mx-auto max-w-screen-xl pb-16 px-4 items-center lg:flex md:px-8 animate-fade-in-left">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-white font-bold text-4xl py-1">
            Master Your Invoicing with
            <span className="text-indigo-400"> InvoiceNinja Today!</span>
          </h1>
          <p className="text-gray-300 max-w-xl leading-relaxed tracking-wide sm:mx-auto lg:ml-0">
            InvoiceNinja simplifies your invoicing process, helping you create
            professional invoices quickly. With intuitive features and
            customizable templates, get paid faster and streamline your business
            today!
          </p>
          <div className="pt-10 items-center justify-start sm:justify-center lg:justify-start space-x-6 space-y-0 flex">
            <Link to="signupPage">
              <button className="px-7 py-3 bg-white text-gray-800 text-center rounded-md shadow-md block w-auto">
                Sign Up
              </button>
            </Link>

            <Link to="loginPage">
              <button className="px-7 py-3 bg-gray-700 text-gray-200 text-center rounded-md shadow-md block w-auto">
                Login
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          <img
            src="https://i.postimg.cc/HxHyt53c/undraw-heatmap-uyye.png"
            className="w-full mx-auto sm:w-10/12 lg:w-full"
            alt="Heatmap"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
