
import React from 'react';
import Signup from '../components/auth/Signup';
import CreateCouple from '../components/auth/CreateCouple';
import { useAuth } from '../hooks/useAuth';

const SignupPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
        {!currentUser ? (
            <Signup />
        ) : (
            <CreateCouple />
        )}
    </div>
  );
};

export default SignupPage;
