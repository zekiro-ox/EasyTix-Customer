import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const premadeAccount = {
    email: "user@example.com",
    password: "password123",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === premadeAccount.email &&
      password === premadeAccount.password
    ) {
      console.log("Login successful");
      navigate("/customer-homepage");
    } else {
      console.error("Invalid credentials");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center scroll-smooth focus:scroll-auto">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <form onSubmit={handleLogin} className="space-y-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Login to EasyTix
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
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-1">
              <label htmlFor="show-password" className="text-sm text-gray-600">
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
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-neutral-950 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-blue-400 cursor-pointer"
              >
                Sign-up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerLoginPage;
