
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { db } from '../../../api/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import LoadingSpinner from '../../common/LoadingSpinner';

const Quizzes = () => {
  const { currentUser, userData } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData || !userData.coupleId) return;

    const q = query(
      collection(db, 'quizzes'),
      where('coupleId', '==', userData.coupleId),
      where('status', '==', 'pending')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedQuizzes = [];
      querySnapshot.forEach((doc) => {
        fetchedQuizzes.push({ id: doc.id, ...doc.data() });
      });
      setQuizzes(fetchedQuizzes);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching quizzes:", error);
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

  const handleTakeQuiz = (quizId) => {
    // This would navigate to a quiz-taking component
    alert(`Taking quiz ${quizId}. This feature is not yet implemented.`);
  }

  return (
    <div style={cardStyle}>
      <h3>Your Quizzes</h3>
      {loading ? <LoadingSpinner /> : (
        quizzes.length > 0 ? (
          <ul>
            {quizzes.map(quiz => (
              <li key={quiz.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span>{quiz.title}</span>
                <button onClick={() => handleTakeQuiz(quiz.id)}>Take Quiz</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No new quizzes right now. Check back later!</p>
        )
      )}
    </div>
  );
};

export default Quizzes;
