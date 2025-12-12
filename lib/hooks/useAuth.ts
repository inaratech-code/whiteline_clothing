import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { getCurrentUser, signIn, signUp, logOut } from '@/lib/firebase/auth';
import { getUserById } from '@/lib/firebase/users';
import { User } from '@/lib/types';
import { clearUserData, clearAllUserData } from '@/lib/utils/storage';

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to refresh user data from Firestore
  const refreshUserData = async (userId: string) => {
    try {
      const userDoc = await getUserById(userId);
      if (userDoc) {
        console.log('✅ User data refreshed from Firestore:', { 
          id: userDoc.id, 
          email: userDoc.email, 
          role: userDoc.role 
        });
        setUserData(userDoc);
        return userDoc;
      }
      return null;
    } catch (error: any) {
      console.warn('Could not refresh user document:', error.message);
      setUserData(null);
      return null;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        // Fetch user data in background (non-blocking)
        if (currentUser) {
          getUserById(currentUser.uid)
            .then((userDoc) => {
              if (userDoc) {
                setUserData(userDoc);
              }
            })
            .catch((error) => {
              // Silently fail - user is authenticated, Firestore data is optional
              console.warn('Could not fetch user document (non-blocking):', error.message);
            });
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      // Clear all guest data before signing in
      clearUserData(null); // Clear guest data
      
      const user = await signIn(email, password);
      setUser(user);
      
      // Fetch user data in background (non-blocking)
      // Don't wait for it - allow login to proceed immediately
      getUserById(user.uid)
        .then((userDoc) => {
          if (userDoc) {
            setUserData(userDoc);
          }
        })
        .catch((error) => {
          // Silently fail - user is authenticated, Firestore data is optional
          console.warn('Could not fetch user document (non-blocking):', error.message);
        });
      
      return user;
    } catch (error: any) {
      // Re-throw the error so the login page can display it
      // The error should already have a user-friendly message from auth.ts
      throw error;
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    // Clear all guest data before signing up
    clearUserData(null); // Clear guest data
    
    const user = await signUp(email, password, name);
    const userDoc = await getUserById(user.uid);
    setUser(user);
    setUserData(userDoc);
    return user;
  };

  const handleSignOut = async () => {
    // Clear all user-specific data before signing out
    if (user) {
      clearUserData(user.uid);
    }
    
    await logOut();
    setUser(null);
    setUserData(null);
  };

  return {
    user,
    userData,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    isAdmin: userData?.role === 'admin',
  };
}

