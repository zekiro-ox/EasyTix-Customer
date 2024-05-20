import React from "react";
import { Link } from "react-router-dom";

const EventsPage = () => {
  return (
    <div className="bg-white-200 min-h-screen">
      <nav className="bg-neutral-950 p-4 text-white rounded-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">EasyTix</div>
          <div className="flex gap-4">
            <Link to="/customer-homepage" className="hover:text-blue-400">
              Home
            </Link>
            <Link to="/events" className="font-bold hover:text-blue-400">
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
      <div className="container mx-auto mt-8 p-10 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3">
            <div className="w-full h-96 bg-gray-300 rounded-lg mb-4">
              <img
                src="src/assets/Manawari.jpg"
                alt="MANAWARI"
                className="rounded-lg mb-4"
              />
            </div>
            <h2 className="text-xl font-bold">MANAWARI</h2>
            <p>December 17, 2023</p>
            <p>5:00 PM</p>
            <p>CCA Quadrangle</p>
            <Link to="/buy-ticket" className="no-underline text-black">
              <button
                type="button"
                className="w-80 bg-neutral-950 text-white p-2 rounded-md hover:bg-blue-400"
              >
                Buy Ticket Now
              </button>
            </Link>
          </div>
          <div className="lg:w-2/3 lg:pl-10">
            <h3 className="text-lg font-bold mb-3">Event Description</h3>
            <div className="event-description mb-4 bg-white p-10 rounded-lg shadow-lg">
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
