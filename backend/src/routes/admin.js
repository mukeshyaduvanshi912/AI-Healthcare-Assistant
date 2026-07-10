const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Diagnosis = require("../models/Diagnosis");
const { auth, authorizeRole } = require("../middleware/auth");

// All admin routes require auth + admin role
router.use(auth, authorizeRole("admin"));

// ---------------------------
// GET /api/admin/stats  (specific route BEFORE /users/:id)
// ---------------------------
router.get("/stats", async (req, res) => {
  try {
    const [userCount, doctorCount, patientCount, appointmentCount, diagnosisCount] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: "doctor" }),
        User.countDocuments({ role: "patient" }),
        Appointment.countDocuments(),
        Diagnosis.countDocuments(),
      ]);

    res.json({ userCount, doctorCount, patientCount, appointmentCount, diagnosisCount });
  } catch (err) {
    console.error("Admin stats error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// GET /api/admin/users
// ---------------------------
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Admin list users error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// GET /api/admin/users/:id
// ---------------------------
router.get("/users/:id", async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Admin get user error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// DELETE /api/admin/users/:id
// ---------------------------
router.delete("/users/:id", async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Admin delete user error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
