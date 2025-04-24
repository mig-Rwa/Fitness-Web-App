import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function ProgressTracker() {
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState([]);
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProgress = () => {
    setLoading(true);
    fetch(`https://fitness-web-app-w4ry.onrender.com/api/progress?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => { setProgress(data); setLoading(false); })
      .catch(() => { setError("Failed to fetch progress"); setLoading(false); });
  };

  useEffect(() => { if (user) fetchProgress(); }, [user]);

  const addProgress = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("https://fitness-web-app-w4ry.onrender.com/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, date, weight, reps, duration, notes }),
    });
    if (!res.ok) { setError("Failed to add progress"); return; }
    setDate(""); setWeight(""); setReps(""); setDuration(""); setNotes("");
    fetchProgress();
  };

  const deleteProgress = async (id) => {
    await fetch(`https://fitness-web-app-w4ry.onrender.com/api/progress/${id}`, { method: "DELETE" });
    setProgress(progress.filter(p => p.id !== id));
  };

  return (
    <div className="bg-blue-950 bg-opacity-80 rounded shadow-xl p-6 mb-6 text-blue-100">
      <h2 className="text-xl font-semibold mb-4 text-yellow-400 drop-shadow">Progress Tracking</h2>
      <form className="mb-6 grid grid-cols-1 md:grid-cols-6 gap-4" onSubmit={addProgress}>
        <input className="p-2 border rounded bg-blue-900 text-blue-100 placeholder-blue-300" type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <input className="p-2 border rounded bg-blue-900 text-blue-100 placeholder-blue-300" type="number" step="0.1" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
        <input className="p-2 border rounded bg-blue-900 text-blue-100 placeholder-blue-300" type="number" placeholder="Reps" value={reps} onChange={e => setReps(e.target.value)} />
        <input className="p-2 border rounded bg-blue-900 text-blue-100 placeholder-blue-300" type="number" placeholder="Duration (min)" value={duration} onChange={e => setDuration(e.target.value)} />
        <input className="p-2 border rounded bg-blue-900 text-blue-100 placeholder-blue-300" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
        <button className="bg-yellow-400 text-blue-900 rounded px-4 py-2 font-bold hover:bg-yellow-300 transition shadow-lg" type="submit">Add Progress</button>
      </form>
      {error && <div className="text-red-400 mb-4">{error}</div>}
      {loading ? (
        <div className="text-blue-200 animate-pulse">Loading...</div>
      ) : (
        <ul className="space-y-3">
          {progress.length === 0 && <li className="text-blue-300 italic">No progress entries yet. Add one above!</li>}
          {progress.map(p => (
            <li key={p.id} className="flex justify-between items-center bg-blue-900 bg-opacity-70 rounded p-3 shadow">
              <div>
                <div className="font-semibold text-yellow-300">{p.date}</div>
                <div className="text-blue-200 text-sm">{p.weight ? `Weight: ${p.weight} kg` : ""} {p.reps ? `| Reps: ${p.reps}` : ""} {p.duration ? `| Duration: ${p.duration} min` : ""}</div>
                {p.notes && <div className="text-xs text-blue-400 mt-1">{p.notes}</div>}
              </div>
              <button onClick={() => deleteProgress(p.id)} className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 font-bold">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
