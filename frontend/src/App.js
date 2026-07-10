import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DiagnosisForm from './pages/DiagnosisForm';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Results from './pages/Results';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">

        <Navbar user={user} />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={<Login setUser={setUser} setToken={setToken} />}
          />

          <Route
            path="/register"
            element={<Register setUser={setUser} setToken={setToken} />}
          />

          {/* ✅ Diagnosis */}
          <Route path="/diagnosis" element={<DiagnosisForm />} />

          {/* ✅ FIXED (NO ID) */}
          <Route path="/results" element={<Results />} />

          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* ✅ 404 */}
          <Route
            path="*"
            element={
              <h1 className="mt-10 text-xl text-center">
                404 - Page Not Found
              </h1>
            }
          />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;