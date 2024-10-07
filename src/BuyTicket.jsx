import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Navbar from "./Navbar";
import QRCode from "qrcode.react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PosterPlaceholder from "./assets/SEATMAP.png";
import QRCodeStyling from "qr-code-styling";

const BuyTicketPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketOptions, setTicketOptions] = useState([]);
  const [selectedTicketType, setSelectedTicketType] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore();
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);
      if (eventsList.length > 0) {
        setSelectedEvent(eventsList[0]);
        setTicketOptions(eventsList[0].tickets || []); // Use tickets from the selected event
        if (eventsList[0].tickets.length > 0)
          setSelectedTicketType(eventsList[0].tickets[0].type); // Set default ticket type
      }
    };

    fetchEvents();
  }, []);

  // Update ticket options when the selected event changes
  useEffect(() => {
    if (selectedEvent) {
      setTicketOptions(selectedEvent.tickets || []); // Set tickets from the selected event
      if (selectedEvent.tickets.length > 0) {
        setSelectedTicketType(selectedEvent.tickets[0].type); // Set default ticket type
      } else {
        setSelectedTicketType(""); // Reset if no tickets are available
      }
    } else {
      setTicketOptions([]); // Reset ticket options when no event is selected
    }
  }, [selectedEvent]);

  // Update total amount whenever ticket type or quantity changes
  useEffect(() => {
    if (ticketOptions.length > 0) {
      const selectedTicket = ticketOptions.find(
        (ticket) => ticket.type === selectedTicketType
      );
      const price = selectedTicket ? parseFloat(selectedTicket.price) : 0;
      setTotalAmount(price * quantity);
    }
  }, [selectedTicketType, quantity, ticketOptions]);

  const handlePurchase = (e) => {
    e.preventDefault();

    const qrCodeData = JSON.stringify({
      fullName,
      email,
      phoneNumber,
      ticketType: selectedTicketType,
      quantity,
      totalAmount,
      eventName: selectedEvent?.name,
      date: new Date().toLocaleDateString(),
    });

    const newPurchase = {
      fullName,
      email,
      phoneNumber,
      ticketType: selectedTicketType,
      quantity,
      totalAmount,
      date: new Date().toLocaleDateString(),
      eventName: selectedEvent?.name,
      eventPosterURL: selectedEvent?.eventPosterURL, // Store the poster URL for the event
      qrCodeData,
    };

    setPurchaseHistory([...purchaseHistory, newPurchase]);

    // Reset form fields after purchase
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setQuantity(1);
    setSelectedTicketType(
      ticketOptions.length > 0 ? ticketOptions[0].type : ""
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto mt-8 p-4 md:p-10 bg-neutral-800 rounded-lg shadow-lg">
        <h2
          className="text-3xl md:text-4xl font-extrabold mb-6"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Choose Your Event
        </h2>

        {events.length > 0 && (
          <Slider {...sliderSettings} className="mb-8">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`p-2 cursor-pointer ${
                  selectedEvent?.id === event.id
                    ? "border-4 border-violet-500"
                    : ""
                }`}
              >
                <img
                  src={event.eventPosterURL || PosterPlaceholder}
                  alt={event.name}
                  className="rounded-lg mb-2 object-cover h-40 w-full"
                />
                <p
                  className="text-center text-lg font-bold"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  {event.name}
                </p>
              </div>
            ))}
          </Slider>
        )}

        {selectedEvent && (
          <div className="mt-8 flex flex-col md:flex-row justify-between">
            {/* Seat Map Container */}
            <div className="md:w-2/3">
              <div className="h-70 bg-gray-300 rounded-lg mb-5">
                <img
                  src={selectedEvent.seatMapURL || PosterPlaceholder}
                  alt="Seat Map"
                  className="rounded-lg object-cover h-full w-full"
                />
              </div>
            </div>
            <div className="md:w-1/3 ml-0 md:ml-8">
              <form onSubmit={handlePurchase} className="space-y-4">
                <div>
                  <label
                    className="block text-lg font-medium mb-1"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-lg font-medium mb-1"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-lg font-medium mb-1"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-lg font-medium mb-1"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Ticket Type
                  </label>
                  <select
                    value={selectedTicketType}
                    onChange={(e) => setSelectedTicketType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    required
                  >
                    {ticketOptions.length > 0 ? (
                      ticketOptions.map((ticket) => (
                        <option key={ticket.type} value={ticket.type}>
                          {ticket.type}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No tickets available
                      </option>
                    )}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-lg font-medium mb-1"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    min="1"
                    max={
                      ticketOptions.find(
                        (ticket) => ticket.type === selectedTicketType
                      )?.quantity || 10
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
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
                  className="w-full px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-md"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  Purchase
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Purchase History Section Below Form */}
        {purchaseHistory.length > 0 && (
          <div className="mt-12">
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-5"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Purchase History
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {purchaseHistory.map((purchase, index) => (
                <div
                  key={index}
                  className="border rounded-2xl pb-4 flex flex-col items-center space-y-4 bg-slate-200 mx-auto"
                >
                  <div className="w-full">
                    <img
                      src={purchase.eventPosterURL || PosterPlaceholder}
                      alt="Event Poster"
                      className="rounded-t-2xl mb-4 object-cover h-48 w-full"
                    />
                  </div>
                  <div className="text-center">
                    <h3
                      className="text-3xl font-bold mb-2 text-black"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      {purchase.eventName}
                    </h3>
                    <h4
                      className="text-2xl font-semibold mb-2 text-black"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      {purchase.ticketType}
                    </h4>
                  </div>
                  <div className="mt-4">
                    <QRCode value={purchase.qrCodeData} size={200} />
                  </div>
                  <div className="text-center">
                    <p
                      className="text-lg mb-1 text-black"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      Quantity: {purchase.quantity}
                    </p>
                    <p
                      className="text-lg mb-1 text-black"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      Total Amount: ₱{purchase.totalAmount}
                    </p>
                    <p
                      className="text-lg mb-1 text-black"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      Date: {purchase.date}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p
                      className="text-sm text-center text-black mx-5 my-2"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      City College of Angeles, Arayat Blvd., Barangay Pampang,
                      Angeles City, Philippines
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyTicketPage;
