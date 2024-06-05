import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, UserCircleIcon } from "@heroicons/react/outline";

const EventsPage = () => {
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
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-light"
                  >
                    Home
                  </Link>
                  <Link
                    to="/events"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold"
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
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-light"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
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
      <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="lg:w-1/3">
            <div className="w-full h-64 bg-gray-300 rounded-lg mb-4">
              <img
                src="src/assets/Manawari.jpg"
                alt="MANAWARI"
                className="rounded-lg mb-4 w-full object-cover h-full"
              />
            </div>
            <h2 className="text-xl font-bold">MANAWARI</h2>
            <p>December 17, 2023</p>
            <p>5:00 PM</p>
            <p>CCA Quadrangle</p>
            <Link to="/buy-ticket" className="no-underline text-black">
              <button
                type="button"
                className="w-full bg-neutral-950 text-white p-2 rounded-md hover:bg-blue-400"
              >
                Buy Ticket Now
              </button>
            </Link>
          </div>
          <div className="lg:w-2/3 lg:pl-10">
            <h3 className="text-lg font-bold mb-3">Event Description</h3>
            <div className="event-description mb-4 bg-white p-4 rounded-lg shadow-lg">
              <p className="mb-4">
                Experience the vibrant performances and immerse yourself in the
                rhythm of the night.
              </p>
              <p className="mb-4">
                The CCA Quadrangle is a spacious outdoor venue that offers a
                perfect setting for live performances. With state-of-the-art
                sound and lighting systems, every note of music and every beat
                will resonate with crystal clarity. The venue is easily
                accessible by public transportation and has ample parking for
                those who prefer to drive.
              </p>
              <p className="mb-4">
                Each ticket type is designed to provide a unique experience
                tailored to your preferences. Whether you want to be in the
                heart of the action or enjoy the concert with a bit more
                comfort, there's a ticket just for you.
              </p>
              <p className="mb-4">
                Join us for an unforgettable evening at MANAWARI. Let's
                celebrate the power of music and community together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
