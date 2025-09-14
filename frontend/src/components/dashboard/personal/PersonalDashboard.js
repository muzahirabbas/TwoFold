
import React from 'react';
import Advice from './Advice';
import Diary from './Diary';
import Quizzes from './Quizzes';
import Goals from './Goals';

const PersonalDashboard = () => {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',
    padding: '20px',
  };

  return (
    <div>
      <h2>Your Personal Dashboard</h2>
      <div style={containerStyle}>
        <Advice />
        <Diary />
        <Quizzes />
        <Goals />
      </div>
    </div>
  );
};

export default PersonalDashboard;
