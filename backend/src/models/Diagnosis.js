const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symptoms: {
      type: [String],
      required: true,
    },
    prediction: {
      type: String,
      required: true,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
    },
    possibleCauses: {
      type: [String],
      default: [],
    },
    recommendedTests: {
      type: [String],
      default: [],
    },
    healthAdvice: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Diagnosis", diagnosisSchema);