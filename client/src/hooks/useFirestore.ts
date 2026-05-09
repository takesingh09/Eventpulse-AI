import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../services/firebase';
import { MOCK_SESSIONS, MOCK_QUESTIONS, MOCK_NOTIFICATIONS, MOCK_FEEDBACK } from './mockData';

/**
 * Hook for fetching a Firestore collection with real-time updates.
 */
export function useRealtimeCollection<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setData(getMockData(collectionName) as T[]);
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, collectionName), ...constraints);
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as T[];
          setData(items);
          setLoading(false);
        },
        (err) => {
          console.error(`[Firestore] Error in ${collectionName}:`, err);
          setError(err.message);
          setData(getMockData(collectionName) as T[]);
          setLoading(false);
        },
      );
      return () => unsubscribe();
    } catch (err) {
      setData(getMockData(collectionName) as T[]);
      setLoading(false);
    }
  }, [collectionName]);

  return { data, loading, error };
}

/**
 * Hook for CRUD operations on a Firestore collection.
 */
export function useFirestoreCrud(collectionName: string) {
  const addItem = useCallback(async (data: DocumentData): Promise<string | null> => {
    if (!isFirebaseConfigured()) return `mock-${Date.now()}`;
    try {
      const ref = await addDoc(collection(db, collectionName), data);
      return ref.id;
    } catch (err) {
      console.error(`[Firestore] Add error in ${collectionName}:`, err);
      return null;
    }
  }, [collectionName]);

  const updateItem = useCallback(async (id: string, data: Partial<DocumentData>): Promise<boolean> => {
    if (!isFirebaseConfigured()) return true;
    try {
      await updateDoc(doc(db, collectionName, id), data);
      return true;
    } catch (err) {
      console.error(`[Firestore] Update error in ${collectionName}:`, err);
      return false;
    }
  }, [collectionName]);

  const deleteItem = useCallback(async (id: string): Promise<boolean> => {
    if (!isFirebaseConfigured()) return true;
    try {
      await deleteDoc(doc(db, collectionName, id));
      return true;
    } catch (err) {
      console.error(`[Firestore] Delete error in ${collectionName}:`, err);
      return false;
    }
  }, [collectionName]);

  return { addItem, updateItem, deleteItem };
}

function getMockData(collectionName: string): DocumentData[] {
  switch (collectionName) {
    case 'sessions': return MOCK_SESSIONS;
    case 'questions': return MOCK_QUESTIONS;
    case 'notifications': return MOCK_NOTIFICATIONS;
    case 'feedback': return MOCK_FEEDBACK;
    default: return [];
  }
}
