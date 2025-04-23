import React from "react";
import { useNavigate } from "react-router-dom";
import { FaDumbbell, FaHeartbeat, FaShippingFast, FaTag } from "react-icons/fa";

const MUSCLE_GROUPS = [
  { group: "Chest", path: "/dashboard/musclegroups/chest", icon: <FaDumbbell size={40} className="text-yellow-400 mb-2" /> },
  { group: "Legs", path: "/dashboard/musclegroups/legs", icon: <FaShippingFast size={40} className="text-yellow-400 mb-2" /> },
  { group: "Core", path: "/dashboard/musclegroups/core", icon: <FaHeartbeat size={40} className="text-yellow-400 mb-2" /> },
  { group: "Arms", path: "/dashboard/musclegroups/arms", icon: <FaTag size={40} className="text-yellow-400 mb-2" /> }
];

const muscleDescriptions = {
  Chest: "Build pressing power and upper body size with classic chest exercises.",
  Legs: "Strengthen your foundation with squats, lunges, and more.",
  Core: "Stabilize and protect your body with core-focused movements.",
  Arms: "Grow your biceps, triceps, and grip with targeted arm workouts."
};

export default function ExerciseLibrary() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 min-h-[80vh] rounded shadow-xl p-8 mb-6 text-blue-100 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold mb-8 text-yellow-400 drop-shadow tracking-wide text-center">Explore Muscle Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full max-w-5xl">
        {MUSCLE_GROUPS.map(g => (
          <button
            key={g.group}
            onClick={() => navigate(g.path)}
            className="flex flex-col items-center bg-blue-900 bg-opacity-70 rounded-2xl shadow-lg p-8 hover:bg-blue-800 transition group border-b-4 border-yellow-400 hover:scale-105 w-full"
          >
            {g.icon}
            <span className="font-bold text-xl text-yellow-300 mb-2 mt-2 group-hover:text-yellow-400 transition">{g.group}</span>
            <span className="text-blue-200 text-center text-base">{muscleDescriptions[g.group]}</span>
          </button>
        ))}
      </div>
      <div className="mt-12 text-blue-200 text-lg text-center max-w-2xl">
        <span className="font-semibold text-yellow-400">Tip:</span> Click a muscle group to learn anatomy, see top exercises, and get pro tips for building strength and muscle.
      </div>
    </div>
  );
}
