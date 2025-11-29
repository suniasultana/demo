import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const users = []; // TEMP in-memory users

// ---------------- REGISTER ----------------
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  users.push({ username, password: hashed });

  res.json({ message: "User registered successfully" });
});

// ---------------- LOGIN ----------------
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "2h"
  });

  res.json({ token });
});

// ---------------- MIDDLEWARE ----------------
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user;
    next();
  });
}

// ---------------- PROTECTED ROUTE ----------------
app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected profile data",
    user: req.user.username
  });
});

app.listen(5000, () => console.log("Backend running on port 5000"));