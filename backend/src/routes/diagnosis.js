const express = require("express");
const router = express.Router();
const axios = require("axios");

// ✅ POST /api/diagnosis/predict
router.post("/predict", async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({
        error: "Symptoms are required"
      });
    }

    console.log("👉 Sending symptoms to AI:", symptoms);

    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/predict",
      { symptoms }
    );

    console.log("🧠 AI RESPONSE:", aiResponse.data);

    res.json(aiResponse.data);

  } catch (error) {
    console.error("❌ ERROR:", error.message);

    res.status(500).json({
      error: "Failed to get AI prediction",
      details: error.message
    });
  }
});

module.exports = router;