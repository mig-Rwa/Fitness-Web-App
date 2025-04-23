import React from "react";
import { Link } from "react-router-dom";

const armsExercises = [
  {
    name: "Bicep Curl",
    image: "/images/bicep-curl.jpg",
    profile: {
      "Target Muscle Group": "Arms",
      "Exercise Type": "Strength",
      "Equipment Required": "Dumbbell/Barbell",
      "Mechanics": "Isolation",
      "Force Type": "Pull (Bilateral)",
      "Experience Level": "Beginner",
      "Secondary Muscles": "Forearms"
    },
    description: `The bicep curl is a classic isolation movement for building arm size and strength.\n\nTips:\n- Keep your elbows close to your torso.\n- Move only your forearms.\n- Lower the weights slowly.\n\nCommon Mistakes:\n- Swinging the weights.\n- Using too much weight.\n\nVariations:\n- Hammer curl\n- Concentration curl\n- Barbell curl` 
  }
];

export default function Arms() {
  return (
    <div className="bg-blue-950 bg-opacity-80 rounded shadow-xl p-6 mb-6 text-blue-100">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 drop-shadow">Arms Muscle Group</h2>
      <p className="mb-6 text-blue-200">The arms include the biceps, triceps, and forearms. Strong arms are important for lifting, carrying, and all upper body movements. Balanced arm training improves aesthetics and performance.\n\nTrain both pushing and pulling movements for best results.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {armsExercises.map((ex, idx) => (
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
