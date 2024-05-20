import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CustomerLoginPage from "./Login";
import CustomerSignUpPage from "./SignUp";
import CustomerHomePage from "./Home";
import EventsPage from "./Event";
import BuyTicketPage from "./BuyTicket";
import ContactUsPage from "./Contact"; // Import the home page component
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/signup" element={<CustomerSignUpPage />} />
        <Route path="/customer-homepage" element={<CustomerHomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/buy-ticket" element={<BuyTicketPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
