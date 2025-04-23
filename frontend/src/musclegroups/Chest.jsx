import React from "react";
import { Link } from "react-router-dom";

const chestExercises = [
  {
    name: "Dumbbell Bench Press",
    image: "/images/dumbbell-bench-press_0.jpg",
    profile: {
      "Target Muscle Group": "Chest",
      "Exercise Type": "Strength",
      "Equipment Required": "Dumbbell",
      "Mechanics": "Compound",
      "Force Type": "Push (Bilateral)",
      "Experience Level": "Beginner",
      "Secondary Muscles": "Shoulders, Triceps"
    },
    description: `The dumbbell bench press is a foundational strength exercise for the chest. It allows for a greater range of motion than a barbell and helps improve muscle balance.\n\nTips:\n- Keep your wrists straight.\n- Lower the dumbbells slowly.\n- Squeeze your chest at the top.\n\nCommon Mistakes:\n- Bouncing weights off the chest.\n- Excessive arch in the lower back.`
  },
  {
    name: "Incline Bench Press",
    image: "/images/incline-bench-press.jpg",
    profile: {
      "Target Muscle Group": "Chest",
      "Exercise Type": "Strength",
      "Equipment Required": "Barbell",
      "Mechanics": "Compound",
      "Force Type": "Push (Bilateral)",
      "Experience Level": "Beginner",
      "Secondary Muscles": "Shoulders, Triceps"
    },
    description: `The incline bench press targets the upper chest and shoulders. It helps develop a well-rounded chest and improves pressing power.\n\nTips:\n- Set the bench at a 30-45 degree angle.\n- Lower the bar to the upper chest.\n- Keep elbows at 45 degrees.\n\nCommon Mistakes:\n- Flaring elbows too wide.\n- Lifting hips off the bench.`
  },
  {
    name: "Chest Dip",
    image: "/images/chest-dip.jpg",
    profile: {
      "Target Muscle Group": "Chest",
      "Exercise Type": "Strength",
      "Equipment Required": "Bodyweight",
      "Mechanics": "Compound",
      "Force Type": "Push (Bilateral)",
      "Experience Level": "Intermediate",
      "Secondary Muscles": "Abs, Shoulders, Triceps"
    },
    description: `Chest dips emphasize the lower chest and triceps. Leaning forward increases chest activation.\n\nTips:\n- Keep your torso leaning forward.\n- Go down until elbows are at 90 degrees.\n- Press up and squeeze your chest.\n\nCommon Mistakes:\n- Staying too upright (hits triceps more).\n- Not going low enough.`
  },
  {
    name: "Exercise Ball Dumbbell Bench Press",
    image: "/images/exercise-ball-dumbbell-bench-press.jpg",
    profile: {
      "Target Muscle Group": "Chest",
      "Exercise Type": "Strength",
      "Equipment Required": "Exercise Ball, Dumbbells",
      "Mechanics": "Compound",
      "Force Type": "Push (Bilateral)",
      "Experience Level": "Intermediate",
      "Secondary Muscles": "Shoulders, Triceps"
    },
    description: `This variation challenges your core and stability while working the chest.\n\nTips:\n- Keep your feet flat and core braced.\n- Lower dumbbells with control.\n- Squeeze chest at the top.\n\nCommon Mistakes:\n- Letting hips drop.\n- Using too much weight for balance.`
  }
];

export default function Chest() {
  return (
    <div className="bg-blue-950 bg-opacity-80 rounded shadow-xl p-6 mb-6 text-blue-100">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 drop-shadow">Chest Muscle Group</h2>
      <p className="mb-6 text-blue-200">The chest (pectoralis major and minor) is responsible for movements like pushing and hugging. Training the chest improves upper body strength, posture, and aesthetics. Balanced chest work helps prevent shoulder injuries and supports functional movement.\n\nFocus on both horizontal and vertical pressing for full development.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {chestExercises.map((ex, idx) => (
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
