import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { TransitionGroup } from "react-transition-group"; // Import transition components
import TransitionWrapper from "./TransitionWrapper"; // Import your new wrapper
import CustomerLoginPage from "./Login";
import CustomerSignUpPage from "./SignUp";
import CustomerHomePage from "./Home";
import EventsPage from "./Event";
import BuyTicketPage from "./BuyTicket";
import ContactUsPage from "./Contact";
import Profile from "./Profile";
import "./App.css";
import "./transitions.css"; // Import your CSS transitions

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation(); // Get the current location
  const nodeRef = React.useRef(null); // Create a ref for the transition

  return (
    <TransitionGroup>
      <TransitionWrapper
        key={location.key}
        nodeRef={nodeRef}
        classNames="fade"
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/login" element={<CustomerLoginPage />} />
          <Route path="/signup" element={<CustomerSignUpPage />} />
          <Route path="/customer-homepage" element={<CustomerHomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/buy-ticket" element={<BuyTicketPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </TransitionWrapper>
    </TransitionGroup>
  );
}

export default App;
