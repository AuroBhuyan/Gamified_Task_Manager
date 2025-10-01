import React, { useEffect, useState } from "react";
import { getQuest, generateQuest, attackQuest, getUser } from "../api";

const Quest = () => {
  const [quest, setQuest] = useState(null);
  const [pending, setPending] = useState(0);

  const load = async () => {
    try {
      const q = await getQuest();
      setQuest(q);
    } catch (e) {
      console.error(e);
    }
    try {
      const u = await getUser();
      setPending(u.accumulatedDamage || 0);
    } catch (e) {}
  };

  useEffect(() => {
    load();
  }, []);

  const onGenerate = async () => {
    try {
      await generateQuest();
      await load();
    } catch (e) {
      alert(e.message);
    }
  };

  const onAttack = async () => {
    try {
      const res = await attackQuest();
      alert(
        res.captured
          ? `Captured ${res.pokemon.name}!`
          : `Dealt ${res.damage} damage`
      );
      await load();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Quest</h2>

      <div className="flex gap-3">
        <div className="w-72 border p-3 rounded">
          <div className="mb-2">
            Pending Attack: <strong>{pending}</strong>
          </div>

          {quest ? (
            <>
              <img src={quest.sprite} alt={quest.name} className="w-24 mb-2" />
              <div>
                <strong>{quest.name}</strong> ({quest.type})
              </div>
              <div>
                HP: {quest.hp} / {quest.maxHp}
              </div>
            </>
          ) : (
            <div>No active quest</div>
          )}

          <div className="mt-3 flex gap-2">
            <button
              onClick={onGenerate}
              className="px-2 py-1 border rounded bg-gray-100 text-sm"
            >
              Generate
            </button>
            <button
              onClick={onAttack}
              className="px-2 py-1 border rounded bg-green-100 text-sm"
            >
              Attack (use pending damage)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quest;
