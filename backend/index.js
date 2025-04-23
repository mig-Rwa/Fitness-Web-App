const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./migfitness.db");
const JWT_SECRET = "migfitness_secret_key";

// Create users table if not exists
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT
    )`
  );
});

// --- WORKOUTS TABLE ---
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      date TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`
  );
});

// --- Progress Table ---
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date TEXT,
    weight REAL,
    reps INTEGER,
    duration INTEGER,
    notes TEXT
  )`);
});

app.get("/", (req, res) => {
  res.send("MigFitness API is running!");
});

// Auth routes
app.post("/api/auth/signup", (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) return res.status(400).json({ message: "Missing fields" });
  const hash = bcrypt.hashSync(password, 10);
  db.run(
    "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
    [email, hash, name],
    function (err) {
      if (err) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = { id: this.lastID, email, name };
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: "3h" });
      res.json({ user, token });
    }
  );
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (err || !row) return res.status(400).json({ message: "Invalid credentials" });
    if (!bcrypt.compareSync(password, row.password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const user = { id: row.id, email: row.email, name: row.name };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "3h" });
    res.json({ user, token });
  });
});

// --- WORKOUTS ENDPOINTS ---
app.get("/api/workouts", (req, res) => {
  const userId = parseInt(req.query.user_id, 10);
  db.all("SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC", [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Failed to fetch workouts" });
    res.json(rows);
  });
});

app.post("/api/workouts", (req, res) => {
  const { user_id, name, description, date } = req.body;
  if (!user_id || !name) return res.status(400).json({ message: "Missing fields" });
  db.run(
    "INSERT INTO workouts (user_id, name, description, date) VALUES (?, ?, ?, ?)",
    [user_id, name, description, date],
    function (err) {
      if (err) return res.status(500).json({ message: "Failed to add workout" });
      res.json({ id: this.lastID, user_id, name, description, date });
    }
  );
});

app.delete("/api/workouts/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.run("DELETE FROM workouts WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ message: "Failed to delete workout" });
    res.json({ success: true });
  });
});

// --- Progress Endpoints ---
app.get("/api/progress", (req, res) => {
  const userId = parseInt(req.query.user_id, 10);
  db.all("SELECT * FROM progress WHERE user_id = ? ORDER BY date DESC", [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Failed to fetch progress" });
    res.json(rows);
  });
});

app.post("/api/progress", (req, res) => {
  const { user_id, date, weight, reps, duration, notes } = req.body;
  if (!user_id) return res.status(400).json({ message: "Missing fields" });
  db.run(
    "INSERT INTO progress (user_id, date, weight, reps, duration, notes) VALUES (?, ?, ?, ?, ?, ?)",
    [user_id, date, weight, reps, duration, notes],
    function (err) {
      if (err) {
        console.error("Progress insert error:", err); // Log the error for debugging
        return res.status(500).json({ message: "Failed to add progress" });
      }
      res.json({ id: this.lastID, user_id, date, weight, reps, duration, notes });
    }
  );
});

app.delete("/api/progress/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.run("DELETE FROM progress WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ message: "Failed to delete progress" });
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
