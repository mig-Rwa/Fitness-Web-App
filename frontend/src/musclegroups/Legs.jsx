import React from "react";
import { Link } from "react-router-dom";

const legsExercises = [
  {
    name: "Squat",
    image: "/images/squat.jpg",
    profile: {
      "Target Muscle Group": "Legs",
      "Exercise Type": "Strength",
      "Equipment Required": "Barbell/Bodyweight",
      "Mechanics": "Compound",
      "Force Type": "Push (Bilateral)",
      "Experience Level": "Beginner",
      "Secondary Muscles": "Glutes, Hamstrings, Core"
    },
    description: `The squat is the king of lower body exercises, working the quads, glutes, hamstrings, and core. It builds strength, muscle, and functional movement.\n\nTips:\n- Keep your chest up and back straight.\n- Push your knees out as you descend.\n- Go as low as your mobility allows.\n\nCommon Mistakes:\n- Heels coming off the ground.\n- Rounding the lower back.\n- Knees caving in.\n\nVariations:\n- Goblet squat (dumbbell)\n- Bulgarian split squat\n- Front squat` 
  },
  {
    name: "Lunge",
    image: "/images/lunge.jpg",
    profile: {
      "Target Muscle Group": "Legs",
      "Exercise Type": "Strength",
      "Equipment Required": "Bodyweight/Dumbbells",
      "Mechanics": "Compound",
      "Force Type": "Push (Unilateral)",
      "Experience Level": "Beginner",
      "Secondary Muscles": "Glutes, Hamstrings, Calves"
    },
    description: `The lunge targets the quads, glutes, and hamstrings while improving balance and coordination.\n\nTips:\n- Keep your torso upright.\n- Step far enough forward so your knee stays above your ankle.\n- Push through your front heel to return.\n\nCommon Mistakes:\n- Letting the front knee go past the toes.\n- Leaning forward excessively.\n\nVariations:\n- Walking lunge\n- Reverse lunge\n- Lateral lunge` 
  }
];

export default function Legs() {
  return (
    <div className="bg-blue-950 bg-opacity-80 rounded shadow-xl p-6 mb-6 text-blue-100">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 drop-shadow">Legs Muscle Group</h2>
      <p className="mb-6 text-blue-200">The legs include the quadriceps, hamstrings, glutes, and calves. Strong legs are essential for athleticism, balance, and injury prevention. Training the lower body also boosts metabolism and overall strength.\n\nInclude both compound and single-leg exercises for balanced development.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {legsExercises.map((ex, idx) => (
          <div key={idx} className="bg-blue-900 bg-opacity-70 rounded-2xl p-4 shadow flex flex-col items-center hover:bg-blue-800 transition group border-b-4 border-yellow-400 hover:scale-105">
            <img
              src={ex.image}
              alt={ex.name}
              className="w-40 h-40 object-cover rounded-lg mb-3 border-2 border-blue-800 shadow-lg group-hover:shadow-yellow-400 transition"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div className="font-bold text-yellow-300 text-xl mb-1 text-center">{ex.name}</div>
            <div className="text-blue-100 mb-1 whitespace-pre-line text-center">{ex.description}</div>
            <div className="mt-2 w-full flex justify-center">
              <table className="text-blue-200 text-xs bg-blue-950 bg-opacity-60 rounded p-2">
                <tbody>
                  {Object.entries(ex.profile).map(([k, v]) => (
                    <tr key={k}>
                      <td className="pr-2 font-semibold">{k}:</td>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/exerciselibrary" className="text-blue-400 underline">Back to Exercise Library</Link>
      </div>
    </div>
  );
}
