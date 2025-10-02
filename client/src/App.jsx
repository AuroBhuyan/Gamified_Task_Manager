import React from "react";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Quest from "./pages/Quest";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Rewards from "./pages/Rewards";

const App = () => {
  return (
    <div>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rewards" element={<Rewards />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
