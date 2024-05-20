import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, UserCircleIcon } from "@heroicons/react/outline";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [inquiriesHistory, setInquiriesHistory] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const inquiriesHistoryData = [
    {
      id: 1,
      userMessage: "I have an issue with my ticket purchase.",
      adminReply:
        "Your issue has been resolved, please check your email for the updated ticket.",
      date: "2023-04-01",
    },
    {
      id: 2,
      userMessage: "I have an issue with my ticket purchase.",
      adminReply:
        "Your issue has been resolved, please check your email for the updated ticket.",
      date: "2023-04-01",
    },
    {
      id: 3,
      userMessage: "I have an issue with my ticket purchase.",
      adminReply:
        "Your issue has been resolved, please check your email for the updated ticket.",
      date: "2023-04-01",
    },
    {
      id: 4,
      userMessage: "I have an issue with my ticket purchase.",
      adminReply:
        "Your issue has been resolved, please check your email for the updated ticket.",
      date: "2023-04-01",
    },
    // ... more history items
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Us form submitted", { name, email, message });
    // Here you would typically send the message to your backend
  };

  useEffect(() => {
    // Here you would typically fetch the inquiries history from your backend
    setInquiriesHistory(inquiriesHistoryData);
  }, []);

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
                  src="Customer\src\assets\EasyTix.svg"
                  alt="EasyTix"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="Customer\src\assets\EasyTix.svg"
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
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold"
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
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4 sm:p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-60"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-60"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-60"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-60 sm:w-80 bg-neutral-950 text-white p-2 rounded-md hover:bg-blue-400"
          >
            Send Message
          </button>
        </form>
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Inquiries History
          </h3>
          <div className="space-y-4">
            {inquiriesHistory.map((inquiry) => (
              <div key={inquiry.id} className="bg-white p-4 rounded-md shadow">
                <p className="text-sm text-gray-600">Date: {inquiry.date}</p>
                <p className="text-sm">Your Message: {inquiry.userMessage}</p>
                <p className="text-sm font-bold">Admin: {inquiry.adminReply}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
