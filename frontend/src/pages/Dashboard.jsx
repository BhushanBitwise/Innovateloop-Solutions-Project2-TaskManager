import { useEffect, useState } from "react";
import axios from "../api/axios";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    const res = await axios.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (data) => {
    await axios.post("/tasks", data);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(`/tasks/${task._id}`, {
      status: task.status === "completed" ? "pending" : "completed"
    });
    fetchTasks();
  };

  const updateTask = async (id, data) => {
    await axios.put(`/tasks/${id}`, data);
    fetchTasks();
  };

  // 📌 FILTER LOGIC
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  // 📌 COUNTS
  const totalCount = tasks.length;
  const completedCount = tasks.filter(
    (t) => t.status === "completed"
  ).length;
  const pendingCount = tasks.filter(
    (t) => t.status === "pending"
  ).length;

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Dashboard
      </h1>

      {/* COUNT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded shadow text-center">
          <p>Total Tasks</p>
          <h2 className="text-2xl font-bold">{totalCount}</h2>
        </div>

        <div className="bg-green-500 text-white p-4 rounded shadow text-center">
          <p>Completed</p>
          <h2 className="text-2xl font-bold">{completedCount}</h2>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded shadow text-center">
          <p>Pending</p>
          <h2 className="text-2xl font-bold">{pendingCount}</h2>
        </div>
      </div>

      {/* ADD TASK */}
      <TaskForm onAdd={addTask} />

      {/* FILTER BUTTONS */}
      <div className="flex justify-center gap-4 my-4 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded ${
            filter === "completed"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded ${
            filter === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Pending
        </button>
      </div>

      {/* TASK LIST */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks found.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTask}
              onUpdate={updateTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
