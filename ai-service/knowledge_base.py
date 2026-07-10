KNOWLEDGE_BASE = {
    "common_cold": {
        "possibleCauses": ["Viral infection"],
        "recommendedTests": ["No test required"],
        "healthAdvice": ["Rest", "Drink fluids"],
    },
    "flu": {
        "possibleCauses": ["Influenza virus"],
        "recommendedTests": ["Flu test"],
        "healthAdvice": ["Rest", "Medication"],
    },
    "pneumonia": {
        "possibleCauses": ["Lung infection"],
        "recommendedTests": ["Chest X-ray"],
        "healthAdvice": ["See doctor immediately"],
    },
    "food_poisoning": {
        "possibleCauses": ["Contaminated food"],
        "recommendedTests": ["Stool test"],
        "healthAdvice": ["Hydration"],
    },
    "migraine": {
        "possibleCauses": ["Stress", "Sleep issues"],
        "recommendedTests": ["Clinical diagnosis"],
        "healthAdvice": ["Rest in dark room"],
    },
}

DEFAULT_ENTRY = {
    "possibleCauses": ["Unknown cause"],
    "recommendedTests": ["Consult doctor"],
    "healthAdvice": ["Seek medical advice"],
}


def get_enrichment(diagnosis_label: str) -> dict:
    return KNOWLEDGE_BASE.get(
        diagnosis_label.lower().replace(" ", "_"),
        DEFAULT_ENTRY
    )