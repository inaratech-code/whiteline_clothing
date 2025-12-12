import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './config';
import { Category } from '@/lib/types';

const CATEGORIES_COLLECTION = 'categories';

export async function getCategories(): Promise<Category[]> {
  try {
    const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    const categories: Category[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      categories.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Category);
    });

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Category;
    }
    return null;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
}

export async function createCategory(category: Omit<Category, 'id' | 'createdAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), {
      ...category,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

export async function updateCategory(id: string, category: Partial<Omit<Category, 'id' | 'createdAt'>>): Promise<void> {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await updateDoc(docRef, category);
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}

