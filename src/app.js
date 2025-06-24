// src/app.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

dotenv.config();

// Initialize DB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
// Example: require('./routes/jobRoutes')(app);
// We'll wire routes here soon

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server Error" });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
