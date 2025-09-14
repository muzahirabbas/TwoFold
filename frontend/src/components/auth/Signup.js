// File: frontend/src/components/auth/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../../api/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Import the necessary Firebase functions for Google Sign-In
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        coupleId: null,
        joinedAt: new Date(),
      });
      navigate('/create-couple');
    } catch (err) {
      setError('Failed to create an account. The email may already be in use.');
      console.error(err);
    }

    setLoading(false);
  };

  // --- START: Added Google Sign-in Logic ---
  const handleSocialLogin = async (provider) => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          coupleId: null,
          joinedAt: new Date(),
        });
      }
      
      const finalUserDoc = await getDoc(userDocRef);
      if (finalUserDoc.data().coupleId) {
         navigate('/dashboard');
      } else {
         navigate('/create-couple');
      }

    } catch (err) {
      setError('Failed to sign up with provider. Please try again.');
      console.error("Social login error:", err);
    } finally {
        setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    const provider = new GoogleAuthProvider();
    handleSocialLogin(provider);
  };
  // --- END: Added Google Sign-in Logic ---

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Google Sign-Up Button */}
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={handleGoogleSignUp} disabled={loading} style={{backgroundColor: '#4285F4'}}>
             Sign up with Google
          </button>
      </div>

      <p style={{textAlign: 'center'}}>OR</p>

      {/* Email/Password Form */}
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
