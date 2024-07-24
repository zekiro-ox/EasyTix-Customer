// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGB8n15ba9HlEGiFREJPCYTacNby1SXtk",
  authDomain: "easytix-24a63.firebaseapp.com",
  projectId: "easytix-24a63",
  storageBucket: "easytix-24a63.appspot.com",
  messagingSenderId: "1038735170459",
  appId: "1:1038735170459:web:40b38ba0f1f5c568809f3e",
  measurementId: "G-VXQGPHGFKH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, analytics };
