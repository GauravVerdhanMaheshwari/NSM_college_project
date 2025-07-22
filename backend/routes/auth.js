const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../models/User");

// Utility to hash password
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Middleware to extract client IP
function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress
  );
}

// Register
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const newUser = new User({
    username,
    password: hashPassword(password),
    role,
    isOnline: false,
    lastLogin: null,
    ip: null,
  });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

// Logout
router.post("/login", async (req, res) => {
  const { username, password, ip: clientIp } = req.body;
  const ip = getClientIp(req) || clientIp;
  const hashed = hashPassword(password);

  const user = await User.findOne({ username, password: hashed });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  user.isOnline = true;
  user.lastLogin = new Date();
  user.ip = ip;
  await user.save();

  res.json({
    message: "Login successful",
    userId: user._id,
    role: user.role,
  });
});

// Admin View - all users
router.get("/admin/users", async (req, res) => {
  // You can add token/auth check here for real security
  const users = await User.find({}, "username role lastLogin ip isOnline");
  res.json(users);
});

module.exports = router;
