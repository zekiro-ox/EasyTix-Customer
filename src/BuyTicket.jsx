import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Navbar from "./Navbar";
import QRCode from "qrcode.react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PosterPlaceholder from "./assets/SEATMAP.png";
import QRCodeStyling from "qr-code-styling";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TicketPoster from "./assets/Ticket.png";

const BuyTicketPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketOptions, setTicketOptions] = useState([]);
  const [selectedTicketType, setSelectedTicketType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

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

      const storage = getStorage();
      eventsList.forEach((event) => {
        const imageRef = ref(storage, event.eventPosterURL);
        getDownloadURL(imageRef)
          .then((url) => {
            setImageUrls((prevImageUrls) => ({
              ...prevImageUrls,
              [event.id]: url,
            }));
          })
          .catch((error) => {
            console.error(error);
          });
      });

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
      firstName,
      lastName,
      email,
      phoneNumber,
      ticketType: selectedTicketType,
      quantity,
      totalAmount,
      eventName: selectedEvent?.name,
      date: new Date().toLocaleDateString(),
    });

    const newPurchase = {
      firstName,
      lastName,
      email,
      phoneNumber,
      ticketType: selectedTicketType,
      quantity,
      totalAmount,
      date: new Date().toLocaleDateString(),
      eventName: selectedEvent?.name,
      eventId: selectedEvent?.id, // Store the event ID
      eventPosterURL: selectedEvent?.eventPosterURL, // Store the poster URL for the event
      qrCodeData,
    };

    setPurchaseHistory([...purchaseHistory, newPurchase]);

    // Reset form fields after purchase
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setQuantity(1);
    setSelectedTicketType(
      ticketOptions.length > 0 ? ticketOptions[0].type : ""
    );
  };
  const downloadTicket = (purchase, index) => {
    const ticketContainer = document.querySelector(
      `.ticket-container-${index}`
    );

    // Hide the download button
    const downloadButton = ticketContainer.querySelector("button");
    downloadButton.style.display = "none";

    html2canvas(ticketContainer, {
      useCORS: true,
      scale: 2,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", [65, 143]); // Set the paper size to 5.63" x 1.97" (143mm x 50mm)
      pdf.addImage(imgData, "PNG", 0, 0, 65, 143); // Set the image size to the paper size
      pdf.save(`ticket-${purchase.eventName}.pdf`);

      // Show the download button again
      downloadButton.style.display = "block";
    });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: events.length,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="container mx-auto mt-8 p-4 md:p-10 bg-neutral-800 rounded-lg shadow-lg">
        <h2
          className="text-3xl md:text-4xl font-extrabold mb-6"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Choose Your Event
        </h2>

        {events.length > 0 &&
          (events.length === 1 ? (
            <div className="mb-8">
              <div
                key={events[0].id}
                onClick={() => setSelectedEvent(events[0])}
                className={`p-2 cursor-pointer ${
                  selectedEvent?.id === events[0].id
                    ? "border-4 border-violet-500 rounded-lg"
                    : ""
                }`}
              >
                <img
                  src={events[0].eventPosterURL || PosterPlaceholder}
                  alt={events[0].name}
                  className="rounded-lg mb-2 object-cover h-60 w-full"
                />
                <p
                  className="text-center text-lg font-bold"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  {events[0].name}
                </p>
              </div>
            </div>
          ) : (
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
          ))}

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
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-lg font-medium mb-1"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                  {ticketOptions.length > 0 && (
                    <p
                      className="text-sm text-gray-500 mt-1"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      Available Quantity:{" "}
                      {ticketOptions.find(
                        (ticket) => ticket.type === selectedTicketType
                      )?.quantity || 0}
                    </p>
                  )}
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
                  className={`border pb-4 flex flex-col items-center space-y-4 bg-slate-100 mx-auto ticket-container-${index}`}
                >
                  <div className="w-full">
                    <img
                      src={TicketPoster}
                      alt={purchase.eventName}
                      className=" mb-2 object-cover h-60 w-full"
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
                  <button
                    className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => downloadTicket(purchase, index)}
                  >
                    Download Ticket
                  </button>
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
