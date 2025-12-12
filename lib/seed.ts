// CRITICAL: Load dotenv FIRST before ANY other imports
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
const envPath = resolve(process.cwd(), '.env.local');
const result = config({ path: envPath });

if (result.error) {
  console.error('❌ Error loading .env.local:', result.error.message);
  process.exit(1);
}

// Verify environment variables are loaded
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

if (!projectId || projectId === 'your-project-id' || projectId.includes('your-')) {
  console.error('❌ ERROR: Firebase Project ID not loaded!');
  console.error('Current value:', projectId || 'undefined');
  console.error('Env file path:', envPath);
  console.error('\n💡 SOLUTION:');
  console.error('1. Check your .env.local file exists at:', envPath);
  console.error('2. Make sure NEXT_PUBLIC_FIREBASE_PROJECT_ID=whiteline-clothing-2ac47');
  console.error('3. Restart the terminal and try again');
  process.exit(1);
}

if (!apiKey || apiKey === 'your-api-key' || apiKey.includes('your-')) {
  console.error('❌ ERROR: Firebase API Key not loaded!');
  console.error('Current value:', apiKey ? apiKey.substring(0, 10) + '...' : 'undefined');
  process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log('📋 Project ID:', projectId);
console.log('🔑 API Key:', apiKey.substring(0, 15) + '...');
console.log('');

// Import Firebase functions
// Note: config.ts will also load dotenv, but we've already loaded it above
import { createProduct } from './firebase/products';
import { createCategory } from './firebase/categories';

// Sample categories - Menswear only
const categories = [
  { name: 'Shirts', slug: 'shirts', description: 'Premium mens shirts' },
  { name: 'Pants', slug: 'pants', description: 'Stylish mens pants and trousers' },
  { name: 'Shorts', slug: 'shorts', description: 'Comfortable mens shorts' },
];

// Sample products - Menswear only with AI/High-quality images
const products = [
  {
    name: 'Classic White Shirt',
    description: 'Premium cotton shirt with minimal design. Perfect for everyday wear.',
    price: 2500,
    category: 'shirts',
    gender: 'men' as const,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80',
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80'
    ],
    stock: 50,
  },
  {
    name: 'Essential Blue Shirt',
    description: 'Classic blue shirt with clean lines. Made from premium materials.',
    price: 2500,
    category: 'shirts',
    gender: 'men' as const,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80',
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80'
    ],
    stock: 40,
  },
  {
    name: 'Minimal Black Shirt',
    description: 'Sleek black shirt perfect for any occasion. Premium fit and comfort.',
    price: 2800,
    category: 'shirts',
    gender: 'men' as const,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80',
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80'
    ],
    stock: 35,
  },
  {
    name: 'Classic Black Pants',
    description: 'Essential black pants with premium materials. Perfect for all occasions.',
    price: 4500,
    category: 'pants',
    gender: 'men' as const,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
      'https://images.unsplash.com/photo-1624378515194-6b8c57a2a1aa?w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80'
    ],
    stock: 30,
  },
  {
    name: 'Essential Navy Pants',
    description: 'Stylish navy pants with clean lines. Comfortable and versatile.',
    price: 4500,
    category: 'pants',
    gender: 'men' as const,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
      'https://images.unsplash.com/photo-1624378515194-6b8c57a2a1aa?w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80'
    ],
    stock: 25,
  },
  {
    name: 'Premium Grey Pants',
    description: 'Modern grey pants with minimal design. Premium fit and quality.',
    price: 4800,
    category: 'pants',
    gender: 'men' as const,
    sizes: ['M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
      'https://images.unsplash.com/photo-1624378515194-6b8c57a2a1aa?w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80'
    ],
    stock: 20,
  },
  {
    name: 'Classic Black Shorts',
    description: 'Comfortable black shorts perfect for casual wear. Premium materials.',
    price: 2200,
    category: 'shorts',
    gender: 'men' as const,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
      'https://images.unsplash.com/photo-1624378515194-6b8c57a2a1aa?w=800&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80'
    ],
    stock: 40,
  },
  {
    name: 'Essential Navy Shorts',
    description: 'Stylish navy shorts with clean design. Perfect for summer.',
    price: 2200,
    category: 'shorts',
    gender: 'men' as const,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
      'https://images.unsplash.com/photo-1624378515194-6b8c57a2a1aa?w=800&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80'
    ],
    stock: 35,
  },
  {
    name: 'Premium Khaki Shorts',
    description: 'Classic khaki shorts with minimal branding. Comfortable and versatile.',
    price: 2400,
    category: 'shorts',
    gender: 'men' as const,
    sizes: ['M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
      'https://images.unsplash.com/photo-1624378515194-6b8c57a2a1aa?w=800&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80'
    ],
    stock: 30,
  },
];

export async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Create categories
    console.log('📁 Creating categories...');
    for (const category of categories) {
      try {
        await createCategory(category);
        console.log(`   ✅ Created: ${category.name}`);
      } catch (error: any) {
        if (error.code === 'permission-denied') {
          console.error(`   ❌ Permission denied for ${category.name}`);
          console.error('\n💡 SOLUTION: Temporarily update Firestore rules to allow writes.');
          console.error('   See SEED_INSTRUCTIONS.md for step-by-step guide.');
          throw error;
        }
        throw error;
      }
    }

    // Create products
    console.log('\n📦 Creating products...');
    for (const product of products) {
      try {
        await createProduct(product);
        console.log(`   ✅ Created: ${product.name}`);
      } catch (error: any) {
        if (error.code === 'permission-denied') {
          console.error(`   ❌ Permission denied for ${product.name}`);
          console.error('\n💡 SOLUTION: Temporarily update Firestore rules to allow writes.');
          console.error('   See SEED_INSTRUCTIONS.md for step-by-step guide.');
          throw error;
        }
        throw error;
      }
    }

    console.log('\n✨ Database seed completed successfully!');
    console.log(`   📊 Created ${categories.length} categories and ${products.length} products`);
  } catch (error: any) {
    console.error('\n❌ Error seeding database:', error.message);
    if (error.code === 'permission-denied') {
      console.error('\n🔧 FIX: Update Firestore security rules temporarily:');
      console.error('   1. Go to Firebase Console → Firestore Database → Rules');
      console.error('   2. Change "allow write: if request.auth != null;" to "allow write: if true;"');
      console.error('   3. Click Publish');
      console.error('   4. Run: npm run seed');
      console.error('   5. Restore secure rules after seeding!');
      console.error('\n   See SEED_INSTRUCTIONS.md for detailed instructions.');
    }
    throw error;
  }
}

// Run seed if this file is executed directly
seedDatabase()
  .then(() => {
    console.log('Seed completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });

