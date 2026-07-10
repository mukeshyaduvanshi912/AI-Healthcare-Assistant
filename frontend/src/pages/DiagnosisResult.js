import React from "react";

function DiagnosisResult({ result }) {
  // If no result yet
  if (!result) {
    return <p>No data available</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🩺 Diagnosis Result</h2>

      {/* ✅ MAIN FIX: use result.disease */}
      {result.disease ? (
        <>
          <h3>Disease: {result.disease}</h3>
          <p>Confidence: {result.confidence}%</p>

          <h4>Health Advice:</h4>
          <ul>
            {result.healthAdvice?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Possible Causes:</h4>
          <ul>
            {result.possibleCauses?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Recommended Tests:</h4>
          <ul>
            {result.recommendedTests?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>❌ No diagnosis found</p>
      )}
    </div>
  );
}

export default DiagnosisResult;