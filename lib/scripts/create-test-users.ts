/**
 * Script to create test users for development
 * Run with: npm run create-test-users
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import { createUser, updateUserRole } from '../firebase/users';

const TEST_USERS = [
  {
    email: 'user@whiteline.com',
    password: 'testuser123',
    name: 'Test User',
    role: 'user' as const,
  },
  {
    email: 'admin@whiteline.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
  },
];

async function createTestUsers() {
  console.log('🚀 Creating test users...\n');

  for (const userData of TEST_USERS) {
    try {
      console.log(`Creating ${userData.role} account: ${userData.email}`);

      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: userData.name,
      });

      // Create user document in Firestore
      await createUser({
        id: userCredential.user.uid,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });

      // If admin, ensure role is set
      if (userData.role === 'admin') {
        await updateUserRole(userCredential.user.uid, 'admin');
      }

      console.log(`✅ ${userData.role} account created successfully!\n`);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`⚠️  Account ${userData.email} already exists. Skipping...\n`);
      } else {
        console.error(`❌ Error creating ${userData.email}:`, error.message);
      }
    }
  }

  console.log('✨ Test users setup complete!\n');
  console.log('📋 Test Credentials:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👤 Regular User:');
  console.log('   Email: user@whiteline.com');
  console.log('   Password: testuser123');
  console.log('   Role: user');
  console.log('');
  console.log('👑 Admin User:');
  console.log('   Email: admin@whiteline.com');
  console.log('   Password: admin123');
  console.log('   Role: admin');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// Run if executed directly
createTestUsers()
  .then(() => {
    console.log('\n✅ All done! You can now login with these credentials.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error:', error);
    process.exit(1);
  });

export { createTestUsers };

