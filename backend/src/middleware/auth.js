const jwt = require("jsonwebtoken");

// Verifies JWT and attaches decoded user to req.user
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Restricts a route to specific roles, e.g. authorizeRole("admin", "doctor")
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

// IMPORTANT: export both as named exports.
// Any file importing this MUST destructure: const { auth, authorizeRole } = require(...)
module.exports = { auth, authorizeRole };
