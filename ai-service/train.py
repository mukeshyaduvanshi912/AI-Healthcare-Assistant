"""
Trains a simple symptom -> diagnosis classifier and saves:
  - models/model.pkl        (trained sklearn classifier)
  - models/vocabulary.pkl   (the ordered list of symptom features the model expects)

Run with:  python train.py
"""

import os
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

from utils import parse_symptom_string, build_vocabulary, vectorize

DATA_PATH = os.path.join("data", "symptoms.csv")
MODEL_DIR = "models"
MODEL_PATH = os.path.join(MODEL_DIR, "model.pkl")
VOCAB_PATH = os.path.join(MODEL_DIR, "vocabulary.pkl")


def main():
    os.makedirs(MODEL_DIR, exist_ok=True)

    df = pd.read_csv(DATA_PATH)
    df["symptom_list"] = df["symptoms"].apply(parse_symptom_string)

    vocabulary = build_vocabulary(df["symptom_list"])
    print(f"Vocabulary size: {len(vocabulary)} symptoms")

    X = df["symptom_list"].apply(lambda s: vectorize(s, vocabulary)).tolist()
    y = df["diagnosis"].tolist()

    # NOTE: this sample dataset is intentionally tiny (a few rows per class),
    # so a held-out test split isn't meaningful yet. We train on the full
    # dataset here and report training accuracy as a sanity check.
    # Once you plug in a real, larger dataset, switch back to a proper
    # train/test split (see the commented block below).
    model = RandomForestClassifier(n_estimators=200, random_state=42)
    model.fit(X, y)

    preds = model.predict(X)
    acc = accuracy_score(y, preds)
    print(f"Training accuracy (sanity check only): {acc:.2f}")

    # --- Use this instead once your dataset is larger ---
    # X_train, X_test, y_train, y_test = train_test_split(
    #     X, y, test_size=0.2, random_state=42, stratify=y
    # )
    # model = RandomForestClassifier(n_estimators=200, random_state=42)
    # model.fit(X_train, y_train)
    # preds = model.predict(X_test)
    # acc = accuracy_score(y_test, preds)
    # print(f"Test accuracy: {acc:.2f}")

    joblib.dump(model, MODEL_PATH)
    joblib.dump(vocabulary, VOCAB_PATH)

    print(f"Saved model to {MODEL_PATH}")
    print(f"Saved vocabulary to {VOCAB_PATH}")


if __name__ == "__main__":
    main()
