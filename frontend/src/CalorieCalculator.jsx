import React, { useState } from "react";

// Macronutrient calculation helper
function getMacros(calories, goal) {
  // Default macros: 30% protein, 30% fat, 40% carbs (adjust for goal)
  let proteinRatio = 0.3, fatRatio = 0.3, carbRatio = 0.4;
  if (goal === "lose") proteinRatio = 0.35, fatRatio = 0.25, carbRatio = 0.4;
  if (goal === "gain") proteinRatio = 0.25, fatRatio = 0.25, carbRatio = 0.5;
  const protein = Math.round((calories * proteinRatio) / 4);
  const fat = Math.round((calories * fatRatio) / 9);
  const carbs = Math.round((calories * carbRatio) / 4);
  return { protein, fat, carbs };
}

const mealTips = [
  "Eat lean proteins like chicken, fish, or tofu for muscle repair.",
  "Include whole grains and vegetables for fiber and vitamins.",
  "Healthy fats from nuts, olive oil, and avocado support hormones.",
  "Stay hydrated and avoid sugary drinks.",
  "Balance your meals throughout the day for steady energy."
];

export default function CalorieCalculator() {
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70); // kg or lbs
  const [height, setHeight] = useState(170); // cm or in
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState(null);
  const [bmr, setBmr] = useState(null);
  const [units, setUnits] = useState("metric");
  const [history, setHistory] = useState([]);
  const [macros, setMacros] = useState(null);
  const [showTips, setShowTips] = useState(false);

  function convertToMetric(w, h) {
    // lbs to kg, in to cm
    return {
      weight: Math.round(w * 0.453592),
      height: Math.round(h * 2.54)
    };
  }

  function calculateCalories(e) {
    e.preventDefault();
    let w = weight, h = height;
    if (units === "imperial") {
      const converted = convertToMetric(weight, height);
      w = converted.weight;
      h = converted.height;
    }
    // Mifflin-St Jeor Equation
    let bmrValue =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * age + 5
        : 10 * w + 6.25 * h - 5 * age - 161;
    setBmr(Math.round(bmrValue));
    let multiplier = 1.55;
    if (activity === "sedentary") multiplier = 1.2;
    if (activity === "light") multiplier = 1.375;
    if (activity === "moderate") multiplier = 1.55;
    if (activity === "active") multiplier = 1.725;
    if (activity === "very active") multiplier = 1.9;
    let calories = bmrValue * multiplier;
    if (goal === "lose") calories -= 500;
    if (goal === "gain") calories += 500;
    calories = Math.max(1000, Math.round(calories));
    setResult(calories);
    setMacros(getMacros(calories, goal));
    setHistory([{ date: new Date().toLocaleString(), age, gender, weight, height, units, activity, goal, calories }, ...history]);
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-black bg-opacity-80 rounded-xl shadow-lg p-8 mt-6">
      <h2 className="text-3xl font-bold text-yellow-300 mb-4 text-center">Calorie & Macro Calculator</h2>
      <form onSubmit={calculateCalories} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-blue-100 mb-1">Units</label>
            <select value={units} onChange={e => setUnits(e.target.value)} className="w-full p-2 rounded bg-blue-900 text-yellow-200">
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, in)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-blue-100 mb-1">Age</label>
            <input type="number" min="10" max="100" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full p-2 rounded bg-blue-900 text-yellow-200" required />
          </div>
          <div className="flex-1">
            <label className="block text-blue-100 mb-1">Gender</label>
            <select value={gender} onChange={e => setGender(e.target.value)} className="w-full p-2 rounded bg-blue-900 text-yellow-200">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-blue-100 mb-1">Weight ({units === "metric" ? "kg" : "lbs"})</label>
            <input type="number" min="30" max="250" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full p-2 rounded bg-blue-900 text-yellow-200" required />
          </div>
          <div className="flex-1">
            <label className="block text-blue-100 mb-1">Height ({units === "metric" ? "cm" : "in"})</label>
            <input type="number" min="120" max="240" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full p-2 rounded bg-blue-900 text-yellow-200" required />
          </div>
        </div>
        <div>
          <label className="block text-blue-100 mb-1">Activity Level</label>
          <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full p-2 rounded bg-blue-900 text-yellow-200">
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (1-3 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (6-7 days/week)</option>
            <option value="very active">Very Active (hard exercise & physical job)</option>
          </select>
        </div>
        <div>
          <label className="block text-blue-100 mb-1">Goal</label>
          <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-2 rounded bg-blue-900 text-yellow-200">
            <option value="maintain">Maintain Weight</option>
            <option value="lose">Lose Weight (~-500 kcal/day)</option>
            <option value="gain">Gain Weight (~+500 kcal/day)</option>
          </select>
        </div>
        <button type="submit" className="mt-4 bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded hover:bg-yellow-300 transition">Calculate</button>
      </form>
      {result && (
        <div className="mt-8 text-center bg-blue-950 bg-opacity-80 rounded-xl p-6 shadow-lg">
          <div className="text-lg text-blue-100 font-semibold">Estimated Daily Calories:</div>
          <div className="text-3xl font-bold text-yellow-300 mt-2">{result} kcal</div>
          <div className="text-blue-200 mt-2">(BMR: {bmr} kcal/day)</div>
          {macros && (
            <div className="mt-4">
              <div className="text-lg text-blue-100 font-semibold mb-2">Macronutrient Breakdown:</div>
              <div className="grid grid-cols-3 gap-4 text-yellow-200 font-bold">
                <div>Protein<br /><span className="text-2xl">{macros.protein}g</span></div>
                <div>Fat<br /><span className="text-2xl">{macros.fat}g</span></div>
                <div>Carbs<br /><span className="text-2xl">{macros.carbs}g</span></div>
              </div>
            </div>
          )}
          <button onClick={() => setShowTips(!showTips)} className="mt-4 px-4 py-2 bg-yellow-400 text-blue-900 rounded hover:bg-yellow-300 transition font-semibold">{showTips ? "Hide" : "Show"} Meal Tips</button>
          {showTips && (
            <ul className="mt-4 text-blue-100 text-left list-disc list-inside">
              {mealTips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          )}
          <div className="text-xs text-blue-300 mt-4">* This is an estimate. For personalized advice, consult a nutritionist or healthcare provider.</div>
        </div>
      )}
      {history.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg text-yellow-200 font-bold mb-2">Calculation History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-blue-100 bg-blue-950 bg-opacity-80 rounded-xl">
              <thead>
                <tr>
                  <th className="px-2 py-1">Date</th>
                  <th className="px-2 py-1">Age</th>
                  <th className="px-2 py-1">Gender</th>
                  <th className="px-2 py-1">Weight</th>
                  <th className="px-2 py-1">Height</th>
                  <th className="px-2 py-1">Units</th>
                  <th className="px-2 py-1">Activity</th>
                  <th className="px-2 py-1">Goal</th>
                  <th className="px-2 py-1">Calories</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} className="text-xs">
                    <td className="px-2 py-1">{h.date}</td>
                    <td className="px-2 py-1">{h.age}</td>
                    <td className="px-2 py-1">{h.gender}</td>
                    <td className="px-2 py-1">{h.weight}</td>
                    <td className="px-2 py-1">{h.height}</td>
                    <td className="px-2 py-1">{h.units}</td>
                    <td className="px-2 py-1">{h.activity}</td>
                    <td className="px-2 py-1">{h.goal}</td>
                    <td className="px-2 py-1 font-bold text-yellow-300">{h.calories}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
