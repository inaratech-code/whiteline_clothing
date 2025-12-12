# 🌱 How to Seed the Database

## Quick Fix: Temporarily Allow Writes

Since the seed script needs to write data but security rules require authentication, follow these steps:

### Step 1: Update Firestore Rules (Temporary)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Firestore Database** → **Rules** tab
4. **Copy and paste these TEMPORARY rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // TEMPORARY: Allow writes for seeding
    // ⚠️ RESTORE SECURE RULES AFTER SEEDING!
    
    // Products - allow writes temporarily
    match /products/{productId} {
      allow read: if true;
      allow write: if true; // TEMPORARY - change back to: if request.auth != null;
    }
    
    // Categories - allow writes temporarily
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if true; // TEMPORARY - change back to: if request.auth != null;
    }
    
    // Orders - keep secure
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        resource != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && 
        resource != null && resource.data.userId == request.auth.uid;
    }
    
    // Users - keep secure
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

5. Click **Publish**

### Step 2: Run the Seed Script

```bash
npm run seed
```

### Step 3: Restore Secure Rules (IMPORTANT!)

**⚠️ CRITICAL: Restore secure rules immediately after seeding!**

1. Go back to **Firestore Database** → **Rules**
2. Replace with the secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - public read, authenticated write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Orders - users can read/create/update their own
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        resource != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && 
        resource != null && resource.data.userId == request.auth.uid;
    }
    
    // Users - users can read/update their own
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
    }
    
    // Categories - public read, authenticated write
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

## ✅ Verify Seeding Worked

After seeding, check Firebase Console:
1. Go to **Firestore Database** → **Data** tab
2. You should see:
   - `categories` collection with 3 items (Shirts, Pants, Shorts)
   - `products` collection with 9 items

## 🔧 Alternative: Use Firebase Console

If the script still doesn't work, you can manually add data:

1. Go to **Firestore Database** → **Data** tab
2. Click **+ Add collection**
3. Collection ID: `categories`
4. Add documents:
   - Document ID: `auto` (or custom)
   - Fields:
     - `name` (string): `Shirts`
     - `slug` (string): `shirts`
     - `description` (string): `Premium mens shirts`
     - `createdAt` (timestamp): current time
5. Repeat for `Pants` and `Shorts`
6. Then add products in the `products` collection

