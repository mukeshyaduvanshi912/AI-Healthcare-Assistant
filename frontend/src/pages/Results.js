import React, { useEffect, useState } from 'react';

const Results = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('lastDiagnosis');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  if (!data) {
    return (
      <h2 className="mt-10 text-center">
        No diagnosis found
      </h2>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-2xl p-6 mx-auto bg-white shadow rounded-xl">

        <h1 className="mb-4 text-2xl font-bold">
          🧠 Diagnosis Result
        </h1>

        <p><strong>Disease:</strong> {data.disease}</p>
        <p><strong>Confidence:</strong> {data.confidence}%</p>

        <div className="mt-4">
          <h3 className="font-semibold">Possible Causes:</h3>
          <ul>
            {data.possibleCauses?.map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Recommended Tests:</h3>
          <ul>
            {data.recommendedTests?.map((t, i) => (
              <li key={i}>• {t}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Health Advice:</h3>
          <ul>
            {data.healthAdvice?.map((a, i) => (
              <li key={i}>• {a}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Results;