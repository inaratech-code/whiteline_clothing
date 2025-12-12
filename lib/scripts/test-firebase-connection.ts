/**
 * Script to test Firebase connection
 * Run with: npm run test-firebase
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local FIRST, before any other imports
const envPath = resolve(process.cwd(), '.env.local');
const result = config({ path: envPath });

if (result.error) {
  console.error('❌ Error loading .env.local:', result.error);
  console.error('Make sure .env.local exists in the project root');
  process.exit(1);
}

// Verify environment variables are loaded
const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID'
];

const missing = requiredVars.filter(v => !process.env[v] || process.env[v]?.includes('your-'));
if (missing.length > 0) {
  console.error('❌ Missing or invalid environment variables:', missing);
  console.error('Current PROJECT_ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log('');

// Now import Firebase (after env vars are loaded)
import { db, auth } from '../firebase/config';
import { collection, getDocs, query, limit } from 'firebase/firestore';

async function testFirebaseConnection() {
  console.log('🔍 Testing Firebase connection...\n');

  try {
    // Test 1: Check if Firestore is accessible
    console.log('1. Testing Firestore connection...');
    const testQuery = query(collection(db, 'users'), limit(1));
    await getDocs(testQuery);
    console.log('   ✅ Firestore connection successful!\n');

    // Test 2: Check Auth
    console.log('2. Testing Firebase Auth...');
    if (auth) {
      console.log('   ✅ Firebase Auth initialized!\n');
    } else {
      console.log('   ❌ Firebase Auth not initialized\n');
    }

    // Test 3: Try to read a collection
    console.log('3. Testing data access...');
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    console.log(`   ✅ Successfully connected! Found ${snapshot.size} user(s) in database\n`);

    console.log('✨ All Firebase connections are working!');
    return true;
  } catch (error: any) {
    console.error('❌ Firebase connection failed!\n');
    console.error('Error details:', {
      code: error.code,
      message: error.message
    });
    console.error('\nTroubleshooting:');
    console.error('1. Check .env.local file has correct Firebase config');
    console.error('2. Verify Firestore database is created in Firebase Console');
    console.error('3. Check Firestore security rules allow read access');
    console.error('4. Verify network connection');
    return false;
  }
}

testFirebaseConnection()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });

