// client/src/pages/Rewards.jsx
import React, { useEffect, useState } from "react";
import {
  getRewards,
  createReward,
  updateReward,
  deleteReward,
  redeemReward,
} from "../api";

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState(10);

  const loadRewards = async () => {
    try {
      const r = await getRewards();
      setRewards(Array.isArray(r) ? r : r.rewards ?? []);
    } catch (err) {
      console.error("Failed to load rewards:", err);
      setRewards([]);
    }
  };

  useEffect(() => {
    loadRewards();
  }, []);

  // Create new reward
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !cost) return;
    try {
      await createReward({ name, cost: Number(cost) });
      setName("");
      setCost(10);
      loadRewards();
    } catch (err) {
      console.error("Failed to create reward:", err);
    }
  };

  // Update reward
  const handleUpdate = async (reward) => {
    const newName = prompt("Update reward name:", reward.name);
    if (!newName) return;
    const newCost = prompt("Update cost:", reward.cost);
    if (!newCost || isNaN(newCost)) return;

    try {
      await updateReward(reward.id, { name: newName, cost: Number(newCost) });
      loadRewards();
    } catch (err) {
      console.error("Failed to update reward:", err);
    }
  };

  // Delete reward
  const handleDelete = async (id) => {
    try {
      await deleteReward(id);
      loadRewards();
    } catch (err) {
      console.error("Failed to delete reward:", err);
    }
  };

  // Redeem reward
  const handleRedeem = async (id) => {
    try {
      await redeemReward(id);
      alert("Reward redeemed! Coins deducted.");
      loadRewards();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Rewards</h2>

      {/* Create Reward Form */}
      <form onSubmit={handleCreate} className="mb-3 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Reward name"
          className="border p-1 rounded flex-1"
        />
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="Cost"
          className="border p-1 rounded w-20"
        />
        <button className="px-3 py-1 border rounded bg-gray-100">Add</button>
      </form>

      {/* Rewards List */}
      <div className="flex flex-col gap-2">
        {(!rewards || rewards.length === 0) && <div>No rewards</div>}
        {rewards.map((r) => (
          <div
            key={r.id}
            className="border p-2 rounded flex justify-between items-start"
          >
            <div>
              <div>
                <strong>{r.name}</strong>{" "}
                <small className="text-gray-500">{r.cost} coins</small>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleRedeem(r.id)}
                className="px-2 py-1 border rounded bg-green-100 text-sm"
              >
                Redeem
              </button>
              <button
                onClick={() => handleUpdate(r)}
                className="px-2 py-1 border rounded bg-yellow-100 text-sm"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(r.id)}
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

export default Rewards;
