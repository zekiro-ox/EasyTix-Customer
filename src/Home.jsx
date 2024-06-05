import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, UserCircleIcon } from "@heroicons/react/outline";

const CustomerHomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div className="bg-white-200 min-h-screen">
      <nav className="bg-neutral-950">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="EasyTix"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="EasyTix"
                />
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {/* Navigation links */}
                  <Link
                    to="/customer-homepage"
                    className="font-bold text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm"
                  >
                    Home
                  </Link>
                  <Link
                    to="/events"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-light"
                  >
                    Events
                  </Link>
                  <Link
                    to="/buy-ticket"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-light"
                  >
                    Buy Ticket
                  </Link>
                  <Link
                    to="/contact-us"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-light"
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
                className="bg-neutral-950 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950"
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
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-light"
            >
              Events
            </Link>
            <Link
              to="/buy-ticket"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-light"
            >
              Buy Ticket
            </Link>
            <Link
              to="/contact-us"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-light"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold mb-10 text-center">
          Welcome to EasyTix!
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Event Section */}
          <Link to="/events" className="no-underline text-black">
            <div className="bg-white p-4 rounded-lg drop-shadow-lg cursor-pointer">
              <img
                src="src/assets/Manawari.jpg"
                alt="MANAWARI"
                className="rounded-lg mb-4 w-full"
              />
              <h2 className="text-lg font-bold">MANAWARI</h2>
              <p>December 17, 2023</p>
              <p>6:00 PM</p>
              <p>CCA Quadrangle</p>
            </div>
          </Link>
          <Link to="/events" className="no-underline text-black">
            <div className="bg-white p-4 rounded-lg drop-shadow-lg cursor-pointer">
              <img
                src="src/assets/Manawari.jpg"
                alt="MANAWARI"
                className="rounded-lg mb-4 w-full"
              />
              <h2 className="text-lg font-bold">MANAWARI</h2>
              <p>December 17, 2023</p>
              <p>6:00 PM</p>
              <p>CCA Quadrangle</p>
            </div>
          </Link>
          <Link to="/events" className="no-underline text-black">
            <div className="bg-white p-4 rounded-lg drop-shadow-lg cursor-pointer">
              <img
                src="src/assets/Manawari.jpg"
                alt="MANAWARI"
                className="rounded-lg mb-4 w-full"
              />
              <h2 className="text-lg font-bold">MANAWARI</h2>
              <p>December 17, 2023</p>
              <p>6:00 PM</p>
              <p>CCA Quadrangle</p>
            </div>
          </Link>
          {/* Repeat for other events */}
        </div>
      </div>
    </div>
  );
};

export default CustomerHomePage;
