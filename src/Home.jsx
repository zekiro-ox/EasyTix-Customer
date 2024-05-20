import React from "react";
import { Link } from "react-router-dom";

const CustomerHomePage = () => {
  return (
    <div className="bg-white-200 min-h-screen">
      <nav className="bg-neutral-950 p-4 text-white rounded-md">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <div className="text-3xl font-bold">EasyTix</div>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/customer-homepage"
              className="font-bold hover:text-blue-400"
            >
              Home
            </Link>
            <Link to="/events" className="hover:text-blue-400">
              Events
            </Link>
            <Link to="/buy-ticket" className="hover:text-blue-400">
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
