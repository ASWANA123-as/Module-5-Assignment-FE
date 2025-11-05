import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Register from "./Components/Register";
import Home from "./Pages/Home";
import Login from "./Components/Login";
import TaskDashboard from "./Components/Taskdashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import api from "./Components/api";
import Admindashboard from "./Components/Admindashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
      console.log(user)
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  return (
    <Router>
      {/* ✅ Pass user to Navbar */}
      <Navbar isLoggedIn={isLoggedIn} user={user} setIsLoggedIn={setIsLoggedIn} />
{console.log({user},'ooo')}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Admindashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/common"
            element={
              <ProtectedRoute roles={["student","professional"]}>
                <TaskDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// ✅ Navbar now receives user as prop
function Navbar({ isLoggedIn, user, setIsLoggedIn }) {
  const nav = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await api.post("auth/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setIsLoggedIn(false);
      nav("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed, please try again.");
    }
  };

  return (
    <nav className="bg-gray-900 text-white py-3 px-6 shadow-md flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-lg font-semibold hover:text-blue-400 transition">
          🏠 Home
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/register" className="hover:text-blue-400 transition">
              Register
            </Link>
            <Link to="/login" className="hover:text-blue-400 transition">
              Login
            </Link>
          </>
        )}

        {/* ✅ Conditional links based on user role */}
       
        {isLoggedIn && user?.userType === "admin" && (
          <Link to="/admin" className="hover:text-blue-400 transition">
            Admin Dashboard
          </Link>
        )}

        {isLoggedIn && user?.userType !== "admin" && (
          <Link to="/common" className="hover:text-blue-400 transition">
            My Tasks
          </Link>
        )}


      </div>


      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default App;
