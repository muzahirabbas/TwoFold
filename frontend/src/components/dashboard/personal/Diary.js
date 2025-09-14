
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

const Diary = () => {
  const [entry, setEntry] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) {
      setMessage("Please write something before submitting.");
      return;
    }
    setLoading(true);
    setMessage('');

    try {
      // The backend URL should be stored in an environment variable
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
      const response = await fetch(`${backendUrl}/submit-daily-input`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser.uid,
          diaryEntry: entry,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setMessage("Your entry has been submitted! Check the 'Advice' section for your reflection.");
      setEntry(''); // Clear textarea
    } catch (error) {
      console.error("Error submitting diary entry:", error);
      setMessage("Failed to submit your entry. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  };

  return (
    <div style={cardStyle}>
      <h3>Daily Reflection</h3>
      <p>How are you feeling about your relationship today?</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          rows="5"
          placeholder="Write your thoughts here..."
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
        />
        <button type="submit" disabled={loading} style={{ marginTop: '10px', padding: '10px 20px' }}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default Diary;
