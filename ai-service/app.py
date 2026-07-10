import os
import joblib
from flask import Flask, request, jsonify
from dotenv import load_dotenv

from utils import vectorize
from knowledge_base import get_enrichment

load_dotenv()

app = Flask(__name__)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response

MODEL_PATH = os.path.join("models", "model.pkl")
VOCAB_PATH = os.path.join("models", "vocabulary.pkl")

model = None
vocabulary = None


def load_artifacts():
    global model, vocabulary

    if not os.path.exists(MODEL_PATH) or not os.path.exists(VOCAB_PATH):
        raise FileNotFoundError("Run train.py first to generate model files")

    model = joblib.load(MODEL_PATH)
    vocabulary = joblib.load(VOCAB_PATH)

    print("✅ Model Loaded")
    print("📌 Sample vocabulary:", vocabulary[:10])


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/predict", methods=["POST"])
def predict():
    try:
        body = request.get_json(silent=True)

        if not body or "symptoms" not in body:
            return jsonify({"error": "symptoms required"}), 400

        symptoms = body["symptoms"]

        if not isinstance(symptoms, list) or len(symptoms) == 0:
            return jsonify({"error": "symptoms must be array"}), 400

        # ✅ FIX 1: Normalize symptoms
        symptoms = [s.strip().lower().replace(" ", "_") for s in symptoms]

        print("👉 Incoming symptoms:", symptoms)

        features = vectorize(symptoms, vocabulary)

        # ❌ No matching symptoms
        if sum(features) == 0:
            return jsonify({
                "error": "No matching symptoms in model",
                "known_symptoms": vocabulary[:15]
            }), 200   # ✅ changed from 422 → 200 (important)

        # ✅ FIX 2: Normalize prediction
        prediction_raw = model.predict([features])[0]
        prediction = prediction_raw.lower().strip().replace(" ", "_")

        probabilities = model.predict_proba([features])[0]
        confidence = float(max(probabilities))

        print("🧠 Raw prediction:", prediction_raw)
        print("✅ Normalized:", prediction)

        enrichment = get_enrichment(prediction)

        return jsonify({
            "prediction": prediction,
            "disease": prediction,
            "confidence": round(confidence * 100, 1),
            "possibleCauses": enrichment["possibleCauses"],
            "recommendedTests": enrichment["recommendedTests"],
            "healthAdvice": enrichment["healthAdvice"],
        })

    except Exception as e:
        print("❌ Prediction error:", str(e))
        return jsonify({"error": "Server error"}), 500


if __name__ == "__main__":
    load_artifacts()
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=True)