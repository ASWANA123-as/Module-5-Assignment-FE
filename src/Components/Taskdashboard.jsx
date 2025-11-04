import React, { useEffect, useState } from "react";
import api from "./api";

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
//To get user specefic tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/task/getusertask"); 
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };
//Add task
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/task/Addtask", form);
      setForm({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };
//Toggle complete and incomplete
  const toggleComplete = async (id, completed) => {
    try {
      await api.put(`/task/updatetask/${id}`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };
//delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/task/deletetask/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b">
          Your Tasks
        </h2>

        {/* Add Task Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-gray-50 p-5 rounded-xl border"
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Add New Task
          </h3>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Task title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border p-2 rounded-md"
              required
            />

            <textarea
              placeholder="Task description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-2 rounded-md"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </form>

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="p-5 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  
                  {/* Task Title + Description */}
                  <div>
                    <h3
                      className={`text-lg font-semibold ${
                        task.completed ? "line-through text-gray-500" : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {task.description || "No description"}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        toggleComplete(task._id, task.completed)
                      }
                      className={`px-3 py-1 rounded-md text-sm ${
                        task.completed
                          ? "bg-yellow-500 text-white hover:bg-yellow-600"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TaskDashboard;
