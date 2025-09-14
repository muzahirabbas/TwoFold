
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';

import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import CreateCouple from './components/auth/CreateCouple';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-couple" element={
            <PrivateRoute>
              <CreateCouple />
            </PrivateRoute>
          } />
          <Route path="/onboarding" element={
            <PrivateRoute>
              <OnboardingPage />
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
