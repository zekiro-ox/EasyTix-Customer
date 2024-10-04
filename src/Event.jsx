import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import PosterPlaceholder from "./assets/Manawari.jpg";
import Navbar from "./Navbar";

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore();
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map((doc) => doc.data());
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto mt-12 px-4">
        {events.length === 0 && (
          <div className="text-center">
            <p className="text-white text-xl">No events available.</p>
          </div>
        )}

        {/* Main Event Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex bg-neutral-800 p-4 rounded-lg drop-shadow-lg"
            >
              {/* Event Poster and Details */}
              <div className="w-1/2 pr-4">
                <img
                  src={event.eventPosterURL || PosterPlaceholder}
                  alt={event.name}
                  className="rounded-lg mb-4 w-full h-60 object-cover"
                />
                <h2
                  className="text-2xl font-extrabold text-violet-500"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  {event.name}
                </h2>
                <p
                  className="text-white"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  {new Date(event.startDate).toLocaleDateString()}
                </p>
                <p
                  className="text-white"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  {formatTime(event.startTime)}
                </p>
                <p
                  className="text-white"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  {event.venue}
                </p>
                <Link to="/buy-ticket" className="no-underline text-black">
                  <button
                    type="button"
                    className="text-white p-2 rounded-md bg-violet-500 hover:bg-violet-600 mt-4"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Buy Ticket Now
                  </button>
                </Link>
              </div>

              {/* Event Description Container */}
              <div className="w-1/2 bg-neutral-700 p-4 rounded-lg shadow-lg">
                <h3
                  className="text-2xl font-semibold mb-3 text-violet-400"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  Event Description
                </h3>
                <div className="event-description mb-4">
                  <p className="text-white mb-4">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
