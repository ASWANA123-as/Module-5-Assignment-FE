import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="max-w-3xl bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
        
        {/* 🌟 Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-indigo-600">TaskManager</span>
        </h1>

        {/* 💬 Subtitle */}
        <p className="text-gray-600 text-lg mb-8">
          Organize your daily tasks, stay productive, and manage your goals efficiently — 
          all in one place.  
        </p>

        {/* 🚀 Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-200"
          >
            Login
          </Link>
        </div>

        {/* 💡 Info section */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Why Choose TaskManager?
          </h2>
          <ul className="text-gray-600 space-y-2 text-left mx-auto max-w-md">
            <li>✅ Simple and intuitive task tracking</li>
            <li>✅ Secure login & role-based access</li>
            <li>✅ Fast, responsive, and easy to use</li>
            <li>✅ Manage tasks from anywhere</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
