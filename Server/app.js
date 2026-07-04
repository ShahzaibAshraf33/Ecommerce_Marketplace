const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const register = require("./features/Auth/routes/register");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Logging Middleware
app.use((req, res, next) => {
  const startTime = Date.now();
  const originalSend = res.send;

  res.send = function (data) {
    const duration = Date.now() - startTime;
    console.log(
      `[API HIT] ${req.method} ${req.path} | Status: ${res.statusCode} | Speed: ${duration}ms`
    );
    res.send = originalSend;
    return res.send(data);
  };
  next();
});

// Routes
app.use("/api/auth", register);

// Health check
app.get("/", (req, res) => {
  res.send("Server started successfully");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
