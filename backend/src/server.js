require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("../config/db");

const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctors");
const appointmentRoutes = require("./routes/appointments");
const diagnosisRoutes = require("./routes/diagnosis");
const adminRoutes = require("./routes/admin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler (catches anything thrown outside try/catch)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
