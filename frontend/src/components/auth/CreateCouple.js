// File: frontend/src/components/auth/CreateCouple.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../api/firebase'; // Ensure auth is exported from firebase.js
import { getFunctions, httpsCallable } from "firebase/functions";
import { collection, addDoc, doc, updateDoc, writeBatch, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

// Helper to generate a simple, readable code
const generateInviteCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  code += '-';
  for (let i = 0; i < 4; i++) code += nums.charAt(Math.floor(Math.random() * nums.length));
  return code;
};

const CreateCouple = () => {
  const { currentUser, userData } = useAuth();
  const [inviteCode, setInviteCode] = useState('');
  const [userInviteCode, setUserInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Listen for changes to the user's coupleId to auto-navigate
  useEffect(() => {
    if (userData && userData.coupleId) {
      const unsub = onSnapshot(doc(db, "couples", userData.coupleId), (doc) => {
        if (doc.exists() && doc.data().status === 'active') {
          navigate('/dashboard');
        }
      });
      return () => unsub();
    }
  }, [userData, navigate]);

  const handleCreateCouple = async () => {
    setError('');
    setLoading(true);

    const newInviteCode = generateInviteCode();
    
    try {
      const coupleRef = await addDoc(collection(db, "couples"), {
        memberIds: [currentUser.uid],
        status: 'pending_partner', // Waiting for partner to join
        createdAt: new Date(),
        inviteCode: newInviteCode,
      });

      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { coupleId: coupleRef.id });
      
      setInviteCode(newInviteCode); // Show the code to the user
      setSuccess("Couple created! Share this code with your partner.");

    } catch (err) {
      console.error("Error creating couple:", err);
      setError("Failed to create a couple. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCouple = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const functions = getFunctions();
    const joinCouple = httpsCallable(functions, 'joinCoupleWithCode');

    try {
      const result = await joinCouple({ code: userInviteCode.toUpperCase() });
      if (result.data.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Error joining couple:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (userData?.coupleId && !inviteCode) {
    return (
      <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
        <h2>Waiting for your partner...</h2>
        <LoadingSpinner />
        <p>Your partner needs to join using your invite code.</p>
        <p>If you don't know your code, please refresh or check your couple's details (feature to be added).</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Create or Join a Couple</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      {inviteCode ? (
        <div style={{ textAlign: 'center', padding: '20px', border: '2px dashed #ccc', borderRadius: '8px' }}>
          <h3>Your Invite Code:</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '2px', margin: '10px 0' }}>{inviteCode}</p>
          <button onClick={() => navigator.clipboard.writeText(inviteCode)}>Copy Code</button>
          <p style={{marginTop: '20px'}}>Waiting for your partner to join...</p>
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <h3>Create a New Couple</h3>
          <p>Start a new couple account and get an invite code for your partner.</p>
          <button onClick={handleCreateCouple} disabled={loading}>
            {loading ? 'Creating...' : 'Create Couple'}
          </button>
        </div>
      )}

      <hr style={{ margin: '30px 0' }} />

      <div>
        <h3>Join Your Partner</h3>
        <p>If your partner has already given you an invite code, enter it here.</p>
        <form onSubmit={handleJoinCouple}>
          <input 
            type="text"
            placeholder="E.G., ABCD-1234"
            value={userInviteCode}
            onChange={(e) => setUserInviteCode(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <button type="submit" disabled={loading}>Join Couple</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCouple;