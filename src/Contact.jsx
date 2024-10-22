import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toast notifications

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [inquiriesHistory, setInquiriesHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userId = user.uid; // Get the current user's ID

      // Create or update the user's document in the messages collection
      const userDocRef = doc(db, "messages", userId);
      await setDoc(
        userDocRef,
        {
          name: name || user.displayName, // Use current user name if available
          email: email || user.email, // Use current user email if available
        },
        { merge: true }
      );

      // Add the user's concern to the subcollection
      const concernsRef = collection(userDocRef, "concerns");
      await addDoc(concernsRef, {
        message,
        date: new Date().toISOString(), // Store the date in ISO format
        adminResponse: "", // Initialize admin response as empty
      });

      // Show toast notification
      toast.success("Message Sent!"); // Display success message

      console.log("Contact Us form submitted", { name, email, message });

      // Reset the form fields after submission
      setName("");
      setEmail("");
      setMessage("");
    } else {
      console.error("No user is signed in.");
    }
  };

  useEffect(() => {
    // Fetch inquiries history from Firestore
    const fetchInquiriesHistory = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, "messages", user.uid);
        const concernsRef = collection(userDocRef, "concerns");
        const snapshot = await getDocs(concernsRef);
        const history = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setInquiriesHistory(history);
      }
    };

    fetchInquiriesHistory();
  }, []);

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <ToastContainer /> {/* Add ToastContainer to your component */}
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
              value={name} // Control the input value
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
              value={email} // Control the input value
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
              value={message} // Control the input value
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
                        {inquiry.message}
                      </p>
                      <p className="text-white">
                        <span className="font-semibold">Date:</span>{" "}
                        {inquiry.date}
                      </p>
                      <p className="text-white">
                        <span className="font-semibold">Admin Response:</span>{" "}
                        {inquiry.adminResponse
                          ? inquiry.adminResponse
                          : "Your concern is being processed"}
                      </p>
                    </div>
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
