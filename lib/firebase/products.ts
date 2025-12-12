import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from './config';
import { Product } from '@/lib/types';

const PRODUCTS_COLLECTION = 'products';

export async function getProducts(filters?: {
  category?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  limitCount?: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
}): Promise<{ products: Product[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null }> {
  try {
    let q = query(collection(db, PRODUCTS_COLLECTION));

    if (filters?.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters?.minPrice) {
      q = query(q, where('price', '>=', filters.minPrice));
    }
    if (filters?.maxPrice) {
      q = query(q, where('price', '<=', filters.maxPrice));
    }

    q = query(q, orderBy('createdAt', 'desc'));
    
    if (filters?.limitCount) {
      q = query(q, limit(filters.limitCount));
    }
    if (filters?.lastDoc) {
      q = query(q, startAfter(filters.lastDoc));
    }

    const snapshot = await getDocs(q);
    const products: Product[] = [];
    let lastDocument: QueryDocumentSnapshot<DocumentData> | null = null;

    snapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Product);
      lastDocument = doc;
    });

    return { products, lastDoc: lastDocument };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Product;
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function updateProduct(id: string, product: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<void> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...product,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
  try {
    const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products: Product[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const product = {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Product;

      // Simple search - check if search term matches name or description
      const searchLower = searchTerm.toLowerCase();
      if (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      ) {
        products.push(product);
      }
    });

    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}

