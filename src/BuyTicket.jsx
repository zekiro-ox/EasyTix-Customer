import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import Navbar from "./Navbar";
import QRCode from "qrcode.react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PosterPlaceholder from "./assets/SEATMAP.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TicketPoster from "./assets/Ticket.png";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TermsAndConditionsModal from "./TermsCondition";

// Modal Component for Seat Selection
const SeatSelectionModal = ({ isOpen, onClose, renderSeats }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-neutral-900 p-5 rounded-lg max-w-2xl w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-center">
          Your seat reference
        </h2>
        <div className="overflow-y-auto max-h-60">{renderSeats()}</div>

        {/* Legend Section */}
        <div className="mt-4">
          <div className="flex justify-center mb-2">
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-red-500 border border-black rounded-full mr-1"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-green-500 border border-black rounded-full mr-1"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-400 border border-black rounded-full mr-1"></div>
              <span>Unoccupied</span>
            </div>
          </div>
        </div>

        <button
          className="mt-4 bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const BuyTicketPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketOptions, setTicketOptions] = useState([]);
  const [selectedTicketType, setSelectedTicketType] = useState("None");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore();
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        // Filter out events with eventStatus "archived"
        .filter((event) => event.eventStatus !== "archived");

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
        setTicketOptions([
          { type: "None", price: 0 },
          ...(eventsList[0].tickets || []),
        ]); // Add "None" option
        if (eventsList[0].tickets.length > 0)
          setSelectedTicketType(eventsList[0].tickets[0].type); // Set default ticket type
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setEmail(user.email);
          setPhoneNumber(userData.phoneNumber || "");
        }

        if (selectedEvent) {
          const purchasesCollection = collection(
            db,
            "events",
            selectedEvent.id,
            "customers"
          );
          const purchasesQuery = query(
            purchasesCollection,
            where("uid", "==", user.uid)
          );
          const purchasesSnapshot = await getDocs(purchasesQuery);
          const purchasesList = purchasesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          purchasesList.sort(
            (a, b) =>
              new Date(b.purchaseTimestamp.toDate()).getTime() -
              new Date(a.purchaseTimestamp.toDate()).getTime()
          );
          setPurchaseHistory(purchasesList);
        }
      }
    };

    fetchUserData();
  }, [selectedEvent]);

  useEffect(() => {
    if (selectedEvent) {
      setTicketOptions([
        { type: "None", price: 0 },
        ...(selectedEvent.tickets || []),
      ]);
      if (selectedEvent.tickets.length > 0) {
        setSelectedTicketType(selectedEvent.tickets[0].type);
        fetchSeatingConfiguration(selectedEvent.tickets[0]);
      }
    } else {
      setTicketOptions([]);
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (ticketOptions.length > 0) {
      const selectedTicket = ticketOptions.find(
        (ticket) => ticket.type === selectedTicketType
      );
      const price = selectedTicket ? selectedTicket.price : 0;
      setTotalAmount(price * quantity);
    }
  }, [selectedTicketType, quantity, ticketOptions]);

  const handleTicketTypeChange = (e) => {
    const ticketType = e.target.value;
    setSelectedTicketType(ticketType);

    if (ticketType !== "None") {
      const selectedTicket = ticketOptions.find(
        (ticket) => ticket.type === ticketType
      );
      if (selectedTicket) {
        fetchSeatingConfiguration(selectedTicket); // Fetch seating configuration for the selected ticket type
        setIsModalOpen(true); // Open modal if ticket type is not "None"
      } else {
        setIsModalOpen(false); // Close modal if "None" is selected
      }
    } else {
      setIsModalOpen(false); // Close modal if "None" is selected
    }
  };

  const fetchSeatingConfiguration = (ticket) => {
    const columns = parseInt(ticket.column); // Get the number of columns from the ticket
    const totalSeats = parseInt(ticket.quantity); // Use quantity as the total number of seats

    // Get the occupied seats from the ticket
    const occupiedSeats = ticket.occupied || 0; // Default to 0 if undefined

    // Calculate the number of rows needed
    const rows = Math.ceil(totalSeats / columns);

    // Create the seats array
    const seats = Array.from({ length: rows }, (_, rowIndex) => {
      return Array.from({ length: columns }, (_, colIndex) => {
        const seatIndex = rowIndex * columns + colIndex;

        // Only mark seats as occupied or available based on the total quantity
        return {
          isOccupied: seatIndex < occupiedSeats, // Mark as occupied if seatIndex is less than occupiedSeats
          isAvailable:
            seatIndex >= occupiedSeats &&
            seatIndex < occupiedSeats + quantity &&
            seatIndex < totalSeats, // Mark as available based on user's selected quantity and total seats
        };
      });
    });
    const trimmedSeats = seats.flat().slice(0, totalSeats);
    const finalSeats = [];

    // Recreate the rows based on the trimmed seats
    for (let i = 0; i < trimmedSeats.length; i += columns) {
      finalSeats.push(trimmedSeats.slice(i, i + columns));
    }

    setSeats(finalSeats);
    updateSelectedSeats(finalSeats); // Update the selected seats based on the initial configuration
  };
  const renderSeats = () => {
    return seats.map((row, rowIndex) => (
      <div key={rowIndex} className="seat-row">
        {" "}
        {/* Use seat-row class for each row */}
        {row.map((seat, colIndex) => (
          <div
            key={colIndex}
            className={`seat ${seat.isAvailable ? "available" : ""} ${
              seat.isOccupied ? "occupied" : ""
            } m-1`}
            style={{
              backgroundColor: seat.isOccupied
                ? "red" // Color for occupied seats
                : seat.isAvailable
                ? "green" // Color for available seats
                : "gray", // Color for unoccupied seats
            }}
          >
            {rowIndex * seats[0].length + (colIndex + 1)}
          </div>
        ))}
      </div>
    ));
  };

  const updateSelectedSeats = (updatedSeats) => {
    const selected = [];
    // Check if seats is properly initialized and has rows
    if (seats.length > 0 && seats[0]) {
      updatedSeats.forEach((row, rowIndex) => {
        row.forEach((seat, colIndex) => {
          if (seat.isAvailable) {
            // Only add available seats
            const seatNumber = rowIndex * seats[0].length + (colIndex + 1);
            selected.push(seatNumber); // Add seat number to the array
          }
        });
      });
    }
    // Join the selected seat numbers into a comma-separated string
    setSelectedSeats(selected.join(",")); // Save as a string
  };

  const isRegistrationOpen = (startDate, endDate) => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return currentDate >= start && currentDate <= end;
  };

  const handlePaymentSuccess = async (details) => {
    // Display payment success message
    setPaymentStatus("Payment successful!"); // Popup message
  };

  const handlePurchase = async (details) => {
    // Get the current user's UID
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    // Generate a unique ticket ID based on type, price, and a random UUID
    const selectedTicket = ticketOptions.find(
      (ticket) => ticket.type === selectedTicketType
    );
    const ticketPrice = selectedTicket ? selectedTicket.price : 0;

    // Create a composite ticket ID
    const ticketID = `${selectedTicketType}-${ticketPrice}-${uuidv4()}`;

    const qrCodeData = JSON.stringify({
      ticketID,
      firstName,
      lastName,
      email,
      phoneNumber,
      ticketType: selectedTicketType,
      quantity,
      occupiedSeats: selectedSeats, // Add the selected seats here
    });

    // Create the new purchase object
    const newPurchase = {
      uid: userId,
      firstName,
      lastName,
      email,
      phoneNumber,
      ticketType: selectedTicketType,
      quantity,
      totalAmount,
      date: new Date().toLocaleDateString(),
      eventName: selectedEvent?.name,
      eventId: selectedEvent?.id,
      eventPosterURL: selectedEvent?.eventPosterURL,
      qrCodeData,
      purchaseTimestamp: new Date(),
      occupiedSeats: selectedSeats, // Save the occupied seats
    };

    // Check if the ticket ID already exists for the same user
    const ticketExists = purchaseHistory.some(
      (purchase) =>
        purchase.eventId === selectedEvent.id && purchase.ticketID === ticketID
    );

    // Save the purchase in Firestore using the ticket ID as the document ID
    const db = getFirestore();
    const eventRef = doc(db, "events", selectedEvent.id);
    const customerRef = collection(eventRef, "customers");

    if (!ticketExists) {
      // Save the new purchase
      await setDoc(doc(customerRef, ticketID), {
        ...newPurchase,
      });

      // Update the purchase history state
      setPurchaseHistory((prevHistory) => {
        const newHistory = [newPurchase, ...prevHistory];
        newHistory.sort(
          (a, b) =>
            new Date(b.purchaseTimestamp).getTime() -
            new Date(a.purchaseTimestamp).getTime()
        );
        return newHistory;
      });

      // Update the occupied field in the event document
      const tickets = selectedEvent.tickets.map((ticket) => {
        if (ticket.type === selectedTicketType) {
          // Increase the occupied count
          return {
            ...ticket,
            occupied: (ticket.occupied || 0) + quantity, // Ensure to initialize if undefined
            remainingQuantity:
              (ticket.remainingQuantity || ticket.quantity) - quantity, // Update remainingQuantity
          };
        }
        return ticket;
      });

      // Update the event document
      await setDoc(eventRef, { tickets }, { merge: true });

      // Reset form fields
      setQuantity(1);
      setSelectedTicketType(
        ticketOptions.length > 0 ? ticketOptions[0].type : ""
      );
      toast.success("Ticket Purchased");
    } else {
      alert("You already purchased a ticket with this ID for this event.");
    }
  };

  useEffect(() => {
    const paypal = window.paypal;

    const paypalButtonContainer = document.getElementById(
      "paypal-button-container"
    );
    if (paypalButtonContainer) {
      paypalButtonContainer.innerHTML = ""; // Clear existing buttons

      if (paypal && totalAmount > 0 && agreedToTerms) {
        paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "PHP",
                      value: totalAmount.toString(), // Convert to string
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const details = await actions.order.capture();
              await handlePaymentSuccess(details);
              // Call the success handler

              // Call handlePurchase after successful payment
              await handlePurchase(details); // Pass the payment details if needed
            },
            onError: (error) => {
              handlePaymentError(error);
            },
          })
          .render(paypalButtonContainer); // Render the button in the cleared container
      }
    }
  }, [totalAmount, ticketOptions, agreedToTerms]); // Ensure dependencies are correct // Also include ticketOptions in the dependency array

  const handlePaymentError = (error) => {
    // Handle payment error
    setPaymentStatus("Payment failed. Please try again.");
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

  const formatOccupiedSeats = (occupiedSeats) => {
    if (!occupiedSeats) return ""; // Return empty string if no seats

    // Split the string into an array of numbers
    const seatsArray = occupiedSeats.split(",").map(Number);

    // Get the first and last seat numbers
    const firstSeat = Math.min(...seatsArray);
    const lastSeat = Math.max(...seatsArray);

    // If all seats are the same, return just that seat
    if (firstSeat === lastSeat) {
      return `${firstSeat}`;
    }

    // Return the formatted string
    return `${firstSeat}-${lastSeat}`;
  };
  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <ToastContainer />
      <div className="sticky top-0 z-50 navbar">
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
            <div className="md:w-2/3">
              <div className="h-70 bg-gray-300 rounded-lg mb-5">
                <img
                  src={selectedEvent.seatMapURL || PosterPlaceholder}
                  alt="Seat Map"
                  className="rounded-lg object-cover h-full w-full"
                />
              </div>
              <SeatSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                renderSeats={renderSeats}
              />
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
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    pattern="[0-9]{11}"
                    maxLength={11}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    required
                  />
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
                  <label
                    className="block text-lg font-medium mb-1"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Ticket Type
                  </label>
                  <select
                    value={selectedTicketType}
                    onChange={handleTicketTypeChange}
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
                      )?.remainingQuantity !== undefined
                        ? ticketOptions.find(
                            (ticket) => ticket.type === selectedTicketType
                          ).remainingQuantity
                        : ticketOptions.find(
                            (ticket) => ticket.type === selectedTicketType
                          )?.quantity || 0}
                    </p>
                  )}
                </div>

                <div>
                  <p
                    className="text-lg font-bold mb-1"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    Total Amount: ₱{totalAmount}
                  </p>
                </div>
                {isRegistrationOpen(
                  selectedEvent.startDate,
                  selectedEvent.endDate
                ) ? (
                  <div id="paypal-button-container" className="my-4" />
                ) : (
                  <p className="text-red-500">
                    Ticket sales are currently closed.
                  </p>
                )}
                <div className="flex items-center">
                  <input
                    id="agree-terms"
                    name="agree-terms"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-300 rounded"
                    checked={agreedToTerms}
                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                  />
                  <label
                    htmlFor="agree-terms"
                    className="ml-2 block text-sm text-gray-300"
                    style={{ fontFamily: "Bebas Neue, sans-serif" }}
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() => setIsTermsModalOpen(true)}
                      className="text-violet-500 hover:text-violet-300"
                    >
                      Terms and Conditions
                    </button>
                  </label>
                </div>
              </form>
            </div>
          </div>
        )}

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
                      Seats: {formatOccupiedSeats(purchase.occupiedSeats)}
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
                      className="text-sm text-center text-black mx-5"
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
      <TermsAndConditionsModal
        isOpen={isTermsModalOpen}
        onRequestClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
};

export default BuyTicketPage;
