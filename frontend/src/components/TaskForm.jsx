import { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [form, setForm] = useState({ title: "", description: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ title: "", description: "" });
  };

  return (
    <form onSubmit={submitHandler} className="bg-white p-4 shadow rounded mb-4">
      <input
        type="text"
        placeholder="Task title"
        className="w-full mb-2 p-2 border rounded"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full mb-2 p-2 border rounded"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
