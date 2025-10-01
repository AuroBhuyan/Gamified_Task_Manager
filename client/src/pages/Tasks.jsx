import React, { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  completeTask,
  updateTask,
} from "../api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Others");
  const [coinsReward, setCoinsReward] = useState(5);

  const loadTasks = async () => {
    try {
      const t = await getTasks();
      setTasks(Array.isArray(t) ? t : t.tasks ?? []);
    } catch (err) {
      console.error("Failed to load tasks:", err);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Create new task
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createTask({ title, category, coinsReward: Number(coinsReward) });
      setTitle("");
      setCategory("Others");
      setCoinsReward(5);
      loadTasks();
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  // Complete task
  const handleComplete = async (id) => {
    try {
      await completeTask(id);
      alert("Completed! Check Quest For Updates");
      loadTasks();
    } catch (err) {
      alert(err.message);
    }
  };

  // Update task
  const handleUpdate = async (task) => {
    const newTitle = prompt("Update task title:", task.title);
    if (!newTitle) return;
    const newCategory = prompt(
      "Update category (Physical, Emotional, Mental, Others):",
      task.category
    );
    if (!newCategory) return;
    const newCoins = prompt("Update coins reward:", task.coinsReward);
    if (!newCoins || isNaN(newCoins)) return;

    try {
      await updateTask(task.id, {
        title: newTitle,
        category: newCategory,
        coinsReward: Number(newCoins),
      });
      loadTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Tasks</h2>

      {/* Create Task Form */}
      <form onSubmit={handleCreate} className="mb-3 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
          className="border p-1 rounded flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-1 rounded"
        >
          <option>Physical</option>
          <option>Intellectual</option>
          <option>Spiritual</option>
          <option>Others</option>
        </select>
        <input
          type="number"
          value={coinsReward}
          onChange={(e) => setCoinsReward(e.target.value)}
          placeholder="Coins"
          className="border p-1 rounded w-20"
        />
        <button className="px-3 py-1 border rounded bg-gray-100">Add</button>
      </form>

      {/* Tasks List */}
      <div className="flex flex-col gap-2">
        {(!tasks || tasks.length === 0) && <div>No tasks</div>}
        {tasks.map((t) => (
          <div
            key={t.id}
            className="border p-2 rounded flex justify-between items-start"
          >
            <div>
              <div>
                <strong>{t.title}</strong>{" "}
                <small className="text-gray-500">[{t.category}]</small>
                {" - "}
                <small className="text-gray-500">{t.coinsReward} coins</small>
              </div>
              <div className="text-xs text-gray-500">
                Streak: {t.streak?.current || 0}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleComplete(t.id)}
                className="px-2 py-1 border rounded bg-green-100 text-sm"
              >
                Complete
              </button>
              <button
                onClick={() => handleUpdate(t)}
                className="px-2 py-1 border rounded bg-yellow-100 text-sm"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="px-2 py-1 border rounded bg-red-100 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
