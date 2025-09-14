
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../api/firebase';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user } = await signup(email, password);
      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        coupleId: null,
        joinedAt: new Date(),
      });
      navigate('/create-couple'); // Redirect to create/join couple page
    } catch (err) {
      setError('Failed to create an account. The email may already be in use.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px' }}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
