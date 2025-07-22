const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String, // In production, hash this!
  role: { type: String, enum: ["admin", "user", "seller"], default: "user" },
  lastLogin: Date,
  ip: String,
  isOnline: Boolean,
});

module.exports = mongoose.model("User", userSchema);
