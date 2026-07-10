const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const { auth, authorizeRole } = require("../middleware/auth");

const isValidId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// ---------------------------
// POST /api/appointments  (patient books an appointment)
// ---------------------------
router.post("/", auth, authorizeRole("patient"), async (req, res) => {
  try {
    const { doctor, date, reason } = req.body;

    if (!doctor || !date) {
      return res.status(400).json({ error: "Doctor and date are required" });
    }

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor,
      date,
      reason,
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error("Create appointment error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// GET /api/appointments/me  (specific route BEFORE /:id)
// Returns appointments for the logged-in user (patient or doctor)
// ---------------------------
router.get("/me", auth, async (req, res) => {
  try {
    const filter =
      req.user.role === "doctor" ? { doctor: req.user.id } : { patient: req.user.id };

    const appointments = await Appointment.find(filter)
      .populate("patient", "name email")
      .populate("doctor", "name specialization")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    console.error("Get my appointments error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// GET /api/appointments/:id
// ---------------------------
router.get("/:id", auth, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: "Invalid appointment ID format" });
    }

    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name email")
      .populate("doctor", "name specialization");

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json(appointment);
  } catch (err) {
    console.error("Get appointment error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// PATCH /api/appointments/:id/status  (doctor/admin updates status)
// ---------------------------
router.patch("/:id/status", auth, authorizeRole("doctor", "admin"), async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: "Invalid appointment ID format" });
    }

    const { status } = req.body;
    const allowed = ["pending", "confirmed", "completed", "cancelled"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${allowed.join(", ")}` });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json(appointment);
  } catch (err) {
    console.error("Update appointment status error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// DELETE /api/appointments/:id  (cancel/delete)
// ---------------------------
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: "Invalid appointment ID format" });
    }

    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error("Delete appointment error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
