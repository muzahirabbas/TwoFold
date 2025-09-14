
import React, { useState } from 'react';

const RelationshipGoals = ({ onNext, updateOnboardingData }) => {
  const [formData, setFormData] = useState({
    communication: '',
    intimacy: '',
    family: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOnboardingData('relationship_goals', formData);
    onNext(); // This will now trigger the final submission
  };

  return (
    <div>
      <h2>Step 4: Your Relationship Goals</h2>
      <p>What do you want to achieve together?</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Communication</label>
          <textarea
            name="communication"
            value={formData.communication}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Argue more constructively, share our feelings more openly..."
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Intimacy & Connection</label>
          <textarea
            name="intimacy"
            value={formData.intimacy}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Spend more quality time together, be more physically affectionate..."
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Family & Shared Future</label>
          <textarea
            name="family"
            value={formData.family}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Decide on having kids, align on financial goals..."
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit">Finish Onboarding</button>
      </form>
    </div>
  );
};

export default RelationshipGoals;
