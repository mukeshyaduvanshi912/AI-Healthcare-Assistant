import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const statsRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/statistics`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const usersRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="dashboard">
      <h1>⚙️ Admin Dashboard</h1>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Doctors</h3>
            <p className="stat-number">{stats.totalDoctors}</p>
          </div>
          <div className="stat-card">
            <h3>Total Patients</h3>
            <p className="stat-number">{stats.totalPatients}</p>
          </div>
          <div className="stat-card">
            <h3>Total Diagnoses</h3>
            <p className="stat-number">{stats.totalDiagnoses}</p>
          </div>
        </div>
      )}

      <section className="users-section">
        <h2>User Management</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isVerified ? '✓' : '✗'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
