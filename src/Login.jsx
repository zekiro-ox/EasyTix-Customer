import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Logo from "./assets/CompanyLogo.png";

const CustomerLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      navigate("/customer-homepage");
    } catch (error) {
      console.error("Invalid credentials", error.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
        <div className="flex items-center justify-center mb-8">
          <img src={Logo} alt="Company Logo" className="h-20 w-auto" />
        </div>
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <h2
            className="text-center text-3xl font-extrabold text-violet-500"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Sign In
          </h2>
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-1">
              <label
                htmlFor="show-password"
                className="text-sm text-gray-300"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                <input
                  id="show-password"
                  type="checkbox"
                  className="mr-1"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                Show Password
              </label>
            </div>
          </div>
          {error && (
            <div
              className="text-sm text-center text-red-500"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {error}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-800 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Sign in
            </button>
          </div>
          <div
            className="text-sm text-center text-gray-400"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-violet-500 hover:text-violet-300"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Sign-up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerLoginPage;
