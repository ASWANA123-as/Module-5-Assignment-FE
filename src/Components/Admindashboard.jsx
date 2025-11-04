import React, { useEffect, useState } from "react";
import api from "./api";

function AdminDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api
      .get("/task/gettask")
      .then((res) => {
        console.log(res.data, "ooo");
        const data = Array.isArray(res.data.data)
          ? res.data.data
          : res.data.tasks;
        console.log(data, "iiii");
        setTasks(data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Admin Dashboard — All Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks found.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((t) => (
              <li
                key={t._id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {t.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {t.description || "No description provided."}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  👤 <span className="font-medium">{t.owner?.email || "Unknown"}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
