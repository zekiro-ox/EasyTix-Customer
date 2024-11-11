import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./assets/CompanyLogo.png";
import { auth } from "./config/firebase"; // Import the Firebase auth object
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth methods
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import styles
import PrivacyPolicyModal from "./PrivacyPolicy";
import TermsAndConditionsModal from "./TermsCondition"; // Import the modal component

const CustomerSignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true); // Track password validity
  const [agreedToTerms, setAgreedToTerms] = useState(false); // Track agreement to terms
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false); // Track privacy policy modal visibility
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false); // Track modal visibility
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,16}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be 12-16 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    // Check if password is similar to username or email
    const lowerCaseUsername = username.toLowerCase();
    const lowerCaseEmail = email.toLowerCase();
    const lowerCasePassword = password.toLowerCase();

    if (
      lowerCasePassword.includes(lowerCaseUsername) ||
      lowerCasePassword.includes(lowerCaseEmail)
    ) {
      toast.error(
        "Password should not contain parts of your username or email."
      );
      return;
    }

    if (!agreedToTerms) {
      toast.error(
        "You must agree to the Privacy Policy and Terms and Conditions."
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;

      // Save username to Firestore
      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        createdAt: new Date().toISOString(), // Optional: Save the creation date
      });

      console.log("Sign-up successful", user);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.error("Error signing up", error);
      toast.error(error.message); // Show error message as toast
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValid(validatePassword(newPassword)); // Update validity on change
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-neutral-900">
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-center mb-8">
          <img src={Logo} alt="Company Logo" className="h-20 w-auto" />
        </div>
        <form onSubmit={handleSignUp} className="mt-8 space-y-6">
          <h2
            className="text-center text -3xl font-extrabold text-violet-500"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Create an Account
          </h2>
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            {!passwordValid && password && (
              <div className="text-red-500 text-xs mt-1">
                Password must be 12-16 characters long, include at least one
                uppercase letter, one lowercase letter, one number, and one
                special character.
              </div>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="show-password"
                name="show-password"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-300 rounded"
                onChange={togglePasswordVisibility}
              />
              <label
                htmlFor="show-password"
                className="ml-2 block text-sm text-gray-300"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Show password
              </label>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-300 rounded"
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
            />
            <label
              htmlFor="agree-terms"
              className="ml-2 block text-sm text-gray-300"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              I agree to the{" "}
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-violet-500 hover:text-violet-300"
              >
                Privacy Policy
              </button>{" "}
              and{" "}
              <button
                type="button"
                onClick={() => setIsTermsModalOpen(true)}
                className="text-violet-500 hover:text-violet-300"
              >
                Terms and Conditions
              </button>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-800 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Sign up
            </button>
          </div>
          <div
            className="text-sm text-center text-gray-400"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-violet-500 hover:text-violet-700"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Log in here
            </Link>
          </div>
        </form>
      </div>
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onRequestClose={() => setIsPrivacyModalOpen(false)}
      />
      <TermsAndConditionsModal
        isOpen={isTermsModalOpen}
        onRequestClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
};

export default CustomerSignUpPage;
