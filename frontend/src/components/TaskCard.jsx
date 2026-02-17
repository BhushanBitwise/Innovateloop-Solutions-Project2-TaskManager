import { useState } from "react";

const TaskCard = ({ task, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description
  });

  const handleUpdate = () => {
    onUpdate(task._id, editData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      {isEditing ? (
        <>
          <input
            className="w-full mb-2 p-2 border rounded"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3
            className={`font-semibold text-lg ${
              task.status === "completed"
                ? "line-through text-gray-500"
                : ""
            }`}
          >
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {task.description}
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onToggle(task)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              {task.status === "completed" ? "Undo" : "Done"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(task._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
