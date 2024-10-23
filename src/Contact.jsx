import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  addDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundImage from "./assets/Background.jpg";

const ContactUsPage = () => {
  const [message, setMessage] = useState("");
  const [inquiriesHistory, setInquiriesHistory] = useState([]);
  const [userName, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userId = user.uid;

      const userDocRef = doc(db, "messages", userId);
      await setDoc(
        userDocRef,
        {
          name: userName,
          email: user.email,
        },
        { merge: true }
      );

      const concernsRef = collection(userDocRef, "concerns");
      await addDoc(concernsRef, {
        message,
        date: new Date().toISOString(),
        adminResponse: "", // You can set this later based on your logic
      });

      toast.success("Message Sent!");
      console.log("Contact Us form submitted", { message });
      setMessage("");
      fetchInquiriesHistory();
    } else {
      console.error("No user is signed in.");
    }
  };

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

  useEffect(() => {
    const fetchUserName = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const fullName = `${userData.firstName} ${userData.lastName}`;
          setUserName(fullName);
        } else {
          console.error("User  document does not exist");
        }
      }
    };

    fetchInquiriesHistory();
    fetchUserName();
  }, []);

  return (
    <div className="min-h-screen text-white relative">
      <ToastContainer />
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="relative">
        <div
          className="fixed inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        />
        <div className="fixed inset-0 bg-gray-900 bg-opacity-25 backdrop-blur-sm" />
        <div className="relative z-10">
          <div className="bg-neutral-900 py-12 px-6 md:mx-20 lg:mx-60 bg-opacity-75 backdrop-blur-md">
            <h2
              className="text-3xl font-bold mb-4 text-center text-violet-500"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Contact Us
            </h2>
            <div className="overflow-y-auto max-w-lg mx-auto h-96 border border-gray-700 rounded-md p-4 mb-4">
              {inquiriesHistory.length > 0 ? (
                inquiriesHistory.map((inquiry) => (
                  <div key={inquiry.id} className="mb-4">
                    <div
                      className={`flex ${
                        inquiry.adminResponse ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          inquiry.adminResponse
                            ? "bg-violet-600"
                            : "bg-neutral-600"
                        } text-white`}
                      >
                        <div className="font-semibold">
                          {inquiry.adminResponse ? "Admin" : userName}:
                        </div>
                        <div className="text-gray-400 text-sm">
                          {inquiry.date}
                        </div>
                        <div className="text-gray-300">{inquiry.message}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No inquiries history available.</p>
              )}
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-lg mx-auto"
            >
              <div className="mb-4">
                <textarea
                  id="message"
                  name="message"
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-neutral-700 text-white"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              </div>
              <button
                type="submit"
                className="text-white px-4 py-2 rounded-md font-bold bg-violet-500 hover:bg-violet-600"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
