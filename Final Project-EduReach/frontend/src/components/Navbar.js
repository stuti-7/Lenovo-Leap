import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="page-container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span>Edu<strong>Reach</strong></span>
        </Link>

        <div className="navbar-links">
          <Link to="/resources" className={location.pathname === '/resources' ? 'active' : ''}>Browse</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Add Resources</Link>
          )}
          {user?.role === 'Educator' && (
            <Link to="/Educator" className={location.pathname === '/Educator' ? 'active' : ''}>
              Add Resources
            </Link>
          )}
          {user && (
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
          )}
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <span className="user-greeting">
                Hi, {user.role === 'admin' ? <span className="admin-tag">Admin</span> : user.name.split(' ')[0]}
              </span>
              <button className="btn-secondary" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"><button className="btn-secondary">Login</button></Link>
              <Link to="/register"><button className="btn-primary">Sign Up</button></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
