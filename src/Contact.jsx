import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

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
    <div className="bg-neutral-900 min-h-screen text-white">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="container mx-auto p-4 sm:p-10 bg-neutral-800 rounded-lg shadow-lg mt-12">
        <h2
          className="text-3xl font-bold mb-4 text-center text-violet-500"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-60 bg-neutral-700 text-white"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-60 bg-neutral-700 text-white"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-white"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-neutral-700 text-white"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-white px-4 py-2 rounded-md font-bold bg-violet-500 hover:bg-violet-600"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Send Message
          </button>
        </form>
        <div className="mt-8">
          <h3
            className="text-2xl font-bold mb-4 text-violet-500"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Inquiries History
          </h3>
          {inquiriesHistory.length > 0 ? (
            <ul>
              {inquiriesHistory.map((inquiry) => (
                <li
                  key={inquiry.id}
                  className="mb-4 p-4 border border-gray-700 rounded-md bg-neutral-800"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white">
                        <span className="font-semibold">User Message:</span>{" "}
                        {inquiry.userMessage}
                      </p>
                      <p className="text-white">
                        <span className="font-semibold">Admin Reply:</span>{" "}
                        {inquiry.adminReply}
                      </p>
                    </div>
                    <div className="text-gray-400 text-sm">{inquiry.date}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No inquiries history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
