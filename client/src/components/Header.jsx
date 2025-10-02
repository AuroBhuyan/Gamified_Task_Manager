import React, { useEffect, useState } from "react";
import { getUser } from "../api";
import { Link } from "react-router-dom";

const Header = () => {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const user = await getUser();
        if (mounted) setCoins(user.coins ?? 0);
      } catch (e) {}
    })();
    return () => (mounted = false);
  }, []);

  return (
    <header className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
      <div className="font-bold">
        <Link to="/" >
        TaskMon
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div>
          💰<strong>{coins}</strong>
        </div>
        <Link to="/profile">Profile</Link>
      </div>
    </header>
  );
};

export default Header;
