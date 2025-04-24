import React, { useState, useContext } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExerciseLibrary from "./ExerciseLibrary";
import Chest from "./musclegroups/Chest";
import Legs from "./musclegroups/Legs";
import Core from "./musclegroups/Core";
import Arms from "./musclegroups/Arms";
import NutritionTips from "./NutritionTips";
import CaloriePlan from "./CaloriePlan";

// Set background image for the whole app
const BACKGROUND_IMAGE = "/images/exercize-database.jpg";

export default function App() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <AuthProvider>
      <div
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          backgroundImage: `url(${BACKGROUND_IMAGE})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "fixed",
          zIndex: -1,
          top: 0,
          left: 0,
        }}
        aria-hidden="true"
      />
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainApp showSignup={showSignup} setShowSignup={setShowSignup} />} />
            {/* Redirect /exerciselibrary to /dashboard/exerciselibrary */}
            <Route path="/exerciselibrary" element={<Navigate to="/dashboard/exerciselibrary" replace />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="exerciselibrary" element={<ExerciseLibrary />} />
              <Route path="musclegroups/chest" element={<Chest />} />
              <Route path="musclegroups/legs" element={<Legs />} />
              <Route path="musclegroups/core" element={<Core />} />
              <Route path="musclegroups/arms" element={<Arms />} />
            </Route>
            <Route path="/nutrition" element={<NutritionTips />} />
            <Route path="/nutrition/:calories" element={<CaloriePlan />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

function MainApp({ showSignup, setShowSignup }) {
  const { user } = useContext(AuthContext);
  if (user) return <Dashboard />;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ minHeight: '100vh', background: 'rgba(20, 30, 60, 0.7)', borderRadius: 20, margin: 24 }}>
      <h1 className="text-4xl font-bold mb-6 text-blue-200 drop-shadow-lg animate-bounce">GETUM Fitness</h1>
      <p className="text-lg text-blue-100 mb-8 max-w-xl text-center font-semibold">
        Welcome to your personal fitness coach! Get personalized workout plans, track your progress, and access nutrition tips to achieve your goals.
      </p>
      <button
        className="px-6 py-3 rounded bg-blue-700 text-white font-semibold hover:bg-blue-900 transition mb-4 shadow-lg animate-pulse"
        onClick={() => setShowSignup(false)}
      >
        Get Started
      </button>
      {showSignup ? (
        <Signup onSwitch={() => setShowSignup(false)} />
      ) : (
        <Login onSwitch={() => setShowSignup(true)} />
      )}
    </div>
  );
}
