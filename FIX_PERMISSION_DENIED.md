# 🔧 Fix PERMISSION_DENIED Error

## The Problem

The error shows `your-project-id` which means your `.env.local` file might have placeholder values instead of your actual Firebase project ID.

## Quick Fix Steps

### Step 1: Check Your Project ID

1. Open your `.env.local` file
2. Find this line: `NEXT_PUBLIC_FIREBASE_PROJECT_ID=...`
3. Check if it says `your-project-id` or has an actual project ID

### Step 2: Get Your Real Project ID

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click on your project
3. Click the **gear icon** ⚙️ next to "Project Overview"
4. Click **Project settings**
5. Look for **Project ID** (it's shown at the top)
6. Copy the Project ID

### Step 3: Update .env.local

1. Open `.env.local` file
2. Make sure ALL these values are filled with REAL values (not placeholders):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy... (your real API key)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-real-project-id (NOT "your-project-id")
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789 (your real number)
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc... (your real app ID)
```

3. Replace `your-real-project-id` with the actual Project ID you copied
4. Make sure there are NO placeholder values like:
   - `your-project-id`
   - `your-api-key`
   - `your-project.firebaseapp.com`
   - etc.

### Step 4: Restart Everything

1. **Close your terminal** (if seed script is running)
2. **Restart your dev server** (if running):
   ```bash
   # Stop it (Ctrl+C) and restart
   npm run dev
   ```
3. **Wait 2-3 minutes** (if API was just enabled)
4. **Try seed again**:
   ```bash
   npm run seed
   ```

## Alternative: Verify API is Enabled

1. Go to: https://console.developers.google.com/apis/library/firestore.googleapis.com
2. Select your Firebase project from the dropdown
3. Make sure **Cloud Firestore API** shows "Enabled" with a green checkmark
4. If not enabled, click **Enable** and wait 2-3 minutes

## Still Not Working?

If you still get the error after:
- ✅ Updating .env.local with real values
- ✅ Waiting 3-5 minutes
- ✅ Verifying API is enabled

Then try:
1. **Double-check project ID** matches exactly (case-sensitive)
2. **Check browser console** at http://localhost:3000/test-firebase (if you have that page)
3. **Verify all environment variables** are correct

## Quick Test

Run this to check your config:
```bash
node -e "require('dotenv').config({path:'.env.local'}); console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);"
```

If it shows `your-project-id` or `undefined`, your `.env.local` needs to be fixed!

