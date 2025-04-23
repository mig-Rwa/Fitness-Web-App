import React from "react";
import { useNavigate } from "react-router-dom";

const calorieData = [
  {
    age: "Ages 12-23 Mos.",
    calories: [700, 800, 900, 1000],
  },
  {
    age: "Ages 2-3 Yrs.",
    calories: [1000, 1200, 1400],
  },
  {
    age: "Ages 4-8 Yrs.",
    calories: [1200, 1400, 1600, 1800, 2000],
  },
  {
    age: "Ages 9-13 Yrs.",
    calories: [1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200],
  },
  {
    age: "Ages 14+ Yrs.",
    calories: [1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200],
  },
];

const allCalories = Array.from(new Set(calorieData.flatMap(row => row.calories))).sort((a, b) => a - b);

export default function NutritionTips() {
  const navigate = useNavigate();
  return (
    <div className="bg-black bg-opacity-60 rounded-2xl shadow-xl p-8 w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">Recommended Daily Calorie Levels</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-yellow-300 rounded-xl text-center">
          <thead>
            <tr className="bg-yellow-300 text-black">
              <th className="py-3 px-4 border-b border-yellow-300">Age Group</th>
              {allCalories.map(cal => (
                <th key={cal} className="py-3 px-4 border-b border-yellow-300">{cal}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-black bg-opacity-40 text-white">
            {calorieData.map(row => (
              <tr key={row.age}>
                <td className="py-2 px-4 border-b border-yellow-300 font-semibold">{row.age}</td>
                {allCalories.map(cal => (
                  <td key={cal} className="py-2 px-4 border-b border-yellow-300">
                    {row.calories.includes(cal) ? (
                      <button
                        className="underline text-yellow-200 cursor-pointer hover:text-yellow-400 transition focus:outline-none"
                        onClick={() => navigate(`/nutrition/${cal}`)}
                      >
                        {cal}
                      </button>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-300 italic mt-2 text-center">Note: If you are on a mobile device, you may need to scroll to see the full table.</p>
      <div className="mt-8 bg-yellow-100 bg-opacity-80 rounded-xl p-6 text-center text-black shadow">
        <h3 className="text-lg font-bold mb-2">Talk with your health care provider about an eating pattern and physical activity program that is right for you.</h3>
      </div>
    </div>
  );
}
