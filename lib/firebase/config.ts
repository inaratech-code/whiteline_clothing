import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Load dotenv for server-side scripts (like seed.ts)
if (typeof window === 'undefined') {
  try {
    const { config } = require('dotenv');
    const { resolve } = require('path');
    config({ path: resolve(process.cwd(), '.env.local') });
  } catch (e) {
    // dotenv might not be available, that's okay for client-side
  }
}

// Create a function to get config at runtime (after dotenv loads)
function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "your-api-key",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "your-app-id",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined
  };
}

// For backward compatibility, also export as object (but it will be created lazily)
const firebaseConfig = getFirebaseConfig();

// Server-side validation (for scripts like seed.ts)
if (typeof window === 'undefined') {
  const hasPlaceholders = 
    firebaseConfig.projectId === 'your-project-id' ||
    firebaseConfig.projectId.includes('your-') ||
    firebaseConfig.apiKey === 'your-api-key' ||
    firebaseConfig.apiKey.includes('your-');
  
  if (hasPlaceholders) {
    console.error('❌ Firebase configuration error in server-side script!');
    console.error('Project ID:', firebaseConfig.projectId);
    console.error('\n💡 SOLUTION: Make sure dotenv loads .env.local BEFORE importing Firebase config.');
    console.error('In your script, load dotenv FIRST:');
    console.error('  import { config } from "dotenv";');
    console.error('  config({ path: ".env.local" });');
    console.error('  // THEN import Firebase functions');
  }
}

// Validate that Firebase config values are set (only in development, client-side)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const placeholderValues = [
    'your-api-key',
    'your-project.firebaseapp.com',
    'your-project-id',
    'your-project.appspot.com',
    '123456789',
    'your-app-id'
  ];
  
  const configValues = [
    firebaseConfig.apiKey,
    firebaseConfig.authDomain,
    firebaseConfig.projectId,
    firebaseConfig.storageBucket,
    firebaseConfig.messagingSenderId,
    firebaseConfig.appId
  ];
  
  const hasPlaceholders = configValues.some((value, index) => 
    value === placeholderValues[index] || value.includes('your-')
  );
  
  if (hasPlaceholders) {
    console.error('❌ Firebase configuration is using placeholder values!');
    console.error('Current config:', {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
      apiKey: firebaseConfig.apiKey?.substring(0, 10) + '...'
    });
    console.error('Please:');
    console.error('1. Check your .env.local file exists in the project root');
    console.error('2. Ensure all NEXT_PUBLIC_FIREBASE_* variables are set');
    console.error('3. Restart your dev server (npm run dev)');
    console.error('4. Clear browser cache and hard refresh (Ctrl+Shift+R)');
  } else {
    console.log('✅ Firebase config loaded:', {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain
    });
  }
}

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// Initialize Firebase for both client and server
// Use getFirebaseConfig() to get fresh env vars (in case dotenv loaded after module import)
if (!getApps().length) {
  const config = getFirebaseConfig();
  app = initializeApp(config);
} else {
  app = getApps()[0];
}

// Initialize services
if (typeof window !== 'undefined') {
  // Client-side initialization
  auth = getAuth(app);
  // Set persistence to SESSION so users stay logged in during the same browser session
  // but are logged out when the browser is closed
  setPersistence(auth, browserSessionPersistence).catch((error) => {
    console.error('Error setting auth persistence:', error);
  });
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  // Server-side initialization
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { app, auth, db, storage };
export default app;

