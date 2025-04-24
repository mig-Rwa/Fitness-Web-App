import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function SettingsTab() {
  const { user, setUser } = useContext(AuthContext);
  const [nickname, setNickname] = useState(user?.name || user?.nickname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [theme, setTheme] = useState("default");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [accountDeleted, setAccountDeleted] = useState(false);

  // Simulate save to backend
  const handleSave = async (e) => {
    e.preventDefault();
    setUser({ ...user, name: nickname, nickname });
    document.body.className = theme === "dark" ? "bg-gray-900 text-white" : theme === "light" ? "bg-white text-black" : "";
    setMessage("Settings updated!");
    setTimeout(() => setMessage(""), 2000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    // Simulate password change
    setMessage("Password changed!");
    setPassword("");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    if (deleteConfirm === "DELETE") {
      setAccountDeleted(true);
      setMessage("Account deleted. Goodbye!");
      // Here you would call the backend to delete the account and log out
    } else {
      setMessage("Type DELETE to confirm account deletion.");
    }
    setTimeout(() => setMessage(""), 2000);
  };

  if (accountDeleted) {
    return (
      <div className="max-w-lg mx-auto bg-black bg-opacity-70 rounded-xl p-8 shadow-lg mt-8 text-center text-yellow-200">
        <h2 className="text-2xl font-bold mb-6">Account Deleted</h2>
        <p>Your account has been deleted. We hope to see you again!</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-black bg-opacity-70 rounded-xl p-8 shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">Settings</h2>
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div>
          <label className="block text-blue-100 mb-1">Nickname</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-blue-900 text-yellow-200"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="Your nickname"
            required
          />
        </div>
        <div>
          <label className="block text-blue-100 mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-blue-900 text-yellow-200"
            value={email}
            disabled
          />
        </div>
        <div>
          <label className="block text-blue-100 mb-1">Theme</label>
          <select
            className="w-full p-2 rounded bg-blue-900 text-yellow-200"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <button type="submit" className="mt-2 bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded hover:bg-yellow-300 transition">Save Changes</button>
      </form>

      <form onSubmit={handlePasswordChange} className="flex flex-col gap-4 mt-8">
        <div>
          <label className="block text-blue-100 mb-1">Change Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2 rounded bg-blue-900 text-yellow-200"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New password"
          />
          <label className="block text-blue-300 mt-1">
            <input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} /> Show Password
          </label>
        </div>
        <button type="submit" className="bg-blue-400 text-blue-900 font-bold py-2 px-6 rounded hover:bg-blue-300 transition">Change Password</button>
      </form>

      <form onSubmit={handleDeleteAccount} className="flex flex-col gap-4 mt-8 border-t border-blue-800 pt-6">
        <div>
          <label className="block text-red-300 mb-1 font-bold">Delete Account</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-blue-900 text-red-200"
            value={deleteConfirm}
            onChange={e => setDeleteConfirm(e.target.value)}
            placeholder="Type DELETE to confirm"
          />
        </div>
        <button type="submit" className="bg-red-600 text-white font-bold py-2 px-6 rounded hover:bg-red-800 transition">Delete Account</button>
      </form>

      {message && <div className="text-green-400 text-center mt-2">{message}</div>}

      <div className="mt-8 text-blue-200 text-sm text-center">
        <div>Other settings coming soon: Notification preferences, privacy, etc.</div>
      </div>
    </div>
  );
}
