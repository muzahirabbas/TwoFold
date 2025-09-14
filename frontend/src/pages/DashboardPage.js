
import React, { useState } from 'react';
import PersonalDashboard from '../components/dashboard/personal/PersonalDashboard';
import SharedDashboard from '../components/dashboard/shared/SharedDashboard';

const DashboardPage = () => {
  const [view, setView] = useState('personal'); // 'personal' or 'shared'

  const tabStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    borderBottom: '3px solid transparent',
    background: 'none',
    fontSize: '1rem',
  };
  
  const activeTabStyle = {
    ...tabStyle,
    borderBottom: '3px solid #007bff',
    fontWeight: 'bold',
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <button 
          style={view === 'personal' ? activeTabStyle : tabStyle} 
          onClick={() => setView('personal')}
        >
          My Dashboard
        </button>
        <button 
          style={view === 'shared' ? activeTabStyle : tabStyle}
          onClick={() => setView('shared')}
        >
          Our Dashboard
        </button>
      </div>

      {view === 'personal' ? <PersonalDashboard /> : <SharedDashboard />}
    </div>
  );
};

export default DashboardPage;
