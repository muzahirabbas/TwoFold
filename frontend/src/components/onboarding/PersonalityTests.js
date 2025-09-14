
import React, { useState } from 'react';

const PersonalityTests = ({ onNext, updateOnboardingData }) => {
  // Mock questions for a simplified Big Five test
  const questions = {
    "Big Five": [
      "I am the life of the party.",
      "I am always prepared.",
      "I get stressed out easily.",
      "I have a rich vocabulary.",
      "I am interested in people."
    ]
  };
  const testType = "Big Five";
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: parseInt(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions[testType].length) {
      alert("Please answer all questions.");
      return;
    }
    // In a real app, you would compute scores here before saving.
    const computedScores = {
        openness: answers[3] + answers[4],
        conscientiousness: answers[1],
        extraversion: answers[0],
        agreeableness: answers[4],
        neuroticism: answers[2],
    };

    updateOnboardingData('personality_tests', {
        testType,
        rawAnswers: answers,
        computedScores,
    });
    onNext();
  };

  return (
    <div>
      <h2>Step 2: Personality Snapshot ({testType})</h2>
      <p>Rate the following statements on a scale of 1 (Disagree) to 5 (Agree).</p>
      <form onSubmit={handleSubmit}>
        {questions[testType].map((q, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <p>{index + 1}. {q}</p>
            <div>
              {[1, 2, 3, 4, 5].map(val => (
                <label key={val} style={{ marginRight: '15px' }}>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value={val}
                    checked={answers[index] === val}
                    onChange={() => handleAnswerChange(index, val)}
                    required
                  /> {val}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default PersonalityTests;
