import React, { useState } from "react";
import { Link } from "react-router-dom";

const CustomerSignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add validation for password and confirm password match
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    // Handle sign-up logic here
    console.log("Sign-up credentials", { username, email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-black">
      <div className="w-full max-w-md space-y-8">
        <form onSubmit={handleSignUp} className="mt-8 space-y-6">
          <h2
            className="text-center text-3xl font-extrabold text-red-600"
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
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
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
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
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
              onChange={(e) => setPassword(e.target.value)}
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            />
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
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
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
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Sign up
            </button>
          </div>
          <div
            className="text-sm text-center text-gray-400"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Don't have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-red-600 hover:text-red-700"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Log in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignUpPage;
