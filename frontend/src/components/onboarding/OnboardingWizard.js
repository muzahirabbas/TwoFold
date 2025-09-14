
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../api/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import BasicInfo from './BasicInfo';
import PersonalityTests from './PersonalityTests';
import LifeGoals from './LifeGoals';
import RelationshipGoals from './RelationshipGoals';

const OnboardingWizard = () => {
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({});
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();

  const updateOnboardingData = (section, data) => {
    setOnboardingData(prev => ({ ...prev, [section]: data }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const submitOnboarding = async () => {
    if (!currentUser || !userData.coupleId) {
      console.error("User or couple info missing.");
      return;
    }

    try {
      // Save data to respective collections
      for (const [collectionName, data] of Object.entries(onboardingData)) {
        await addDoc(collection(db, collectionName), {
          ...data,
          uid: currentUser.uid,
          coupleId: userData.coupleId,
          createdAt: new Date(),
        });
      }
      console.log("Onboarding data submitted successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.error("Error submitting onboarding data: ", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfo onNext={nextStep} updateOnboardingData={updateOnboardingData} />;
      case 2:
        return <PersonalityTests onNext={nextStep} updateOnboardingData={updateOnboardingData} />;
      case 3:
        return <LifeGoals onNext={nextStep} updateOnboardingData={updateOnboardingData} />;
      case 4:
        return <RelationshipGoals onNext={submitOnboarding} updateOnboardingData={updateOnboardingData} />;
      default:
        return <div>Onboarding Complete!</div>;
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Welcome! Let's get to know you.</h1>
      <div style={{ marginBottom: '20px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
          <div style={{
              width: `${progress}%`,
              backgroundColor: '#76c7c0',
              height: '10px',
              borderRadius: '5px',
              transition: 'width 0.5s ease-in-out'
          }}></div>
      </div>
      {renderStep()}
    </div>
  );
};

export default OnboardingWizard;
