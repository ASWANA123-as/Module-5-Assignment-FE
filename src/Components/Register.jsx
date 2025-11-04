import React, { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
//Register
function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    userType: "agent",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const nav = useNavigate();

  const handle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
//submit
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("auth/register", formData);
      console.log("Register success:", res.data);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => nav("/login"), 2000);
    } catch (err) {
      console.error("Register failed:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <div className="flex gap-4">
            <input
              name="firstname"
              type="text"
              placeholder="First name"
              onChange={handle}
              required
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              name="lastname"
              type="text"
              placeholder="Last name"
              onChange={handle}
              required
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email address"
            onChange={handle}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handle}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <select
            name="userType"
            value={formData.userType}
            onChange={handle}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="professional">professional</option>
          </select>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
