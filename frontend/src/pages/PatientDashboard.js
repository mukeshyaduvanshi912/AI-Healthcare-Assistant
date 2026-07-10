import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientDashboard = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const diagnosisRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/diagnosis/history`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const appointmentRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/appointments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDiagnoses(diagnosisRes.data);
      setAppointments(appointmentRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  return (
    <div className="dashboard">
      <h1>👤 Patient Dashboard</h1>

      <div className="dashboard-grid">
        {/* Quick Actions */}
        <section className="dashboard-card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <a href="/diagnosis" className="btn-primary">🩺 Start New Diagnosis</a>
            <a href="/appointments" className="btn-secondary">📅 Book Appointment</a>
          </div>
        </section>

        {/* Recent Diagnoses */}
        <section className="dashboard-card">
          <h2>Recent Diagnoses</h2>
          {diagnoses.length > 0 ? (
            <div className="list">
              {diagnoses.slice(0, 5).map(d => (
                <div key={d._id} className="list-item">
                  <p>{d.aiPrediction.disease}</p>
                  <p className="confidence">Confidence: {d.aiPrediction.confidence}%</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No diagnoses yet</p>
          )}
        </section>

        {/* Appointments */}
        <section className="dashboard-card">
          <h2>Upcoming Appointments</h2>
          {appointments.length > 0 ? (
            <div className="list">
              {appointments.map(a => (
                <div key={a._id} className="list-item">
                  <p>{new Date(a.appointmentDate).toLocaleDateString()}</p>
                  <p className="time">{a.timeSlot}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No appointments scheduled</p>
          )}
        </section>

        {/* Health Tips */}
        <section className="dashboard-card">
          <h2>💊 Health Tips</h2>
          <ul>
            <li>✓ Drink plenty of water</li>
            <li>✓ Exercise regularly</li>
            <li>✓ Get adequate sleep</li>
            <li>✓ Eat balanced diet</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PatientDashboard;
