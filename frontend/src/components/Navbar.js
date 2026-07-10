import React from 'react';

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">
          <h1>🏥 Healthcare Assistant</h1>
        </div>
        <ul className="nav-menu">
          <li><a href="/">Home</a></li>
          {user ? (
            <>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><button onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}>Logout</button></li>
            </>
          ) : (
            <>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
