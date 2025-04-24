import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function Signup({ onSwitch }) {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://fitness-web-app-w4ry.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 rounded shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>
      <form className="w-full" onSubmit={handleSignup}>
        <input
          className="w-full p-2 mb-3 border rounded bg-gray-800 text-white placeholder-gray-400"
          type="text"
          placeholder="Your Name or Nickname"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="w-full p-2 mb-3 border rounded bg-gray-800 text-white placeholder-gray-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 mb-3 border rounded bg-gray-800 text-white placeholder-gray-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-400 mb-2">{error}</div>}
        <button className="w-full py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800" type="submit">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-300">Already have an account? <button onClick={onSwitch} className="text-blue-400 underline">Login</button></p>
    </div>
  );
}
