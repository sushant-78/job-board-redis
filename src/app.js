// src/app.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const redisClient = require("./config/redis");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");

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

// app.get("/api/test-redis", async (req, res) => {
//   await redisClient.set("test_key", "test_value", { EX: 60 });
//   const value = await redisClient.get("test_key");
//   res.json({ value });
// });

// Routes
app.use("/api/users", userRoutes);

app.use("/api/jobs", jobRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  // res.status(500).json({ error: "Server Error" });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
});
