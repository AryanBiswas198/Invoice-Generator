import React from "react";
import InvoiceLogo from "../assets/InvoiceLogo.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";

interface NavigationItem {
  title: string;
  path: string;
}

const navigation: NavigationItem[] = [{ title: "Home", path: "#" }];

const Home: React.FC = () => {
  return (
    <div className="bg-black h-full w-full font-serif">
        <header>
          <nav className="items-center pt-5 mx-auto max-w-screen-xl px-8 flex space-x-2">
            <a href="#">
              <img
                src={InvoiceLogo}
                width={170}
                height={70}
                alt="InvoiceNinja Logo"
              />
            </a>
            <ul className="py-4 flex-1 items-center flex space-x-10 justify-end">
              {navigation.map((item, idx) => (
                <li className="text-gray-200 text-lg" key={idx}>
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
              <li className="text-lg">
                <a href="#" className="flex items-center text-gray-200">
                  Log In
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <section className="mt-24 mx-auto max-w-screen-xl pb-16 px-4 items-center lg:flex md:px-8">
          <div className="space-y-4 flex-1 sm:text-center lg:text-left">
            <h1 className="text-white font-bold text-4xl py-1">
              Master Your Invoicing with
              <span className="text-indigo-400"> InvoiceNinja Today!</span>
            </h1>
            <p className="text-gray-300 max-w-xl leading-relaxed tracking-wide sm:mx-auto lg:ml-0">
              InvoiceNinja simplifies your invoicing process, helping you create
              professional invoices quickly. With intuitive features and
              customizable templates, get paid faster and streamline your
              business today!
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
