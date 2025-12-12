/**
 * Script to set up admin user document in Firestore
 * Run with: npm run setup-admin
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { createUser, updateUserRole } from '../firebase/users';

const ADMIN_UID = 'puZBmzHjSuer7CZDwMlkq72X8gj2';
const ADMIN_EMAIL = 'admin@whiteline.com';
const ADMIN_NAME = 'Admin User';

async function setupAdminUser() {
  console.log('🚀 Setting up admin user...\n');
  console.log(`UID: ${ADMIN_UID}`);
  console.log(`Email: ${ADMIN_EMAIL}\n`);

  try {
    // Create or update user document in Firestore
    await createUser({
      id: ADMIN_UID,
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      role: 'admin',
    });

    // Ensure role is set to admin
    await updateUserRole(ADMIN_UID, 'admin');

    console.log('✅ Admin user document created/updated successfully!');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Role: admin`);
    console.log(`   UID: ${ADMIN_UID}\n`);
    console.log('✨ Setup complete! You can now login with:');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: Admin@123`);
  } catch (error: any) {
    console.error('❌ Error setting up admin user:', error.message);
    console.error('Full error:', error);
    throw error;
  }
}

// Run if executed directly
setupAdminUser()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error:', error);
    process.exit(1);
  });

export { setupAdminUser };

