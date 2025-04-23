import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import WorkoutPlan from "./WorkoutPlan";
import ProgressTracker from "./ProgressTracker";
import ExerciseLibrary from "./ExerciseLibrary";
import NutritionTips from "./NutritionTips";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaDumbbell, FaChartLine, FaBookOpen, FaLeaf, FaHome, FaRunning, FaHeartbeat, FaBolt, FaUserShield } from "react-icons/fa";

const workoutOptions = [
  {
    name: "Bodybuilding",
    icon: <FaDumbbell size={48} className="text-yellow-400" />,
    description: "Hypertrophy-focused routines for muscle growth and sculpting.",
  },
  {
    name: "Endurance",
    icon: <FaRunning size={48} className="text-blue-400" />,
    description: "Boost stamina and cardiovascular health with endurance plans.",
  },
  {
    name: "Strength & Condition",
    icon: <FaBolt size={48} className="text-green-400" />,
    description: "Powerlifting and conditioning for raw strength and resilience.",
  },
  {
    name: "Athlete Plan",
    icon: <FaUserShield size={48} className="text-red-400" />,
    description: "Advanced, sport-specific workouts for athletes.",
  },
];

const TABS = [
  { name: "Dashboard Home", component: <DashboardAnimations /> },
  { name: "Workout Plan", component: <WorkoutPlan /> },
  { name: "Progress", component: <ProgressTracker /> },
  { name: "Exercise Library", component: <ExerciseLibrary /> },
  { name: "Nutrition", component: <NutritionTips /> },
];

const sidebarLinks = [
  { name: "Dashboard Home", icon: <FaHome size={24} /> },
  { name: "Workout Plan", icon: <FaDumbbell size={24} /> },
  { name: "Progress", icon: <FaChartLine size={24} /> },
  { name: "Exercise Library", icon: <FaBookOpen size={24} /> },
  { name: "Nutrition", icon: <FaLeaf size={24} /> },
];

const DASHBOARD_BG_IMAGE = "/images/exercize-database.jpg";

function DashboardAnimations() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-2xl font-bold text-blue-100 mb-8">Welcome to your dashboard!</h2>
      <div className="w-full flex flex-wrap justify-center gap-8 mb-10">
        {workoutOptions.map(option => (
          <div
            key={option.name}
            className="flex flex-col items-center bg-black bg-opacity-60 rounded-2xl shadow-xl p-8 w-64 hover:scale-105 hover:shadow-2xl transition transform cursor-pointer border-2 border-transparent hover:border-yellow-400"
          >
            <div className="mb-4">{option.icon}</div>
            <h3 className="text-xl font-bold text-yellow-300 mb-2 tracking-wide">{option.name}</h3>
            <p className="text-blue-100 text-center text-base mb-2">{option.description}</p>
            <button className="mt-4 px-5 py-2 bg-yellow-400 text-blue-900 font-bold rounded-lg shadow hover:bg-yellow-300 transition">Start</button>
          </div>
        ))}
      </div>
      <div className="flex gap-8 flex-wrap justify-center items-center mt-8">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow">
          <circle cx="60" cy="60" r="50" stroke="#FFD600" strokeWidth="8" fill="none"/>
          <circle cx="60" cy="60" r="35" stroke="#2563eb" strokeWidth="6" fill="none" strokeDasharray="55 40" strokeDashoffset="20"/>
        </svg>
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce">
          <rect x="20" y="40" width="56" height="16" rx="8" fill="#38bdf8"/>
          <rect x="44" y="20" width="8" height="56" rx="4" fill="#38bdf8"/>
        </svg>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
          <ellipse cx="50" cy="50" rx="40" ry="20" fill="#22d3ee" opacity="0.6"/>
          <ellipse cx="50" cy="50" rx="20" ry="10" fill="#2563eb" opacity="0.9"/>
        </svg>
      </div>
      <p className="mt-8 text-blue-200 text-lg font-semibold">Track your progress, plan workouts, and get inspired!</p>
    </div>
  );
}

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };
  const isRootDashboard = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      backgroundImage: `url(${DASHBOARD_BG_IMAGE})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      position: "relative"
    }}>
      <div className="min-h-screen flex flex-col" style={{ minHeight: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-black bg-opacity-95 shadow-lg">
          <div className="flex items-center">
            <button
              className="text-4xl font-extrabold text-yellow-400 drop-shadow tracking-wide font-serif hover:underline focus:outline-none"
              style={{ fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '2px' }}
              onClick={() => {
                setTab(0);
                navigate("/dashboard");
              }}
            >
              GETUM Fitness
            </button>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-blue-100 font-semibold text-lg">Hey, {user?.name || "Fitness Fan"}!</span>
            <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-800 shadow-md">Logout</button>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 bg-black bg-opacity-95 p-6 flex flex-col space-y-6 border-r-2 border-black min-h-full sticky top-0 shadow-xl">
            <div className="flex flex-col items-center mb-6">
              <img src="/images/lean pose.jpg" alt="Sidebar Visual" className="w-32 h-32 object-cover rounded-xl border-2 border-black shadow mb-2" onError={e => e.target.style.display='none'} />
              <span className="text-blue-200 text-sm mt-2">Sidebar Visual</span>
            </div>
            <nav className="flex flex-col gap-2">
              {sidebarLinks.map((link, i) => (
                <button
                  key={link.name}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-blue-100 transition hover:bg-black hover:text-yellow-300 text-lg ${tab === i ? "bg-black border-l-4 border-yellow-400" : ""}`}
                  onClick={() => {
                    setTab(i);
                    if (link.name === "Dashboard Home") navigate("/dashboard");
                    if (link.name === "Workout Plan") navigate("/dashboard");
                    if (link.name === "Progress") navigate("/dashboard");
                    if (link.name === "Exercise Library") navigate("/dashboard/exerciselibrary");
                    if (link.name === "Nutrition") navigate("/dashboard");
                  }}
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </button>
              ))}
            </nav>
          </aside>
          {/* Main Section */}
          <main className="flex-1 px-10 py-8 flex flex-col gap-10">
            {/* Tab Content or Nested Route */}
            <div className="flex-1 rounded-xl p-8 shadow-lg mt-2 flex flex-col justify-center items-center bg-black bg-opacity-50">
              {isRootDashboard ? (TABS[tab] ? TABS[tab].component : null) : <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
