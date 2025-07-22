const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// Enable CORS for all origins (you can restrict this in production)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Trust proxy to get client IP from headers like x-forwarded-for
app.set("trust proxy", true);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/network_monitor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Routes
app.use("/api", authRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
