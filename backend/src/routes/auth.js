const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");
const { auth } = require("../middleware/auth"); // ✅ destructured, not the whole object

// Helper to sign a token
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

// ---------------------------
// POST /api/auth/register
// ---------------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "patient",
      specialization: role === "doctor" ? specialization : null,
    });

    const token = signToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// POST /api/auth/login
// ---------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // password has select:false in schema, so explicitly include it
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// GET /api/auth/me  (protected)
// ---------------------------
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Me route error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
