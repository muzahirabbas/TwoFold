
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '50px 20px',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    color: '#333',
  };

  const textStyle = {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '600px',
    margin: '20px auto',
  };

  const buttonStyle = {
    padding: '12px 25px',
    fontSize: '1.1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Build a Stronger Connection</h1>
      <p style={textStyle}>
        An AI-powered coach designed for you and your partner. Get personalized insights, fun challenges, and guided conversations to grow together.
      </p>
      <Link to="/signup" style={buttonStyle}>
        Get Started
      </Link>
    </div>
  );
};

export default HomePage;
