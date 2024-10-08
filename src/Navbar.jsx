import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon, XIcon, UserCircleIcon } from "@heroicons/react/outline";
import Logo from "./assets/CompanyLogo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  const location = useLocation(); // Get the current location

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="bg-black ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          {/* Logo section */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-12 w-auto"
                src={Logo}
                alt="EasyTix"
              />
              <img
                className="hidden lg:block h-12 w-auto"
                src={Logo}
                alt="EasyTix"
              />
            </div>
            <div className="hidden mt-1 sm:flex sm:justify-center sm:flex-1">
              <div className="flex space-x-4">
                {/* Navigation links */}
                <Link
                  to="/customer-homepage"
                  className={`px-3 py-2 rounded-md text-lg ${
                    location.pathname === "/customer-homepage"
                      ? "font-bold text-white"
                      : "text-white hover:bg-gray-900 hover:text-white"
                  }`}
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  Home
                </Link>
                <Link
                  to="/buy-ticket"
                  className={`px-3 py-2 rounded-md text-lg ${
                    location.pathname === "/buy-ticket"
                      ? "font-bold text-white"
                      : "text-white hover:bg-gray-900 hover:text-white"
                  }`}
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  Buy Ticket
                </Link>
                <Link
                  to="/contact-us"
                  className={`px-3 py-2 rounded-md text-lg ${
                    location.pathname === "/contact-us"
                      ? "font-bold text-white"
                      : "text-white hover:bg-gray-900 hover:text-white"
                  }`}
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          {/* Profile dropdown */}
          <div className="relative ml-3">
            <button
              onClick={toggleProfileMenu}
              className="bg-black p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Dropdown menu, show/hide based on menu state */}
            <div
              className={`${
                isProfileMenuOpen ? "block" : "hidden"
              } origin-top-right absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex="-1"
            >
              {/* Profile dropdown items */}
              <Link
                to="/logout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
                role="menuitem"
                tabIndex="-1"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Mobile navigation links */}
          <Link
            to="/customer-homepage"
            className={`block px-3 py-2 rounded-md text-base ${
              location.pathname === "/customer-homepage"
                ? "font-bold text-white"
                : "text-white hover:bg-gray-900 hover:text-white"
            }`}
            aria-current="page"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Home
          </Link>
          <Link
            to="/buy-ticket"
            className={`block px-3 py-2 rounded-md text-base ${
              location.pathname === "/buy-ticket"
                ? "font-bold text-white"
                : "text-white hover:bg-gray-900 hover:text-white"
            }`}
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Buy Ticket
          </Link>
          <Link
            to="/contact-us"
            className={`block px-3 py-2 rounded-md text-base ${
              location.pathname === "/contact-us"
                ? "font-bold text-white"
                : "text-white hover:bg-gray-900 hover:text-white"
            }`}
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
