
import React from "react";
import GifBanner from "../components/GifBanner";
import ProfileCard from "../components/ProfileCard";
import Pets from "../components/Pets";
import StatsBars from "../components/StatsBars";
import RadarChartBlock from "../components/RadarChartBlock";
import HeatmapCalendar from "../components/HeatmapCalendar";
import StartButton from "../components/StartButton";

function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col p-4">
      <GifBanner />

      {/* Profile and Stats Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
        <div className="w-full md:w-1/3">
          <ProfileCard />
        </div>
        <div className="flex flex-col w-full md:w-2/3 gap-2">
          <Pets />
          <StatsBars />
        </div>
      </div>

      {/* Radar and Heatmap Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
        <RadarChartBlock />
        <HeatmapCalendar />
      </div>

      {/* Start Button */}
      <StartButton />
    </div>
  );
}

export default Dashboard;
