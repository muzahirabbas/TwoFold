
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#f8f8f8',
    borderBottom: '1px solid #ddd',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    margin: '0 10px',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={{ ...linkStyle, fontWeight: 'bold' }}>
        TwoFold
      </Link>
      <div>
        {currentUser ? (
          <>
            <Link to="/dashboard" style={linkStyle}>
              Dashboard
            </Link>
            <button onClick={handleLogout} style={{ border: 'none', background: 'transparent', color: '#333', cursor: 'pointer', fontSize: '1rem' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/signup" style={linkStyle}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
