const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const dns = require("dns");

dotenv.config();

const app = express();

// Import Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
// const doctorRoutes = require("./routes/doctor");
const receptionistRoutes = require("./routes/receptionist");
const labtechRoutes = require("./routes/labtech");

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Hospital Management System API is running",
  });
});

// Route Middleware
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api/doctor", doctorRoutes);
app.use("/api/receptionist", receptionistRoutes);
app.use("/api/labtech", labtechRoutes);

// Error Handling Middleware
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code || 500).json({
    message: error.message || "An unknown error occurred!",
  });
});

// Optional DNS settings
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });