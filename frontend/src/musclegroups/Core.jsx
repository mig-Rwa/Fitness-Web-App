import React from "react";
import { Link } from "react-router-dom";

const coreExercises = [
  {
    name: "Plank",
    image: "/images/plank.jpg",
    profile: {
      "Target Muscle Group": "Core",
      "Exercise Type": "Strength",
      "Equipment Required": "Bodyweight",
      "Mechanics": "Isometric",
      "Force Type": "Hold",
      "Experience Level": "Beginner",
      "Secondary Muscles": "Back, Shoulders"
    },
    description: `The plank is a foundational core exercise that builds endurance in the abs, back, and shoulders. It enhances posture, stability, and athletic performance.\n\nTips:\n- Keep your body in a straight line.\n- Squeeze your glutes and brace your core.\n- Don't let your hips drop or pike.\n\nCommon Mistakes:\n- Sagging hips.\n- Holding breath.\n\nVariations:\n- Side plank\n- Plank with shoulder tap\n- Plank to push-up` 
  }
];

export default function Core() {
  return (
    <div className="bg-blue-950 bg-opacity-80 rounded shadow-xl p-6 mb-6 text-blue-100">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 drop-shadow">Core Muscle Group</h2>
      <p className="mb-6 text-blue-200">The core includes the abdominals, obliques, and lower back. A strong core is vital for stability, injury prevention, and overall strength. Core training supports all athletic movements and daily activities.\n\nInclude both static and dynamic core exercises for best results.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {coreExercises.map((ex, idx) => (
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
