# 🔥 Firebase Setup Guide for Whiteline

Complete step-by-step guide to set up Firebase for the Whiteline e-commerce website.

## 📋 Prerequisites

- A Google account
- Node.js and npm installed
- The Whiteline project cloned and dependencies installed

## 🚀 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `whiteline-clothing` (or your preferred name)
4. Click **Continue**
5. **Disable** Google Analytics (optional, you can enable later if needed)
6. Click **Create project**
7. Wait for project creation, then click **Continue**

## 🔐 Step 2: Enable Authentication

1. In Firebase Console, click **Authentication** in the left sidebar
2. Click **Get started**
3. Click on **Sign-in method** tab
4. Click on **Email/Password**
5. **Enable** the first toggle (Email/Password)
6. Click **Save**

## 💾 Step 3: Create Firestore Database

**⚠️ CRITICAL: You MUST create the database FIRST before you can add security rules!**

1. In Firebase Console, click **Firestore Database** in the left sidebar
2. Click **Create database** (or **Add database** if you see that button)
3. Select **Start in production mode** (we'll add security rules next)
4. Choose a **location** closest to your users (e.g., `us-central1`, `asia-south1`)
5. Click **Enable**
6. **Wait for database creation to complete** (this may take 1-2 minutes)
   - You'll see a message like "Your database is ready to go. Just add data."
   - The database must be fully created before you can save rules!

### Add Firestore Security Rules

**⚠️ IMPORTANT:** 
- **You CANNOT save rules until the database is created!**
- The Rules tab only appears AFTER you've created the database
- If you get "Error saving rules", make sure the database creation is 100% complete

1. Once your database is created, you'll see tabs at the top: **Data**, **Indexes**, **Rules**, **Usage**, etc.
2. **If you see the Rules tab:** Click on it directly
3. **If you DON'T see the Rules tab** (only seeing Data, Indexes, Disaster Recovery, Usage):
   - **Method 1:** Look for a **"More"** dropdown or **"..."** menu button near the tabs - Rules might be there
   - **Method 2:** Click on the **breadcrumb "Database"** link at the top (next to "Cloud Firestore >")
   - **Method 3:** Try the direct URL: `https://console.firebase.google.com/project/whiteline-clothing-2ac47/firestore/rules` (replace YOUR_PROJECT_ID)
   - **Method 4:** Navigate to: Firebase Console → Project Settings → Service Accounts → Look for Firestore Rules link
   - **Method 5:** Refresh the page (F5 or Ctrl+R) and wait a moment
   - **Method 6:** Make sure you're viewing the correct database (if you have multiple)
4. Once you're in the Rules editor, replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - public read, authenticated write
    // Note: Admin checks can be added in app logic or via custom claims
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

## 📦 Step 4: Set Up Firebase Storage

1. In Firebase Console, click **Storage** in the left sidebar
2. Click **Get started**
3. Click **Next** (use default security rules for now)
4. Choose a **location** (same as Firestore or closest to users)
5. Click **Done**
6. Wait for Storage setup to complete

### Add Storage Security Rules

**Important:** The Rules tab only appears AFTER Storage is set up.

1. Once Storage is set up, you'll see tabs at the top: **Files**, **Rules**, **Usage**
2. Click on the **Rules** tab
3. If you don't see the Rules tab:
   - Make sure Storage setup is complete
   - Refresh the page
   - Try navigating away and back to Storage
4. In the Rules editor, replace the default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Helper function to check if user is admin
    function isAdmin() {
      let userDoc = firestore.get(/databases/(default)/documents/users/$(request.auth.uid));
      return request.auth != null && 
        userDoc != null &&
        userDoc.data.role == 'admin';
    }
    
    // Product images - public read, admin write
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // User uploads - users can manage their own files
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **Publish**

## 🔑 Step 5: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to **Project Overview**
2. Click **Project settings**
3. Scroll down to **Your apps** section
4. Click the **Web icon** `</>` (or click **Add app** if no web app exists)
5. Register app:
   - App nickname: `Whiteline Web` (optional)
   - **Do NOT** check "Also set up Firebase Hosting"
   - Click **Register app**
6. Copy the `firebaseConfig` object values

You'll see something like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## 📝 Step 6: Create Environment File

1. In your project root, create a file named `.env.local`
2. Add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

**Important:**
- Replace all values with your actual Firebase config values
- Never commit `.env.local` to git (it's already in `.gitignore`)
- The `NEXT_PUBLIC_` prefix is required for Next.js to expose these to the browser

## 🌱 Step 7: Seed the Database

1. Make sure your `.env.local` file is set up correctly
2. Run the seed script to populate initial data:

```bash
npm run seed
```

This will create:
- 3 categories (Shirts, Pants, Shorts)
- 9 sample products (3 of each category)

## 👤 Step 8: Create Test Users

1. Run the test user creation script:

```bash
npm run create-test-users
```

This creates:
- **Regular User**: `user@whiteline.com` / `testuser123`
- **Admin User**: `admin@whiteline.com` / `admin123`

**Note:** If you get an error, you may need to manually create users:
1. Go to Firebase Console → Authentication
2. Click **Add user**
3. Enter email and password
4. For admin: Go to Firestore → `users` collection → Edit user document → Change `role` to `"admin"`

## ✅ Step 9: Verify Setup

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000)

3. Test the following:
   - ✅ Home page loads
   - ✅ Products display (if seeded)
   - ✅ Can sign up a new user
   - ✅ Can log in with test credentials
   - ✅ Can view products
   - ✅ Can add items to cart

4. Test Admin Panel:
   - ✅ Log in with `admin@whiteline.com` / `admin123`
   - ✅ Access `/admin` dashboard
   - ✅ Can view/manage products

## 🔧 Troubleshooting

### Error: "Firebase: Error (auth/configuration-not-found)"
- **Solution**: Check that all environment variables in `.env.local` are correct
- Make sure variable names start with `NEXT_PUBLIC_`
- Restart the dev server after changing `.env.local`

### Error: "Firestore permission denied"
- **Solution**: Check Firestore security rules are published
- Verify the rules match the ones provided above
- Make sure you're logged in for protected operations

### Error: "Error saving rules - An unknown error occurred"
- **Solution**: Try these steps in order:
  
  1. **MOST COMMON: Database not created yet!**
     - Go to Firestore Database → Click "Create database" or "Add database"
     - Wait for database creation to complete (1-2 minutes)
     - Only AFTER the database is fully created, try saving rules again
  
  2. **Test with minimal rules first:**
     Try saving this absolute minimal rule to test if it's a syntax issue:
     ```javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /{document=**} {
           allow read, write: if false;
         }
       }
     }
     ```
     If this minimal rule saves, then gradually add your rules back.
  
  3. **Browser/Console issues:**
     - Open browser Developer Tools (F12) → Console tab
     - Look for any JavaScript errors
     - Try a different browser (Chrome, Firefox, Edge)
     - Try incognito/private mode
     - Clear browser cache and cookies for Firebase Console
  
  4. **Network/Permissions:**
     - Check your internet connection
     - Make sure you have proper permissions (Project Owner or Editor role)
     - Try logging out and back into Firebase Console
  
  5. **Alternative: Use Firebase CLI (Recommended if Console fails):**
     
     **Step 1:** Install Firebase CLI (if not already installed):
     ```bash
     npm install -g firebase-tools
     ```
     
     **Step 2:** Login to Firebase:
     ```bash
     firebase login
     ```
     (This will open a browser window for authentication)
     
     **Step 3:** Initialize Firestore in your project:
     ```bash
     firebase init firestore
     ```
     - Select your Firebase project: `whiteline-clothing-2ac47`
     - Use default `firestore.rules` file: **Yes**
     - Use default `firestore.indexes.json` file: **Yes**
     
     **Step 4:** Edit the `firestore.rules` file that was created with your rules
     
     **Step 5:** Deploy the rules:
     ```bash
     firebase deploy --only firestore:rules
     ```
     
     This method is often more reliable than the web console!

### Can't see Rules tab in Firestore
- **Solution**: 
  - **First, make sure you've created the database**: Click "Create database" or "Add database" button
  - The Rules tab only appears AFTER the database is fully created
  - After creating, you should see tabs: **Data**, **Indexes**, **Rules**, **Usage**
  - **If you only see Data, Indexes, Disaster Recovery, Usage (no Rules tab):**
    1. **Try the direct URL method:**
       - Go to: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/rules`
       - Replace `YOUR_PROJECT_ID` with your actual project ID (e.g., `whiteline-clothing`)
    2. **Check for a "More" menu:** Look for a dropdown or "..." button near the tabs
    3. **Click the breadcrumb:** Click on "Database" in the breadcrumb navigation at the top
    4. **Wait and refresh:** Sometimes it takes a few minutes after database creation
    5. **Check Project Settings:** Go to Project Settings → Service Accounts → Look for Firestore Rules
    6. **Try a different browser or incognito mode**
    7. **Make sure you have proper permissions** - you need to be a project owner or editor

### Error: "Storage permission denied"
- **Solution**: Check Storage security rules are published
- Verify admin user has `role: "admin"` in Firestore

### Products not showing
- **Solution**: Run `npm run seed` to populate the database
- Check Firestore console to see if products exist
- Verify Firestore rules allow public read

### Can't access admin panel
- **Solution**: Ensure user has `role: "admin"` in Firestore `users` collection
- Check the user document ID matches the Firebase Auth UID
- Try logging out and back in

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Storage Rules](https://firebase.google.com/docs/storage/security)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## 🎯 Next Steps

After setup is complete:
1. ✅ Customize products and categories
2. ✅ Add your own product images
3. ✅ Configure email templates (if using Firebase Extensions)
4. ✅ Set up custom domain (optional)
5. ✅ Configure production environment variables for deployment

## 🚨 Security Checklist

Before going to production:
- [ ] Review and test all Firestore security rules
- [ ] Review and test all Storage security rules
- [ ] Change default admin password
- [ ] Set up proper error monitoring
- [ ] Configure Firebase App Check (recommended)
- [ ] Set up backup strategy for Firestore
- [ ] Review Firebase usage quotas and billing

---

**Need Help?** Check the main [README.md](./README.md) or create an issue in the repository.

