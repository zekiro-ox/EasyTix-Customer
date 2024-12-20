import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import TransitionWrapper from "./TransitionWrapper";
import CustomerLoginPage from "./Login";
import CustomerSignUpPage from "./SignUp";
import CustomerHomePage from "./Home";
import EventsPage from "./Event";
import BuyTicketPage from "./BuyTicket";
import ContactUsPage from "./Contact";
import Profile from "./Profile";
import PrivacyPolicyModal from "./PrivacyPolicy";
import TermsAndConditionsModal from "./TermsCondition";
import ProtectedRoute from "./ProtectedRoute";
import Modal from "react-modal"; // Import Modal
import "./App.css";
import "./transitions.css";

Modal.setAppElement("#root"); // Set the app element globally, replace '#root' with your app's root element ID

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const nodeRef = React.useRef(null);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTermsAndConditionsOpen, setIsTermsAndConditionsOpen] =
    useState(false);

  return (
    <>
      <TransitionGroup>
        <TransitionWrapper
          key={location.key}
          nodeRef={nodeRef}
          classNames="fade"
          timeout={300}
        >
          <Routes location={location}>
            <Route
              path="/login"
              element={<CustomerLoginPage setAuth={setIsAuthenticated} />}
            />
            <Route
              path="/customer-homepage"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={CustomerHomePage}
                />
              }
            />
            <Route path="/signup" element={<CustomerSignUpPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route
              path="/buy-ticket"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={BuyTicketPage}
                />
              }
            />
            <Route
              path="/contact-us"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={ContactUsPage}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  element={Profile}
                />
              }
            />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </TransitionWrapper>
      </TransitionGroup>
      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onRequestClose={() => setIsPrivacyPolicyOpen(false)}
      />
      <TermsAndConditionsModal
        isOpen={isTermsAndConditionsOpen}
        onRequestClose={() => setIsTermsAndConditionsOpen(false)}
      />
    </>
  );
}

export default App;
