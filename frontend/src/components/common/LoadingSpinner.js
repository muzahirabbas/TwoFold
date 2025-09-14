
import React from 'react';

const LoadingSpinner = () => {
  const spinnerStyle = {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    borderLeftColor: '#09f',
    animation: 'spin 1s ease infinite',
    margin: '20px auto',
  };

  const keyframes = `
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <div>
      <style>{keyframes}</style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default LoadingSpinner;
