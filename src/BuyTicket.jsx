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
  const [paymentStatus, setPaymentStatus] = useState(null);

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

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const userDoc = doc(db, "users", user.uid); // Reference to the user's document
        const docSnap = await getDoc(userDoc); // Fetch the document

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setEmail(user.email); // Set the email from Firebase Auth
          setPhoneNumber(userData.phoneNumber || ""); // Set the phone number from Firestore
        }

        // Check if selectedEvent is not null before fetching purchase history
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
      const price = selectedTicket ? selectedTicket.price : 0;
      setTotalAmount(price * quantity);
    }
  }, [selectedTicketType, quantity, ticketOptions]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email); // Set the email state to the current user's email
    }
  }, []);

  const handlePaymentSuccess = async (details) => {
    // Display payment success message
    setPaymentStatus("Payment successful!"); // Popup message
  };

  const handlePurchase = async (details) => {
    // Get the current user's UID
    const auth = getAuth();
    const userId = auth.currentUser.uid; // Move this line up

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
      quantity, // Keep the ticket ID in the QR code data
    });

    // Create the new purchase object
    const newPurchase = {
      uid: userId, // Store the user's UID instead of the ticket ID
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
      eventPosterURL: selectedEvent?.eventPosterURL,
      qrCodeData,
      purchaseTimestamp: new Date(), // Include timestamp with both date and time
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

    // Use the ticket ID as the document ID for purchases
    if (!ticketExists) {
      // Save the new purchase
      await setDoc(
        doc(customerRef, ticketID), // Use ticketID as the document ID
        {
          ...newPurchase,
        }
      ); // No need for merge since we are creating a new document

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
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userDoc = doc(db, " users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setEmail(user.email);
          setPhoneNumber(userData.phoneNumber || "");
        }
      }
      setQuantity(1);
      setSelectedTicketType(
        ticketOptions.length > 0 ? ticketOptions[0].type : ""
      );
      toast.success("Ticket Purchased");
    } else {
      // Optionally, alert the user that the ticket ID already exists
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

      if (paypal && totalAmount > 0) {
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
  }, [totalAmount, ticketOptions]); // Ensure dependencies are correct // Also include ticketOptions in the dependency array

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

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <ToastContainer /> {/* Add ToastContainer to your component */}
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
                <div id="paypal-button-container" className="my-4" />
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
