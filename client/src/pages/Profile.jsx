import React, { useEffect, useState } from "react";
import { getUserPokemons, getUser } from "../api";

const Profile = () => {
  const [pokemons, setPokemons] = useState([]);
  const [user, setUser] = useState({ coins: 0 });

  useEffect(() => {
    (async () => {
      const p = await getUserPokemons();
      setPokemons(p || []);
      const u = await getUser();
      setUser(u || { coins: 0 });
    })();
  }, []);

  return (
    <div>
      <h2 className="mb-2 text-lg font-bold">Profile</h2>
      <div className="mb-4">
        Coins: <strong>{user.coins}</strong>
      </div>

      <h3 className="mb-2 font-semibold">Captured Pokémon</h3>
      <div className="flex flex-wrap gap-3">
        {pokemons.length === 0 && <div>No Pokémon yet</div>}
        {pokemons.map((p) => (
          <div
            key={p._id}
            className="border p-2 rounded w-30 flex flex-col items-center"
          >
            <img src={p.sprite} alt={p.name} className="w-18 mb-1" />
            <div className="capitalize">{p.name}</div>
            <div className="text-xs text-gray-500">{p.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
