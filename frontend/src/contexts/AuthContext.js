
import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../api/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import LoadingSpinner from '../components/common/LoadingSpinner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUserData(doc.data());
          } else {
            setUserData(null);
          }
          setLoading(false);
        });
        return () => unsubscribeSnapshot();
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return unsubscribeAuth;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};
