/**
 * Script to create a Firestore user document for an existing Firebase Auth user
 * Usage: tsx lib/scripts/create-user-doc.ts <email> <uid> <role>
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { createUser } from '../firebase/users';

const email = process.argv[2] || 'test@whiteline.com';
const uid = process.argv[3] || 'KPXCJ0Rd6UW7fqlzwOGwGmDY8sk1';
const role = (process.argv[4] || 'user') as 'user' | 'admin';
const name = email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());

async function createUserDocument() {
  try {
    console.log(`Creating user document for ${email}...`);
    console.log(`UID: ${uid}`);
    console.log(`Role: ${role}`);
    console.log(`Name: ${name}\n`);

    await createUser({
      id: uid,
      email,
      name,
      role,
    });

    console.log(`✅ User document created successfully!`);
    console.log(`\nYou can now login with:`);
    console.log(`Email: ${email}`);
    console.log(`Password: (the password you set in Firebase Console)`);
  } catch (error: any) {
    if (error.code === 'permission-denied') {
      console.error('❌ Permission denied. Make sure:');
      console.error('   1. Firestore security rules allow creating user documents');
      console.error('   2. You are authenticated or running from server-side');
    } else {
      console.error('❌ Error creating user document:', error.message);
    }
    process.exit(1);
  }
}

createUserDocument()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });

