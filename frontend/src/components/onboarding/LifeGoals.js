
import React, { useState } from 'react';

const LifeGoals = ({ onNext, updateOnboardingData }) => {
  const [formData, setFormData] = useState({
    career: '',
    lifestyle: '',
    values: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOnboardingData('life_goals', formData);
    onNext();
  };

  return (
    <div>
      <h2>Step 3: Your Life Goals</h2>
      <p>What are your personal ambitions?</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Career Ambitions</label>
          <textarea
            name="career"
            value={formData.career}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Start my own business, reach a leadership position..."
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Desired Lifestyle</label>
          <textarea
            name="lifestyle"
            value={formData.lifestyle}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Travel the world, live in a quiet town, be financially independent..."
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Core Personal Values</label>
          <textarea
            name="values"
            value={formData.values}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Honesty, creativity, family, community..."
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default LifeGoals;
