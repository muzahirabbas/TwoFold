
import React from 'react';
import ReportCard from './ReportCard';
import Games from './Games';

const SharedDashboard = () => {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f0f4f8',
    borderRadius: '8px'
  };

  return (
    <div>
      <h2>Our Shared Space</h2>
      <p>This is a space for both of you, with insights and activities curated by your AI strategist.</p>
      <div style={containerStyle}>
        <ReportCard />
        <Games />
      </div>
    </div>
  );
};

export default SharedDashboard;
