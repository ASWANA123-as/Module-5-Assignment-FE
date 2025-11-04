import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
//login
function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
//submit form
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("auth/login", formData);
      localStorage.setItem("token", res.data.token);
       localStorage.setItem("user", JSON.stringify(res.data));

      setIsLoggedIn(true)

      if (res.data?.userType === "admin") {
        nav("/admin");
      } else {
        nav("/common");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login to taskmanager
        </h2>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handle}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handle}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
