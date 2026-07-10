import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const appointmentRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/appointments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(appointmentRes.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="dashboard">
      <h1>👨‍⚕️ Doctor Dashboard</h1>

      <div className="dashboard-grid">
        <section className="dashboard-card">
          <h2>📊 Statistics</h2>
          <div className="stats">
            <div className="stat-item">
              <p className="stat-number">{appointments.length}</p>
              <p>Appointments</p>
            </div>
          </div>
        </section>

        <section className="dashboard-card">
          <h2>📅 Patient Appointments</h2>
          <div className="appointments-list">
            {appointments.map(apt => (
              <div key={apt._id} className="appointment-item">
                <p><strong>{apt.patientId.name}</strong></p>
                <p>{new Date(apt.appointmentDate).toLocaleString()}</p>
                <p>Status: {apt.status}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DoctorDashboard;
