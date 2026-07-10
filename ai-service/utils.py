"""
Shared helpers used by both train.py and app.py.
Keeping this logic in one place guarantees the vectorization used at
training time exactly matches the vectorization used at prediction time.
"""

import re


def clean_symptom(symptom: str) -> str:
    """Normalize a single symptom string: lowercase, trim, replace spaces with underscores."""
    return re.sub(r"\s+", "_", symptom.strip().lower())


def parse_symptom_string(raw: str, sep: str = ";") -> list:
    """Turn a raw 'fever;cough;fatigue' string into a clean list of symptoms."""
    return [clean_symptom(s) for s in raw.split(sep) if s.strip()]


def build_vocabulary(symptom_lists: list) -> list:
    """Given a list of symptom-lists, return a sorted list of all unique symptoms."""
    vocab = set()
    for symptoms in symptom_lists:
        vocab.update(symptoms)
    return sorted(vocab)


def vectorize(symptoms: list, vocabulary: list) -> list:
    """
    Convert a list of symptoms into a fixed-length binary feature vector,
    ordered according to `vocabulary`. Unknown symptoms are ignored.
    """
    symptom_set = set(clean_symptom(s) for s in symptoms)
    return [1 if term in symptom_set else 0 for term in vocabulary]
