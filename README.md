# Whiteline - Premium Minimal Clothing Ecommerce

A modern, full-stack ecommerce website for Whiteline clothing brand built with Next.js 15, TypeScript, and Firebase.

## 🚀 Features

### User Features
- **Home Page**: Hero banner, featured products, new arrivals, category sections
- **Shop Page**: Product grid with filters (size, category, gender, price) and sorting
- **Product Detail**: Multiple images, size selection, add to cart, buy now
- **Shopping Cart**: Add/remove items, quantity updates, auto price calculation
- **Checkout**: Customer details, delivery info, order placement
- **User Account**: Login/signup, order history, profile management
- **Search**: Instant search functionality

### Admin Features
- **Dashboard**: Analytics, sales overview, best-selling products
- **Products Management**: Add, edit, delete products with image uploads
- **Categories Management**: Create and manage product categories
- **Orders Management**: View orders, update order status
- **Users Management**: View users, assign admin roles
- **Analytics**: Sales reports, order statistics

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Data Fetching**: SWR
- **Animations**: Framer Motion
- **SEO**: Next SEO

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd whitelineclothing
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Fill in your Firebase credentials in `.env.local`:
- Firebase configuration from your Firebase project

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔥 Firebase Setup

**📖 For detailed step-by-step instructions, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**

Quick setup:
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Set up Firebase Storage
5. Add your Firebase config to `.env.local`

Create `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - public read, admin write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Orders - users can read their own, admins can read all
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users - users can read/update their own, admins can read all
    match /users/{userId} {
      allow read: if request.auth != null && 
        (request.auth.uid == userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && 
        (request.auth.uid == userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Categories - public read, admin write
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 🌱 Seed Data

To populate the database with sample products and categories:

```bash
npm run seed
```

Or create a script in `package.json`:
```json
{
  "scripts": {
    "seed": "ts-node lib/seed.ts"
  }
}
```

## 📝 Project Structure

```
whitelineclothing/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   ├── account/           # User account pages
│   ├── shop/              # Shop page
│   ├── products/          # Product detail pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout page
│   └── orders/            # Order confirmation
├── components/            # React components
│   ├── layout/            # Header, Footer
│   ├── products/          # Product components
│   └── ui/               # Shadcn/UI components
├── contexts/              # React contexts
├── lib/                   # Utilities and helpers
│   ├── firebase/          # Firebase functions
│   ├── hooks/             # Custom hooks
│   └── types/             # TypeScript types
└── public/                # Static assets
```

## 🎨 Brand Style

- **Minimal**: Clean, simple design
- **Premium**: High-quality UI/UX
- **Color Scheme**: White + Black + Subtle Grey
- **High Contrast**: Bold typography and clear hierarchy
- **Typography**: Clean, modern fonts

## 🔐 Admin Access

To create an admin user:
1. Sign up as a regular user
2. In Firebase Console, go to Firestore
3. Find the user document in the `users` collection
4. Change the `role` field from `"user"` to `"admin"`

## 🚢 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Vercel:
```bash
vercel
```

Or deploy to your preferred hosting platform.

## 📄 License

This project is private and proprietary.

## 🤝 Support

For support, email support@whiteline.com
