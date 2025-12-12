import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { auth } from './config';
import { createUser } from './users';

export async function signUp(email: string, password: string, name: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    
    // Create user document in Firestore
    await createUser({
      id: userCredential.user.uid,
      name,
      email,
      role: 'user',
    });

    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing up:', error);
    
    // Provide user-friendly error messages
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered. Please sign in instead.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address format.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password is too weak. Please use at least 6 characters.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing in:', error);
    
    // Firebase v9+ uses 'auth/invalid-credential' as a unified error code
    // Older versions used 'auth/user-not-found' and 'auth/wrong-password'
    if (
      error.code === 'auth/invalid-credential' || 
      error.code === 'auth/user-not-found' || 
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/invalid-credential'
    ) {
      throw new Error('Invalid email or password. Please check your credentials and try again.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address format. Please enter a valid email.');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed login attempts. Please try again later or reset your password.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error. Please check your internet connection and try again.');
    } else if (error.code === 'auth/user-disabled') {
      throw new Error('This account has been disabled. Please contact support.');
    } else if (error.code === 'auth/operation-not-allowed') {
      throw new Error('Email/password sign-in is not enabled. Please contact support.');
    }
    
    // For any other errors, provide a generic message
    throw new Error(error.message || 'Failed to sign in. Please try again.');
  }
}

export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export function getCurrentUser(): Promise<FirebaseUser | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

