import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "https://fitness-web-app-w4ry.onrender.com";

export default function Login({ onSwitch }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!email || !password) {
      setError("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateInputs()) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        login(data.user, data.token);
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 rounded shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
      <form className="w-full" onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        {error && (
          <div className="text-red-400 mb-2 text-sm bg-red-900/50 p-2 rounded">
            {error}
          </div>
        )}
        <button 
          className={`w-full py-2 bg-blue-700 text-white rounded font-semibold transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-300">
        Don't have an account?{' '}
        <button 
          onClick={onSwitch} 
          className="text-blue-400 hover:text-blue-300 underline focus:outline-none"
          disabled={loading}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
