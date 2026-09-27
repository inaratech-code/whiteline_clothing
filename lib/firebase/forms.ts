import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

export async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await addDoc(collection(db, 'contactMessages'), {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    subject: data.subject.trim(),
    message: data.message.trim(),
    status: 'new',
    createdAt: serverTimestamp(),
  });
}

export async function subscribeNewsletter(email: string) {
  await addDoc(collection(db, 'newsletterSubscriptions'), {
    email: email.trim().toLowerCase(),
    status: 'active',
    createdAt: serverTimestamp(),
  });
}
