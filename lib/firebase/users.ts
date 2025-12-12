import { collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where } from 'firebase/firestore';
import { db } from './config';
import { User } from '@/lib/types';

const USERS_COLLECTION = 'users';

export async function getUserById(id: string): Promise<User | null> {
  try {
    const docRef = doc(db, USERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as User;
    }
    return null;
  } catch (error: any) {
    // Provide more helpful error messages
    if (error.code === 'unavailable' || error.message?.includes('offline')) {
      console.warn('⚠️ Firestore connection unavailable. App will work in limited mode.');
      console.warn('Error details:', {
        code: error.code,
        message: error.message
      });
      console.warn('');
      console.warn('Troubleshooting:');
      console.warn('1. Verify Firestore database exists in Firebase Console');
      console.warn('2. Check Firestore security rules allow read access');
      console.warn('3. Verify Cloud Firestore API is enabled in Google Cloud Console');
      console.warn('4. Check network connection');
      console.warn('');
      console.warn('Returning null - user data unavailable but app will continue.');
      // Return null instead of throwing - allows app to work without Firestore
      return null;
    }
    console.error('Error fetching user:', error);
    // For other errors, still return null to prevent app crash
    return null;
  }
}

export async function createUser(user: Omit<User, 'id' | 'createdAt'> & { id: string }): Promise<void> {
  try {
    const docRef = doc(db, USERS_COLLECTION, user.id);
    await setDoc(docRef, {
      ...user,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function updateUser(id: string, user: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<void> {
  try {
    const docRef = doc(db, USERS_COLLECTION, id);
    await updateDoc(docRef, user);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const snapshot = await getDocs(collection(db, USERS_COLLECTION));
    const users: User[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as User);
    });

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function updateUserRole(userId: string, role: 'user' | 'admin'): Promise<void> {
  try {
    await updateUser(userId, { role });
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
}

