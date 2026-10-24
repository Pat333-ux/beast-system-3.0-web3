const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    system: "BEAST System 3.0",
    timestamp: new Date().toISOString()
  });
});

// Basic Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to BEAST System 3.0 Backend API",
    status: "Active"
  });
});

// Start Server
app.listen(port, () => {
  console.log(`BEAST System 3.0 backend listening on port ${port}`);
});
