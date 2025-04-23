import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function WorkoutPlan() {
  const { user } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWorkouts = () => {
    setLoading(true);
    fetch(`http://localhost:4100/api/workouts?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch workouts");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) fetchWorkouts();
    // eslint-disable-next-line
  }, [user]);

  const addWorkout = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:4100/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, name, description, date }),
    });
    if (!res.ok) {
      setError("Failed to add workout");
      return;
    }
    setName(""); setDescription(""); setDate("");
    fetchWorkouts();
  };

  const deleteWorkout = async (id) => {
    await fetch(`http://localhost:4100/api/workouts/${id}`, { method: "DELETE" });
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  return (
    <div className="bg-blue-950 bg-opacity-80 rounded shadow-xl p-6 mb-6 text-blue-100">
      <h2 className="text-xl font-semibold mb-4 text-yellow-400 drop-shadow">Your Workout Plan</h2>
      <form className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={addWorkout}>
        <input
          className="p-2 border rounded bg-blue-900 text-blue-100 placeholder-blue-300"
          placeholder="Workout Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="p-2 border rounded bg-blue-900 text-blue-100 placeholder-blue-300"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          className="p-2 border rounded bg-blue-900 text-blue-100 placeholder-blue-300"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button className="bg-yellow-400 text-blue-900 rounded px-4 py-2 font-bold hover:bg-yellow-300 transition shadow-lg" type="submit">
          Add Workout
        </button>
      </form>
      {error && <div className="text-red-400 mb-4">{error}</div>}
      {loading ? (
        <div className="text-blue-200 animate-pulse">Loading...</div>
      ) : (
        <ul className="space-y-3">
          {workouts.length === 0 && <li className="text-blue-300 italic">No workouts yet. Add one above!</li>}
          {workouts.map(w => (
            <li key={w.id} className="flex justify-between items-center bg-blue-900 bg-opacity-70 rounded p-3 shadow">
              <div>
                <div className="font-semibold text-yellow-300">{w.name}</div>
                <div className="text-blue-200 text-sm">{w.description}</div>
                {w.date && <div className="text-xs text-blue-400 mt-1">{w.date}</div>}
              </div>
              <button onClick={() => deleteWorkout(w.id)} className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 font-bold">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
