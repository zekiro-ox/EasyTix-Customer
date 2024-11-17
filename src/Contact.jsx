import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundImage from "./assets/Background.jpg";

const ContactUsPage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [userName, setUserName] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userId = user.uid;
      const newMessage = {
        sender: userId,
        subject,
        message,
        timestamp: new Date().toISOString(),
      };

      try {
        // Create a new conversation in Firestore
        const conversationRef = doc(collection(db, "conversations"));
        await setDoc(conversationRef, newMessage);

        // Optimistically update the state
        setConversations((prevConversations) => [
          { id: conversationRef.id, ...newMessage },
          ...prevConversations,
        ]);

        toast.success("Message Sent!");
        console.log("Contact Us form submitted", { subject, message });
        setSubject("");
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message. Please try again.");
      }
    } else {
      console.error("No user is signed in.");
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setCurrentUserId(user.uid); // Store the current user's ID
      const db = getFirestore();
      const conversationsRef = collection(db, "conversations");

      const unsubscribe = onSnapshot(conversationsRef, (snapshot) => {
        const convos = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Reverse the order of conversations

        setConversations(convos);
      });

      return () => unsubscribe();
    }
  }, []);

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
          <div className="bg-neutral-900 py-12 px-6 md:mx-20 lg:mx-80 bg-opacity-75 backdrop-blur-md">
            <h2
              className="text-3xl font-bold mb-4 text-center text-violet-500"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Contact Us
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-lg mx-auto"
            >
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-neutral-700 text-white"
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                >
                  <option value="" disabled>
                    Select a problem
                  </option>
                  <option value="Ticket Availability">
                    Ticket Availability
                  </option>
                  <option value="Payment Issues">Payment Issues</option>
                  <option value="Refund Requests">Refund Requests</option>
                  <option value="Event Information">Event Information</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <textarea
                  id="message"
                  name="message"
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-neutral-700 text-white"
                  placeholder="Your message"
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
            <div className="overflow-y-auto max-w-lg mx-auto h-96 border border-gray-700 rounded-md p-4 mb-4 mt-4">
              {conversations.length > 0 ? (
                conversations.map(
                  (conversation) =>
                    conversation.sender === currentUserId && (
                      <div key={conversation.id} className="mb-4">
                        <div className="bg-neutral-600 p-4 rounded-lg shadow-md">
                          <div className="font-semibold">{userName}:</div>
                          <div className="text-gray-400 text-sm">
                            {new Date(conversation.timestamp).toLocaleString()}
                          </div>
                          <div className="text-gray-300">
                            <strong>Subject:</strong> {conversation.subject}
                          </div>
                          <div className="text-gray-300">
                            {conversation.message}
                          </div>
                          {/* Fetch and display replies */}
                          <div className="mt-2">
                            <h4 className="font-semibold text-gray-200">
                              Replies:
                            </h4>
                            <div className="space-y-2">
                              {/* Assuming replies are stored in a subcollection */}
                              <Replies conversationId={conversation.id} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )
              ) : (
                <p className="text-gray-400">No conversations available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Replies = ({ conversationId }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const repliesRef = collection(
      db,
      "conversations",
      conversationId,
      "replies"
    );

    const unsubscribe = onSnapshot(repliesRef, (snapshot) => {
      const fetchedReplies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReplies(fetchedReplies);
    });

    return () => unsubscribe();
  }, [conversationId]);

  return (
    <div>
      {replies.length > 0 ? (
        replies.map((reply) => (
          <div key={reply.id} className="bg-neutral-500 p-2 rounded-md mb-2">
            <div className="font-semibold">Admin:</div>
            <div className="text-gray-300">{reply.reply}</div>
            <div className="text-gray-400 text-sm">
              {new Date(reply.timestamp).toLocaleString()}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No replies yet.</p>
      )}
    </div>
  );
};

export default ContactUsPage;
