import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Loader } from 'lucide-react';

const DiagnosisForm = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const symptoms = [
    'Fever', 'Headache', 'Cough', 'Fatigue', 'Vomiting',
    'Chest Pain', 'Sore Throat', 'Nausea', 'Diarrhea',
    'Shortness of Breath', 'Body Aches', 'Runny Nose'
  ];

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
    setError('');
  };

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/diagnosis/predict',
        {
          symptoms: selectedSymptoms.map(s =>
            s.toLowerCase().replace(/\s+/g, "_")
          )
        }
      );

      console.log("✅ API RESPONSE:", response.data);

      // ✅ Save result
      localStorage.setItem('lastDiagnosis', JSON.stringify(response.data));

      // ✅ Navigate correctly
      navigate('/results');

    } catch (err) {
      console.error(err);
      setError('Failed to get diagnosis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            🩺 AI Symptom Checker
          </h1>
          <p className="text-lg text-gray-600">
            Select your symptoms to get AI-powered health insights
          </p>
        </div>

        {error && (
          <div className="flex gap-3 p-4 mb-6 border-l-4 border-red-500 rounded-lg bg-red-50">
            <AlertCircle className="text-red-600" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="mb-6 text-xl font-semibold">Select Symptoms</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {symptoms.map(symptom => (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`p-4 rounded-xl border-2 flex items-center justify-center gap-2 transition ${
                  selectedSymptoms.includes(symptom)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 border-gray-200 hover:bg-blue-50'
                }`}
              >
                {selectedSymptoms.includes(symptom) && (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                {symptom}
              </button>
            ))}
          </div>

        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handlePredict}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              '🤖 Get AI Prediction'
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DiagnosisForm;