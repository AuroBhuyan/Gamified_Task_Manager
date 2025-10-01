import React from "react";
import {Link} from "react-router-dom";

const Dashboard = () => {
  const card = (title, desc, to) => (
    <Link to={to} className="no-underline text-inherit">
      <div className="border p-4 rounded w-56 shadow-sm">
        <h3 className="mb-2">{title}</h3>
        <div className="text-gray-500 text-sm">{desc}</div>
      </div>
    </Link>
  );

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <div className="flex gap-4">
        {card("Tasks", "Create and complete tasks", "/tasks")}
        {card("Quest", "Generate & fight Pokemon", "/quest")}
        {card("Profile", "View Captured Pokemon & Coins", "/profile")}
      </div>
    </div>
  );
};

export default Dashboard;
