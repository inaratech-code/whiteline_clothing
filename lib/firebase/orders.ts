import { collection, doc, getDoc, getDocs, addDoc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from './config';
import { Order } from '@/lib/types';

const ORDERS_COLLECTION = 'orders';

export async function getOrders(userId?: string): Promise<Order[]> {
  try {
    let q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));

    if (userId) {
      q = query(q, where('userId', '==', userId));
    }

    const snapshot = await getDocs(q);
    const orders: Order[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Order);
    });

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Order;
    }
    return null;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...order,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<void> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

