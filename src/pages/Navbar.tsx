import React from 'react'
import { Link } from 'react-router-dom'
import InvoiceLogo from "../assets/InvoiceLogo.png";

interface NavigationItem {
    title: string;
    path: string;
  }  

const Navbar = () => {

    const navigation: NavigationItem[] = [{ title: "Home", path: "/" }];

  return (
    <div>
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
              <Link to="/loginPage">
                <button className="flex items-center text-gray-200">
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
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Navbar