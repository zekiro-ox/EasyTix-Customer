import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, UserCircleIcon } from "@heroicons/react/outline";
import QRCode from "qrcode.react";

const BuyTicketPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketType, setTicketType] = useState("VIP SEATED");
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [ticketsAvailable, setTicketsAvailable] = useState({
    "GEN AD (LW)": 100,
    "GEN AD (RW)": 100,
    "GEN AD (C)": 400,
    "GEN AD (Standing)": 200,
    "VIP STANDING": 100,
    "VIP SEATED": 50,
  });
  const ticketPrices = {
    "GEN AD (LW)": 400,
    "GEN AD (RW)": 400,
    "GEN AD (C)": 450,
    "GEN AD (Standing)": 300,
    "VIP STANDING": 1000,
    "VIP SEATED": 1500,
  };

  useEffect(() => {
    const price = ticketPrices[ticketType];
    setTotalAmount(price * quantity);
  }, [ticketType, quantity, ticketPrices]);

  const handlePurchase = (e) => {
    e.preventDefault();

    // Create a unique QR code data for each purchase
    const qrCodeData = JSON.stringify({
      fullName,
      email,
      phoneNumber,
      ticketType,
      quantity,
      totalAmount,
      date: new Date().toLocaleDateString(),
    });

    // Create a new purchase object including the QR code data
    const newPurchase = {
      fullName,
      email,
      phoneNumber,
      ticketType,
      quantity,
      totalAmount,
      date: new Date().toLocaleDateString(),
      qrCodeData, // Store the QR code data in the purchase object
    };

    // Add the new purchase to the purchase history
    setPurchaseHistory([...purchaseHistory, newPurchase]);
  };

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
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-light"
                  >
                    Events
                  </Link>
                  <Link
                    to="/buy-ticket"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold"
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
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-light"
            >
              Events
            </Link>
            <Link
              to="/buy-ticket"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
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
      <div className="container mx-auto mt-8 p-4 md:p-10 bg-white rounded-lg drop-shadow-lg flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          {/* Placeholder for event image */}
          <div className="h-70 bg-gray-300 rounded-lg mb-5">
            <img
              src="https://www.canva.com/design/DAGHRY7KQfI/uS_md9KyQRUqtIFVdMJYCw/view"
              alt="MANAWARI"
              className="rounded-lg mb-4 w-full"
            />
          </div>
          <div className="flex justify-between">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-1 mx-auto"></div>
              <span>Screen</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full mb-1 mx-auto"></div>
              <span>GEN AD</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-yellow-500 rounded-full mb-1 mx-auto"></div>
              <span>VIP STANDING</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-red-500 rounded-full mb-1 mx-auto"></div>
              <span>VIP SEATED</span>
            </div>
          </div>
          <h2 className="mt-10 text-xl font-bold">MANAWARI</h2>
          <p>December 17, 2023</p>
          <p>5:00 PM</p>
          <p>CCA Quadrangle</p>
        </div>
        <div className="w-full md:w-1/2 pl-0 md:pl-10 mt-10 md:mt-0">
          <form onSubmit={handlePurchase}>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ticketType"
                className="block text-sm font-medium text-gray-700"
              >
                Choose Ticket
              </label>
              <select
                id="ticketType"
                name="ticketType"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
              >
                <option value="GEN AD (LW)">GEN AD (LW) (₱ 400)</option>
                <option value="GEN AD (RW)">GEN AD (RW) (₱ 400)</option>
                <option value="GEN AD (C)">GEN AD (C) (₱ 450)</option>
                <option value="GEN AD (Standing)">
                  GEN AD (Standing) (₱ 300)
                </option>
                <option value="VIP STANDING">VIP STANDING (₱ 1000)</option>
                <option value="VIP SEATED">VIP SEATED (₱ 1500)</option>
              </select>
              <p className="text-sm mt-2">
                Tickets Available: {ticketsAvailable[ticketType]}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Choose Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">
                Total Amount: ₱{totalAmount}
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-neutral-950 text-white p-2 rounded-md hover:bg-blue-400"
            >
              Purchase
            </button>
          </form>
        </div>
      </div>
      <div className="purchase-history mt-10 p-4 border-t border-gray-200">
        <h3 className="text-xl font-bold mb-4">Purchase History</h3>
        <ul className="list-none">
          {purchaseHistory.map((purchase, index) => (
            <li
              key={index}
              className="mb-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex justify-center mt-4">
                <QRCode
                  value={purchase.qrCodeData}
                  size={128}
                  includeMargin={true}
                />
              </div>
              <p className="text-sm font-semibold">
                <span className="text-gray-600">Full Name:</span>{" "}
                {purchase.fullName}
              </p>
              <p className="text-sm font-semibold">
                <span className="text-gray-600">Email:</span> {purchase.email}
              </p>
              <p className="text-sm font-semibold">
                <span className="text-gray-600">Phone Number:</span>{" "}
                {purchase.phoneNumber}
              </p>
              <p className="text-sm font-semibold">
                <span className="text-gray-600">Ticket Type:</span>{" "}
                {purchase.ticketType}
              </p>
              <p className="text-sm font-semibold">
                <span className="text-gray-600">Quantity:</span>{" "}
                {purchase.quantity}
              </p>
              <p className="text-sm font-semibold">
                <span className="text-gray-600">Total Amount:</span> ₱
                {purchase.totalAmount}
              </p>
              <p className="text-sm font-semibold">
                <span className="text-gray-600">Date:</span> {purchase.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BuyTicketPage;
