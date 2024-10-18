import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import Navbar from "./Navbar";
import BackgroundImage from "./assets/Background.jpg"; // Adjust this path to your background image

const Profile = () => {
  const [user, setUser] = useState(null); // State to hold user info
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [firstName, setFirstName] = useState(""); // State for first name
  const [lastName, setLastName] = useState(""); // State for last name
  const [username, setUsername] = useState(""); // State for username
  const [bio, setBio] = useState(""); // State for bio
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const [imageUrl, setImageUrl] = useState(""); // State for image URL

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth(); // Get the Firebase Auth instance
      const currentUser = auth.currentUser; // Get the current user

      if (currentUser) {
        const db = getFirestore(); // Get Firestore instance
        const userDoc = doc(db, "users", currentUser.uid); // Reference to the user's document
        const docSnap = await getDoc(userDoc); // Fetch the document

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser({
            username: userData.username,
            email: userData.email,
            joined: new Date(userData.createdAt).toLocaleDateString(), // Format the joined date
            bio: userData.bio || "",
            profilePicture: userData.profilePicture || "",
            phoneNumber: userData.phoneNumber || "", // Add phone number
          });
          // Set initial values for editing
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setUsername(userData.username || "");
          setBio(userData.bio || "");
          setImageUrl(userData.profilePicture || "");
          setPhoneNumber(userData.phoneNumber || ""); // Set initial phone number
        } else {
          setError("No user data found");
        }
      } else {
        setError("No user is currently logged in");
      }

      setLoading(false); // Set loading to false after fetching user info
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleSave = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const db = getFirestore();
      const userDoc = doc(db, "users", currentUser.uid);

      // Update user data in Firestore
      await updateDoc(userDoc, {
        firstName,
        lastName,
        username,
        bio,
        phoneNumber, // Save the phone number
        profilePicture: imageUrl, // Save the image URL
      });

      setUser((prevUser) => ({
        ...prevUser,
        username,
        firstName,
        lastName,
        bio,
        phoneNumber, // Update the state with the new phone number
        profilePicture: imageUrl, // Update the state with the new image URL
      }));
      setIsEditing(false); // Disable edit mode
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `userProfilePicture/${file.name}`); // Create a reference to the file location

      // Upload the file
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef); // Get the download URL
      setImageUrl(url); // Set the image URL state
      setProfilePicture(file); // Set the profile picture state
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>; // Show loading message
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Show error message
  }

  return (
    <div className="min-h-screen text-white">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="relative">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        />
        {/* Backdrop with Blur Effect */}
        <div className="fixed inset-0 bg-gray-900 bg-opacity-25 backdrop-blur-sm" />
        <div className="relative z-10">
          <div className="bg-neutral-900 py-12 px-6 md:mx-20 lg:mx-60 bg-opacity-75 backdrop-blur-md">
            <h1
              className="text-3xl font-bold text-center mb-6"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Profile
            </h1>
            <div className="container mx-auto flex justify-center">
              <div className="bg-neutral-800 p-6 rounded-lg drop-shadow-lg w-full max-w-3xl">
                {/* Profile Information */}
                {isEditing ? (
                  <>
                    <h2
                      className="text-2xl font-extrabold text-violet-500 mb-4"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      Edit Profile
                    </h2>
                    <label
                      className="block mb-4"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      Profile Picture:
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt="Profile Picture"
                          className="w-24 h-24 rounded-full mb-4 mt-4"
                        />
                      )}
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="bg-neutral-900 p-2 rounded-md w-full"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      />
                    </label>
                    <div>
                      <label
                        className="block text-lg font-medium mb-1"
                        style={{ fontFamily: "Bebas Neue, sans-serif" }}
                      >
                        First Name:
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-neutral-900 p-2 rounded-md w-full mb-2"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-lg font-medium mb-1"
                        style={{ fontFamily: "Bebas Neue, sans-serif" }}
                      >
                        Last Name:
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-neutral-900 p-2 rounded-md w-full mb-2"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-lg font-medium mb-1"
                        style={{ fontFamily: "Bebas Neue, sans-serif" }}
                      >
                        Username:
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-neutral-900 p-2 rounded-md w-full mb-2"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-lg font-medium mb-1"
                        style={{ fontFamily: "Bebas Neue, sans-serif" }}
                      >
                        Phone Number:
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-neutral-900 p-2 rounded-md w-full mb-2"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-lg font-medium mb-1"
                        style={{ fontFamily: "Bebas Neue, sans-serif" }}
                      >
                        Email:
                      </label>
                      <p className="bg-neutral-900 p-2 rounded-md w-full mb-2">
                        {user.email}
                      </p>
                    </div>
                    <div>
                      <label
                        className="block text-lg font-medium mb-1"
                        style={{ fontFamily: "Bebas Neue, sans-serif" }}
                      >
                        Bio:
                      </label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="bg-neutral-900 p-2 rounded-md w-full mb-2"
                      />
                    </div>
                    <button
                      type="button"
                      className="text-white p-2 rounded-md bg-violet-500 hover:bg-violet-600 mt-4"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center mb-4">
                      {user.profilePicture && (
                        <img
                          src={user.profilePicture}
                          alt="Profile Picture"
                          className="w-24 h-24 rounded-full mb-4"
                        />
                      )}
                      <h2
                        className="text-2xl font-extrabold text-violet-500 mb-4 text-center"
                        style={{ fontFamily: "Bebas Neue, sans-serif" }}
                      >
                        {user.username}
                      </h2>
                    </div>
                    <p
                      className="text-white mb-2"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      Email: {user.email}
                    </p>
                    <p
                      className="text-white mb-4"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      Phone Number: {user.phoneNumber}
                    </p>
                    <p
                      className="text-white mb-2"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      Joined: {user.joined}
                    </p>
                    <p
                      className="text-white mb-4"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                    >
                      Bio: {user.bio}
                    </p>
                    <button
                      type="button"
                      className="text-white p-2 rounded-md bg-violet-500 hover:bg-violet-600 mt-4"
                      style={{ fontFamily: "Bebas Neue, sans-serif" }}
                      onClick={handleEdit}
                    >
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
