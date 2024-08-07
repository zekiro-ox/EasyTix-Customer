import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, UserCircleIcon } from "@heroicons/react/outline";
import Poster from "./assets/Manawari.jpg";

const EventsPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <nav className="bg-black">
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
                    className="text-white hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-lg font-light"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Home
                  </Link>
                  <Link
                    to="/events"
                    className="text-white hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-lg font-bold"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Events
                  </Link>
                  <Link
                    to="/buy-ticket"
                    className="text-white hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-lg font-light"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Buy Ticket
                  </Link>
                  <Link
                    to="/contact-us"
                    className="text-white hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-lg font-light"
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
              className="text-white hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-light"
              aria-current="page"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-white hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Events
            </Link>
            <Link
              to="/buy-ticket"
              className="text-white hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-light"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Buy Ticket
            </Link>
            <Link
              to="/contact-us"
              className="text-white hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-light"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto mt-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-neutral-800 p-4 rounded-lg drop-shadow-lg">
            <img
              src={Poster}
              alt="MANAWARI"
              className="rounded-lg mb-4 w-full object-cover h-64"
            />
            <h2
              className="text-2xl font-extrabold text-violet-500"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              MANAWARI
            </h2>
            <p
              className="text-white"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              December 17, 2023
            </p>
            <p
              className="text-white"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              6:00 PM
            </p>
            <p
              className="text-white"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              CCA Quadrangle
            </p>
            <Link to="/buy-ticket" className="no-underline text-black">
              <button
                type="button"
                className=" text-white p-2 rounded-md  bg-violet-500 hover:bg-violet-600 mt-4"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Buy Ticket Now
              </button>
            </Link>
          </div>
          <div className="bg-neutral-800 p-4 rounded-lg drop-shadow-lg">
            <h3
              className="text-2xl font-semibold mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Event Description
            </h3>
            <div className="event-description mb-4 bg-neutral-700 p-4 rounded-lg shadow-lg">
              <p className="mb-4">
                Experience the vibrant performances and immerse yourself in the
                rhythm of the night.
              </p>
              <p className="mb-4">
                The CCA Quadrangle is a spacious outdoor venue that offers a
                perfect setting for live performances. With state-of-the-art
                sound and lighting systems, every event at the CCA Quadrangle is
                a memorable experience.
              </p>
            </div>
            <h3
              className="text-2xl font-semibold mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Venue Information
            </h3>
            <div className="venue-information bg-neutral-700 p-4 rounded-lg shadow-lg">
              <p className="mb-4">
                The CCA Quadrangle is located at the heart of the city, making
                it easily accessible by public transportation. It features ample
                parking space, a variety of food and beverage stalls, and
                comfortable seating arrangements.
              </p>
              <p className="mb-4">
                Address: 123 Event Street, City, State, ZIP Code
              </p>
              <p className="mb-4">Contact: (123) 456-7890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
