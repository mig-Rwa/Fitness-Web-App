import React from "react";
import { caloriePlans } from "./caloriePlans";
import { useParams, Link } from "react-router-dom";

// SVG icons for each food group
const FoodGroupIcon = ({ type }) => {
  switch (type) {
    case "fruit":
      return (
        <svg viewBox="0 0 48 48" width="36" height="36"><circle cx="24" cy="24" r="18" fill="#ef4444" /><text x="24" y="30" textAnchor="middle" fontSize="18" fill="#fff">🍎</text></svg>
      );
    case "protein":
      return (
        <svg viewBox="0 0 48 48" width="36" height="36"><circle cx="24" cy="24" r="18" fill="#7c3aed" /><text x="24" y="30" textAnchor="middle" fontSize="18" fill="#fff">🍗</text></svg>
      );
    case "vegetable":
      return (
        <svg viewBox="0 0 48 48" width="36" height="36"><circle cx="24" cy="24" r="18" fill="#22c55e" /><text x="24" y="30" textAnchor="middle" fontSize="18" fill="#fff">🥦</text></svg>
      );
    case "dairy":
      return (
        <svg viewBox="0 0 48 48" width="36" height="36"><circle cx="24" cy="24" r="18" fill="#3b82f6" /><text x="24" y="30" textAnchor="middle" fontSize="18" fill="#fff">🥛</text></svg>
      );
    case "grain":
      return (
        <svg viewBox="0 0 48 48" width="36" height="36"><circle cx="24" cy="24" r="18" fill="#f59e42" /><text x="24" y="30" textAnchor="middle" fontSize="18" fill="#fff">🍞</text></svg>
      );
    default:
      return null;
  }
};

export default function CaloriePlan() {
  const { calories } = useParams();
  const plan = caloriePlans[calories];

  // Download functionality
  const handleDownload = () => {
    const content = JSON.stringify(plan, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `calorie_plan_${calories}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!plan) {
    return (
      <div className="bg-black bg-opacity-60 rounded-2xl shadow-xl p-8 w-full max-w-2xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">Plan Not Found</h2>
        <p className="text-white mb-4">Sorry, we don't have a nutrition plan for this calorie level yet.</p>
        <Link to="/dashboard" className="text-yellow-300 underline">Back to Nutrition Tips</Link>
      </div>
    );
  }

  return (
    <div className="bg-black bg-opacity-60 rounded-2xl shadow-xl p-8 w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-extrabold text-yellow-300 mb-2 text-center">MyPlate Plan</h2>
      <div className="text-4xl font-bold text-white text-center mb-2">{calories} calories</div>
      <div className="text-lg text-gray-200 text-center mb-6">{plan.age}</div>
      <div className="flex flex-wrap justify-center gap-8 mb-10">
        {plan.groups.map(group => (
          <div key={group.name} className="flex flex-col items-center w-64">
            <div className={`w-20 h-20 flex items-center justify-center rounded-full mb-3 shadow-lg ${group.color}`}> <FoodGroupIcon type={group.icon} /> </div>
            <div className="text-xl font-bold mb-1 text-gray-100">{group.amount}</div>
            <div className="text-lg font-semibold mb-1 text-gray-200">{group.name}</div>
            <ul className="text-gray-300 text-base mb-2 text-left">
              {group.details.map((d, i) => (
                <li key={i}>- {d}</li>
              ))}
            </ul>
            <a href={group.learnMore} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline hover:text-yellow-300">Learn more</a>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={handleDownload} className="text-orange-500 font-bold flex items-center gap-2 hover:underline">
          <span>Download Your Plan</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
          </svg>
        </button>
      </div>
      <div className="mt-8 bg-yellow-100 bg-opacity-80 rounded-xl p-6 text-center text-black shadow">
        <h3 className="text-lg font-bold mb-2">Below are the daily recommended amounts for each food group. Click on the food group buttons to learn more and get started.</h3>
      </div>
    </div>
  );
}
