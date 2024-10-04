import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import QRCode from "qrcode.react";
import SeatMap from "./assets/SEATMAP.png";

const BuyTicketPage = () => {
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

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <Navbar />
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
