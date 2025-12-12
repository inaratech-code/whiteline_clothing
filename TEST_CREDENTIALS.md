# Test Login Credentials

## 🚀 Quick Setup

Run this command to create test users automatically:

```bash
npm run create-test-users
```

Or manually:

```bash
npx ts-node lib/scripts/create-test-users.ts
```

## 📋 Test Accounts

### 👤 Regular User Account
- **Email:** `user@whiteline.com`
- **Password:** `testuser123`
- **Role:** `user`
- **Access:** Can shop, view orders, manage profile

### 👑 Admin User Account
- **Email:** `admin@whiteline.com`
- **Password:** `admin123`
- **Role:** `admin`
- **Access:** Full admin panel access + all user features

## 🔐 Manual Setup (Alternative)

If the script doesn't work, you can create users manually:

### Step 1: Create Users via Sign Up Page
1. Go to `http://localhost:3000/auth/signup`
2. Create accounts with the emails above
3. Use the passwords above

### Step 2: Set Admin Role (Firebase Console)
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Firestore Database**
4. Open the `users` collection
5. Find the user document for `admin@whiteline.com`
6. Edit the document and change `role` field to `"admin"`
7. Save

## 🧪 Testing Different Scenarios

### Test Regular User Flow
1. Login with `user@whiteline.com` / `testuser123`
2. Browse products
3. Add items to cart
4. Checkout
5. View order history
6. Edit profile

### Test Admin User Flow
1. Login with `admin@whiteline.com` / `admin123`
2. Access admin panel at `/admin`
3. Manage products
4. View orders
5. Manage users
6. View analytics

## ⚠️ Important Notes

- These are **test credentials only** - do not use in production
- Change passwords before deploying to production
- The script will skip accounts that already exist
- Make sure Firebase Authentication is enabled with Email/Password provider

## 🔧 Troubleshooting

### "Email already in use"
- The account already exists - you can login directly
- Or delete the user from Firebase Console and run the script again

### "Firebase not initialized"
- Make sure your `.env.local` file has correct Firebase credentials
- Check that Firebase Authentication is enabled

### "Permission denied"
- Check Firestore security rules
- Make sure the user creating accounts has proper permissions

