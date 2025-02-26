const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { FRONTEND_URL } = require("./config/env");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRoutes = require("./routes/authRoutes");
const motivationRoutes = require("./routes/motivationRoutes");
const { createUsersTable } = require("./models/userModel");

createUsersTable();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Parses cookies
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/motivate", motivationRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use(errorHandler);

module.exports = app;
