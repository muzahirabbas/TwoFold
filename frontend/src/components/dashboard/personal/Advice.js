
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { db } from '../../../api/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import LoadingSpinner from '../../common/LoadingSpinner';

const Advice = () => {
  const { currentUser } = useAuth();
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const reportsRef = collection(db, 'reports');
    const q = query(
      reportsRef,
      where('uid', '==', currentUser.uid),
      where('type', '==', 'personal_reflection'),
      orderBy('createdAt', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const latestAdvice = querySnapshot.docs[0].data();
        setAdvice(latestAdvice.content);
      } else {
        setAdvice("No advice available yet. Complete a diary entry to get your first reflection!");
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching advice:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const cardStyle = {
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  };

  return (
    <div style={cardStyle}>
      <h3>Your Personal Coach Says...</h3>
      {loading ? <LoadingSpinner /> : <p><em>"{advice}"</em></p>}
    </div>
  );
};

export default Advice;
