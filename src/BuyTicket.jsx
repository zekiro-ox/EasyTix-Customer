import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, UserCircleIcon } from "@heroicons/react/outline";
import QRCode from "qrcode.react";
import SeatMap from "./assets/SEATMAP.png";

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
                    className="text-white hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-lg font-light"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Events
                  </Link>
                  <Link
                    to="/buy-ticket"
                    className="text-white hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-lg font-bold"
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
              className="text-white hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-light"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Events
            </Link>
            <Link
              to="/buy-ticket"
              className="text-white hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
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
      <div className="container mx-auto mt-8 p-4 md:p-10 bg-neutral-800 rounded-lg shadow-lg flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          {/* Placeholder for event image */}
          <div className="h-70 bg-gray-300 rounded-lg mb-5">
            <img
              src={SeatMap}
              alt="MANAWARI"
              className="rounded-lg object-cover h-full w-full"
            />
          </div>
          <div className="space-y-2 mb-4">
            <h2
              className="text-3xl md:text-4xl font-extrabold"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Buy Tickets
            </h2>
          </div>
          <form onSubmit={handlePurchase} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-lg font-medium mb-1"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium mb-1"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-lg font-medium mb-1"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="ticketType"
                className="block text-lg font-medium mb-1"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Ticket Type
              </label>
              <select
                id="ticketType"
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
                required
              >
                <option value="VIP SEATED">VIP SEATED</option>
                <option value="VIP STANDING">VIP STANDING</option>
                <option value="GEN AD (LW)">GEN AD (LW)</option>
                <option value="GEN AD (RW)">GEN AD (RW)</option>
                <option value="GEN AD (C)">GEN AD (C)</option>
                <option value="GEN AD (Standing)">GEN AD (Standing)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-lg font-medium mb-1"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
                max={ticketsAvailable[ticketType]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
                required
              />
            </div>
            <div>
              <p
                className="text-lg font-bold mb-1"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Total Amount: ₱{totalAmount}
              </p>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2  bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-md"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Purchase
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 md:ml-8 mt-8 md:mt-0">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-5"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Purchase History
          </h2>
          <div className="space-y-4">
            {purchaseHistory.map((purchase, index) => (
              <div
                key={index}
                className="border p-4 rounded-md bg-neutral-700 border-neutral-600"
              >
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  {purchase.ticketType}
                </h3>
                <p
                  className="text-lg mb-2"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  {purchase.fullName}
                </p>
                <p
                  className="text-lg mb-2"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  {purchase.email}
                </p>
                <p
                  className="text-lg mb-2"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  {purchase.phoneNumber}
                </p>
                <p
                  className="text-lg mb-2"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  Quantity: {purchase.quantity}
                </p>
                <p
                  className="text-lg mb-2"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  Total Amount: ₱{purchase.totalAmount}
                </p>
                <p
                  className="text-lg mb-2"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  Date: {purchase.date}
                </p>
                <div className="mt-4">
                  {/* Render the QR code for the purchase */}
                  <QRCode value={purchase.qrCodeData} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTicketPage;
