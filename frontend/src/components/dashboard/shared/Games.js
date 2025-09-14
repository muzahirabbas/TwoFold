
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { db } from '../../../api/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import LoadingSpinner from '../../common/LoadingSpinner';

const Games = () => {
  const { userData } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData || !userData.coupleId) return;

    const q = query(
      collection(db, 'games'),
      where('coupleId', '==', userData.coupleId),
      where('status', '==', 'pending')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedGames = [];
      querySnapshot.forEach((doc) => {
        fetchedGames.push({ id: doc.id, ...doc.data() });
      });
      setGames(fetchedGames);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching games:", error);
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

  return (
    <div style={cardStyle}>
      <h3>Couple Challenges & Games</h3>
      {loading ? <LoadingSpinner /> : (
        games.length > 0 ? (
          <div>
            {games.map(game => (
              <div key={game.id} style={{ marginBottom: '15px', borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}>
                <h4>{game.name}</h4>
                <p>{game.instructions}</p>
                <button>Let's Play!</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No new games or challenges available. Your strategist is working on it!</p>
        )
      )}
    </div>
  );
};

export default Games;
