# 🚀 Quick Seed Guide - Easiest Method

## Step 1: Find Your Project ID

1. Open your `.env.local` file in the project
2. Find this line: `NEXT_PUBLIC_FIREBASE_PROJECT_ID=...`
3. Copy the value after the `=` sign
   - Example: If it says `NEXT_PUBLIC_FIREBASE_PROJECT_ID=whiteline-clothing-2ac47`
   - Your project ID is: `whiteline-clothing-2ac47`

## Step 2: Access Rules Tab (Direct URL)

1. Replace `YOUR_PROJECT_ID` in this URL with your actual project ID:
   ```
   https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/rules
   ```

2. **Example:** If your project ID is `whiteline-clothing-2ac47`, use:
   ```
   https://console.firebase.google.com/project/whiteline-clothing-2ac47/firestore/rules
   ```

3. Paste the URL in your browser and press Enter
4. You should now see the Rules editor!

## Step 3: Temporarily Allow Writes (For Seeding Only)

1. In the Rules editor, find these lines:
   ```javascript
   allow write: if request.auth != null;
   ```
   
2. Change them to (for both `products` and `categories`):
   ```javascript
   allow write: if true; // TEMPORARY - for seeding only
   ```

3. Your rules should look like this:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /products/{productId} {
         allow read: if true;
         allow write: if true; // TEMPORARY
       }
       
       match /categories/{categoryId} {
         allow read: if true;
         allow write: if true; // TEMPORARY
       }
       
       // Keep orders and users secure
       match /orders/{orderId} {
         allow read: if request.auth != null && 
           resource != null && resource.data.userId == request.auth.uid;
         allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
         allow update: if request.auth != null && 
           resource != null && resource.data.userId == request.auth.uid;
       }
       
       match /users/{userId} {
         allow read: if request.auth != null && request.auth.uid == userId;
         allow create: if request.auth != null && request.auth.uid == userId;
         allow update: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

4. Click **"Publish"** button

## Step 4: Run Seed Script

Open your terminal and run:
```bash
npm run seed
```

This will automatically create:
- ✅ 3 categories (Shirts, Pants, Shorts)
- ✅ 9 products

## Step 5: Restore Secure Rules (IMPORTANT!)

**⚠️ CRITICAL: Restore secure rules immediately after seeding!**

1. Go back to the Rules tab (same URL)
2. Change back to secure rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /products/{productId} {
         allow read: if true;
         allow write: if request.auth != null; // RESTORED
       }
       
       match /categories/{categoryId} {
         allow read: if true;
         allow write: if request.auth != null; // RESTORED
       }
       
       match /orders/{orderId} {
         allow read: if request.auth != null && 
           resource != null && resource.data.userId == request.auth.uid;
         allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
         allow update: if request.auth != null && 
           resource != null && resource.data.userId == request.auth.uid;
       }
       
       match /users/{userId} {
         allow read: if request.auth != null && request.auth.uid == userId;
         allow create: if request.auth != null && request.auth.uid == userId;
         allow update: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

3. Click **"Publish"**

## ✅ Done!

Your database is now seeded with all products and categories!

