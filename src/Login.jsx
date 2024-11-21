import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Logo from "./assets/CompanyLogo.png";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import styles

const notify = (message, id, type = "error") => {
  if (!toast.isActive(id)) {
    if (type === "error") {
      toast.error(message, { toastId: id });
    } else if (type === "success") {
      toast.success(message, { toastId: id });
    }
  }
};

const CustomerLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (isLockedOut) {
      const timerDuration = 10 * 60; // 10 minutes in seconds
      if (lockoutTime === null) {
        setLockoutTime(timerDuration);
      }
      const timer = setInterval(() => {
        setLockoutTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsLockedOut(false);
            setFailedAttempts(0);
            return null;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLockedOut, lockoutTime]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLockedOut) {
      notify(
        "Too many failed attempts. Please wait 10 minutes.",
        "lockout-toast"
      );
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        notify("Login successful!", "login-success-toast", "success");
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        setTimeout(() => {
          navigate("/customer-homepage");
        }, 2000);
      } else {
        notify(
          "Email not verified. Please verify your email before logging in.",
          "email-verification-toast"
        );
        await auth.signOut();
      }
    } catch (error) {
      handleFailedAttempt();
    } finally {
      setIsLoading(false);
    }
  };

  const handleFailedAttempt = () => {
    setFailedAttempts((prev) => {
      const attempts = prev + 1;
      if (attempts >= 3) {
        setIsLockedOut(true);
        notify(
          "Too many failed attempts. Please wait 10 minutes.",
          "lockout-toast"
        );
      } else {
        notify(
          "Invalid email or password. Please try again.",
          "invalid-login-toast"
        );
      }
      return attempts;
    });
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      notify("Password reset email sent!", "reset-email-toast", "success");
      setIsEmailSent(true);
    } catch (error) {
      notify("Error sending password reset email.", "reset-error-toast");
    }
  };

  const minutesLeft = Math.floor(lockoutTime / 60);
  const secondsLeft = lockoutTime % 60;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4 py-12 sm:px-6 lg:px-8">
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
        <div className="flex items-center justify-center mb-8">
          <img src={Logo} alt="Company Logo" className="h-20 w-auto" />
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
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
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
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
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-600 focus:border-red-600 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-300 rounded"
                checked={rememberMe}
                onChange={handleRememberMe}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-300"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Remember me
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="show-password"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-300 rounded"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              <label
                htmlFor="show-password"
                className="ml-2 block text-sm text-gray-300"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Show Password
              </label>
            </div>
          </div>
          <div className="text-sm text-gray-300 mb-4">
            {isLockedOut ? (
              <span style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Locked out! Please wait {minutesLeft}m {secondsLeft}s before
                trying again.
              </span>
            ) : (
              failedAttempts > 0 && ( // Only display if failedAttempts is greater than 0
                <span style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  Failed attempts: {failedAttempts}/3
                </span>
              )
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-800 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            disabled={isLoading || isLockedOut}
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V2.5a.5.5 0 00-1 0V4a8 8 0 018 8h1.5a.5.5 0 000-1H20a8 8 0 01-8 8v1.5a.5.5 0 001 0V20a8 8 0 01-8-8H2.5a.5.5 0 000 1H4z"
                  ></path>
                </svg>
                <span style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  Loading...
                </span>
              </div>
            ) : isLockedOut ? (
              <span style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Locked out for 10 minutes
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/signup"
            className="font-medium text-violet-500 hover:text-violet-300"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Don't have an account? Sign up here
          </Link>
        </div>
        <button
          onClick={() => setIsForgotPassword(true)}
          className="mt-4 text-violet-500 hover:text-violet-300"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Forgot Password?
        </button>
      </div>
      {/* Forgot Password Modal */}
      {isForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Reset Password</h3>
            <p className="mb-2">
              Enter your email address to receive a password reset link.
            </p>
            <input
              type="email"
              className="border border-gray-300 rounded p-2 w-full mb-4"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                onClick={handleForgotPassword}
                className="bg-violet-500 text-white px-4 py-2 rounded"
              >
                Send Reset Link
              </button>
              <button
                onClick={() => setIsForgotPassword(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
            {isEmailSent && (
              <p className="text-green-500 mt-4">
                Email sent! Check your inbox.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerLoginPage;
