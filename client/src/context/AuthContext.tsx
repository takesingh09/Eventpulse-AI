import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db, isFirebaseConfigured } from '../services/firebase';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for when Firebase is not configured
const DEMO_USER: User = {
  uid: 'demo-user-1',
  name: 'Alex Demo',
  email: 'alex@demo.com',
  photoURL: '',
  interests: ['Artificial Intelligence', 'Web Development', 'Cloud Computing'],
  savedSessions: ['s1', 's3', 's7'],
  language: 'en',
  isAdmin: true,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [demoMode] = useState(!isFirebaseConfigured());

  useEffect(() => {
    if (demoMode) {
      setUser(DEMO_USER);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data() as User);
          } else {
            const newUser: User = {
              uid: fbUser.uid,
              name: fbUser.displayName || 'Attendee',
              email: fbUser.email || '',
              photoURL: fbUser.photoURL || '',
              interests: [],
              savedSessions: [],
              language: 'en',
              isAdmin: false,
            };
            await setDoc(doc(db, 'users', fbUser.uid), newUser);
            setUser(newUser);
          }
        } catch (err) {
          console.error('[Auth] Error loading user profile:', err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [demoMode]);

  const signIn = useCallback(async () => {
    if (demoMode) {
      setUser(DEMO_USER);
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('[Auth] Sign-in error:', err);
    }
  }, [demoMode]);

  const signOut = useCallback(async () => {
    if (demoMode) {
      setUser(null);
      return;
    }
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (err) {
      console.error('[Auth] Sign-out error:', err);
    }
  }, [demoMode]);

  const updateUser = useCallback(async (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    if (!demoMode) {
      try {
        await setDoc(doc(db, 'users', user.uid), updated, { merge: true });
      } catch (err) {
        console.error('[Auth] Update user error:', err);
      }
    }
  }, [user, demoMode]);

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
