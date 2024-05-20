import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BuyTicketPage = () => {
  // State declarations
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
    setPurchaseHistory([
      ...purchaseHistory,
      {
        fullName,
        email,
        phoneNumber,
        ticketType,
        quantity,
        totalAmount,
        date: new Date().toLocaleDateString(),
      },
    ]);
  };

  return (
    <div className="bg-white-200 min-h-screen">
      <nav className="bg-neutral-950 p-4 text-white rounded-md">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <div className="text-2xl font-bold">EasyTix</div>
          <div className="flex gap-4 flex-wrap">
            <Link to="/customer-homepage" className="hover:text-blue-400">
              Home
            </Link>
            <Link to="/events" className="hover:text-blue-400">
              Events
            </Link>
            <Link to="/buy-ticket" className="font-bold hover:text-blue-400">
              Buy Ticket
            </Link>
            <Link to="/contact-us" className="hover:text-blue-400">
              Contact Us
            </Link>
            <Link to="/logout" className="hover:text-blue-400">
              Logout
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto mt-8 p-4 md:p-10 bg-white rounded-lg drop-shadow-lg flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          {/* Placeholder for event image */}
          <div className="h-70 bg-gray-300 rounded-lg mb-5">
            <img
              src="src/assets/SEATMAP.png"
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
