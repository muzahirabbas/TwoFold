
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { db } from '../../../api/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import LoadingSpinner from '../../common/LoadingSpinner';

const ReportCard = () => {
  const { userData } = useAuth();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData || !userData.coupleId) return;

    const reportsRef = collection(db, 'reports');
    const q = query(
      reportsRef,
      where('coupleId', '==', userData.coupleId),
      where('type', '==', 'weekly_summary'),
      orderBy('createdAt', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const latestReport = querySnapshot.docs[0].data();
        setReport(latestReport.content);
      } else {
        setReport(null);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching report card:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userData]);
  
  const cardStyle = {
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  };

  if (loading) {
    return <div style={cardStyle}><LoadingSpinner /></div>;
  }
  
  return (
    <div style={cardStyle}>
      <h3>Your Weekly Relationship Report</h3>
      {report ? (
        <div>
          <h4>✨ Shared Strength</h4>
          <p>{report.strength}</p>
          <h4>🌱 Opportunity for Growth</h4>
          <p>{report.growth_opportunity}</p>
          <h4>💬 Conversation Starter</h4>
          <p><em>"{report.conversation_starter}"</em></p>
        </div>
      ) : (
        <p>Your first weekly report is being generated. Keep engaging with the app!</p>
      )}
    </div>
  );
};

export default ReportCard;
