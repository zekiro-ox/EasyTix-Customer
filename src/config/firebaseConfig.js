// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
