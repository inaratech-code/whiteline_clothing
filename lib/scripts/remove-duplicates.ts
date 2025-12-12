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
  process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log('📋 Project ID:', projectId);
console.log('');

// Import Firebase functions
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

interface DuplicateGroup {
  key: string;
  documents: Array<{
    id: string;
    name: string;
    createdAt: Date;
  }>;
}

async function findDuplicates(collectionName: string, keyField: string = 'name'): Promise<DuplicateGroup[]> {
  console.log(`\n🔍 Scanning ${collectionName} collection for duplicates by ${keyField}...`);
  
  const snapshot = await getDocs(query(collection(db, collectionName), orderBy('createdAt', 'asc')));
  const documents: Map<string, Array<{ id: string; name: string; createdAt: Date }>> = new Map();

  snapshot.forEach((docSnapshot) => {
    const data = docSnapshot.data();
    const key = data[keyField]?.toLowerCase().trim() || '';
    const createdAt = data.createdAt?.toDate() || new Date(0);

    if (!key) return; // Skip documents without the key field

    if (!documents.has(key)) {
      documents.set(key, []);
    }

    documents.get(key)!.push({
      id: docSnapshot.id,
      name: data[keyField] || data.name || 'Unknown',
      createdAt,
    });
  });

  // Find groups with duplicates (more than 1 document)
  const duplicates: DuplicateGroup[] = [];
  documents.forEach((docs, key) => {
    if (docs.length > 1) {
      duplicates.push({
        key,
        documents: docs,
      });
    }
  });

  return duplicates;
}

async function removeDuplicates(
  collectionName: string,
  keyField: string = 'name',
  dryRun: boolean = true
): Promise<void> {
  const duplicates = await findDuplicates(collectionName, keyField);

  if (duplicates.length === 0) {
    console.log(`✅ No duplicates found in ${collectionName} collection!`);
    return;
  }

  console.log(`\n📊 Found ${duplicates.length} duplicate group(s) in ${collectionName}:`);
  console.log('─'.repeat(80));

  let totalDuplicates = 0;
  const toDelete: string[] = [];

  duplicates.forEach((group, index) => {
    console.log(`\n${index + 1}. "${group.key}" (${group.documents.length} copies):`);
    
    // Sort by createdAt (oldest first)
    const sorted = [...group.documents].sort((a, b) => 
      a.createdAt.getTime() - b.createdAt.getTime()
    );

    // Keep the oldest one, delete the rest
    const keep = sorted[0];
    const deleteList = sorted.slice(1);

    console.log(`   ✅ KEEP: ${keep.name} (ID: ${keep.id}, Created: ${keep.createdAt.toISOString()})`);
    
    deleteList.forEach((doc) => {
      console.log(`   ❌ DELETE: ${doc.name} (ID: ${doc.id}, Created: ${doc.createdAt.toISOString()})`);
      toDelete.push(doc.id);
      totalDuplicates++;
    });
  });

  console.log('\n' + '─'.repeat(80));
  console.log(`\n📈 Summary:`);
  console.log(`   • Duplicate groups: ${duplicates.length}`);
  console.log(`   • Documents to delete: ${totalDuplicates}`);
  console.log(`   • Documents to keep: ${duplicates.length}`);

  if (dryRun) {
    console.log('\n⚠️  DRY RUN MODE - No documents were deleted');
    console.log('💡 To actually delete duplicates, run with --delete flag');
    return;
  }

  // Actually delete duplicates
  console.log('\n🗑️  Deleting duplicates...');
  let deleted = 0;
  let errors = 0;

  for (const docId of toDelete) {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      deleted++;
      process.stdout.write(`\r   Deleted ${deleted}/${toDelete.length} documents...`);
    } catch (error) {
      console.error(`\n   ❌ Error deleting ${docId}:`, error);
      errors++;
    }
  }

  console.log(`\n\n✅ Deletion complete!`);
  console.log(`   • Successfully deleted: ${deleted}`);
  if (errors > 0) {
    console.log(`   • Errors: ${errors}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--delete');
  const collectionArg = args.find(arg => arg.startsWith('--collection='));
  const collectionName = collectionArg ? collectionArg.split('=')[1] : null;

  console.log('🧹 Firebase Duplicate Remover');
  console.log('═'.repeat(80));
  
  if (dryRun) {
    console.log('⚠️  Running in DRY RUN mode (no changes will be made)');
  } else {
    console.log('⚠️  DELETION MODE - Duplicates will be permanently deleted!');
  }
  console.log('═'.repeat(80));

  try {
    if (collectionName) {
      // Remove duplicates from specific collection
      await removeDuplicates(collectionName, 'name', dryRun);
    } else {
      // Remove duplicates from all collections
      console.log('\n📦 Checking products collection...');
      await removeDuplicates('products', 'name', dryRun);
      
      console.log('\n📁 Checking categories collection...');
      await removeDuplicates('categories', 'slug', dryRun);
    }

    console.log('\n✨ Done!');
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

main();

