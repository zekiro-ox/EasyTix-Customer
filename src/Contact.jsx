import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [inquiriesHistory, setInquiriesHistory] = useState([]);

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

  return (
    <div className="bg-white-200 min-h-screen">
      <nav className="bg-neutral-950 p-4 text-white rounded-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">EasyTix</div>
          <div className="flex gap-4">
            <Link to="/customer-homepage" className="hover:text-blue-400">
              Home
            </Link>
            <Link to="/events" className="hover:text-blue-400">
              Events
            </Link>
            <Link to="/buy-ticket" className="hover:text-blue-400">
              Buy Ticket
            </Link>
            <Link to="/contact-us" className="font-bold hover:text-blue-400">
              Contact Us
            </Link>
            <Link to="/logout" className="hover:text-blue-400">
              Logout
            </Link>
          </div>
        </div>
      </nav>
      <div className="container p-10">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-sm drop-shadow-lg"
        >
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
              className="mt-1 p-2 border border-gray-300 rounded-md w-80"
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
              className="mt-1 p-2 border border-gray-300 rounded-md w-80"
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
              className="mt-1 p-2 border border-gray-300 rounded-md w-80"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-80 bg-neutral-950 text-white p-2 rounded-md hover:bg-blue-400"
          >
            Send Message
          </button>
        </form>
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Inquiries History</h3>
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
