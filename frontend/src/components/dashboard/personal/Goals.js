
import React from 'react';

const Goals = () => {
    const cardStyle = {
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    };

    // Dummy data for goals
    const personalGoals = [
        { id: 1, text: 'Improve active listening during disagreements.', progress: 75 },
        { id: 2, text: 'Plan a dedicated date night once a week.', progress: 50 },
        { id: 3, text: 'Express appreciation for my partner daily.', progress: 90 },
    ];

    return (
        <div style={cardStyle}>
            <h3>Your Goals</h3>
            <div>
                {personalGoals.map(goal => (
                    <div key={goal.id} style={{ marginBottom: '15px' }}>
                        <p>{goal.text}</p>
                        <div style={{ backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
                            <div style={{
                                width: `${goal.progress}%`,
                                backgroundColor: '#4caf50',
                                height: '20px',
                                borderRadius: '5px',
                                textAlign: 'center',
                                color: 'white',
                                lineHeight: '20px'
                            }}>
                                {goal.progress}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Goals;
