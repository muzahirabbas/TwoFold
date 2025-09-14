// File: frontend/src/components/auth/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Import the necessary Firebase functions (FacebookAuthProvider is removed)
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from '../../api/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error(err);
    }

    setLoading(false);
  };

  // Generic handler for social sign-ins (still useful for Google)
  const handleSocialLogin = async (provider) => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // IMPORTANT: Check if user exists in Firestore, if not, create them
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
      setError('Failed to sign in with provider. Please try again.');
      console.error("Social login error:", err);
    } finally {
        setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    handleSocialLogin(provider);
  };
  
  // The handleFacebookSignIn function has been completely removed.

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Log In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Social Login Buttons (Facebook button is removed) */}
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={handleGoogleSignIn} disabled={loading} style={{backgroundColor: '#4285F4'}}>
             Sign in with Google
          </button>
      </div>

      <p style={{textAlign: 'center'}}>OR</p>

      <form onSubmit={handleSubmit}>
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
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;