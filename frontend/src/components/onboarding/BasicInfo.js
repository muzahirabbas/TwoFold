
import React, { useState } from 'react';

const BasicInfo = ({ onNext, updateOnboardingData }) => {
  const [formData, setFormData] = useState({
    age: '',
    occupation: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOnboardingData('basic_info', formData);
    onNext();
  };

  return (
    <div>
      <h2>Step 1: Basic Information</h2>
      <p>This helps us understand your context.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Occupation</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default BasicInfo;
