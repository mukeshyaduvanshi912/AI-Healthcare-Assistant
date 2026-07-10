const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { auth } = require("../middleware/auth");

// ---------------------------
// GET /api/doctors  (list all doctors) - specific route BEFORE /:id
// ---------------------------
router.get("/", auth, async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json(doctors);
  } catch (err) {
    console.error("List doctors error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// GET /api/doctors/:id  (generic param route LAST)
// ---------------------------
router.get("/:id", auth, async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid doctor ID format" });
    }

    const doctor = await User.findOne({ _id: req.params.id, role: "doctor" }).select("-password");

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json(doctor);
  } catch (err) {
    console.error("Get doctor error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
