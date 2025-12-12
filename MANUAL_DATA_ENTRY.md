# 📝 Manual Data Entry Guide

Since you can't find the Rules tab, you can add data directly through the Firebase Console. This bypasses security rules!

## Step 1: Add Categories Collection

1. In Firebase Console → Firestore Database → **Data** tab
2. Click **"+ Add collection"**
3. Collection ID: `categories`
4. Click **Next**

### Add First Category: Shirts

1. Document ID: Click **"Auto"** (or type `shirts`)
2. Add these fields (click **"Add field"** for each):

   | Field name | Type | Value |
   |------------|------|-------|
   | `name` | string | `Shirts` |
   | `slug` | string | `shirts` |
   | `description` | string | `Premium mens shirts` |
   | `createdAt` | timestamp | Click "Set to current time" |

3. Click **Save**

### Add Second Category: Pants

1. Click **"Add document"** (in the categories collection)
2. Document ID: `pants` (or Auto)
3. Add fields:

   | Field name | Type | Value |
   |------------|------|-------|
   | `name` | string | `Pants` |
   | `slug` | string | `pants` |
   | `description` | string | `Stylish mens pants and trousers` |
   | `createdAt` | timestamp | Current time |

4. Click **Save**

### Add Third Category: Shorts

1. Click **"Add document"**
2. Document ID: `shorts` (or Auto)
3. Add fields:

   | Field name | Type | Value |
   |------------|------|-------|
   | `name` | string | `Shorts` |
   | `slug` | string | `shorts` |
   | `description` | string | `Comfortable mens shorts` |
   | `createdAt` | timestamp | Current time |

4. Click **Save**

## Step 2: Add Products Collection

1. Click **"+ Add collection"** (at the top level)
2. Collection ID: `products`
3. Click **Next**

### Add Products (Repeat for each product)

For each product, click **"Add document"** and add these fields:

#### Product 1: Classic White Shirt

| Field name | Type | Value |
|------------|------|-------|
| `name` | string | `Classic White Shirt` |
| `description` | string | `Premium cotton shirt with minimal design. Perfect for everyday wear.` |
| `price` | number | `2500` |
| `category` | string | `shirts` |
| `gender` | string | `men` |
| `sizes` | array | Click "Add item" → `S`, `M`, `L`, `XL` |
| `stock` | number | `50` |
| `images` | array | Click "Add item" → Add these URLs one by one:<br>`https://images.unsplash.com/photo-1594938291221-94f5044435e1?w=800&q=80`<br>`https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&q=80`<br>`https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80` |
| `createdAt` | timestamp | Current time |
| `updatedAt` | timestamp | Current time |

#### Product 2: Essential Blue Shirt

| Field name | Type | Value |
|------------|------|-------|
| `name` | string | `Essential Blue Shirt` |
| `description` | string | `Classic blue shirt with clean lines. Made from premium materials.` |
| `price` | number | `2500` |
| `category` | string | `shirts` |
| `gender` | string | `men` |
| `sizes` | array | `S`, `M`, `L`, `XL`, `XXL` |
| `stock` | number | `40` |
| `images` | array | Same URLs as above |
| `createdAt` | timestamp | Current time |
| `updatedAt` | timestamp | Current time |

#### Product 3: Minimal Black Shirt

| Field name | Type | Value |
|------------|------|-------|
| `name` | string | `Minimal Black Shirt` |
| `description` | string | `Sleek black shirt perfect for any occasion. Premium fit and comfort.` |
| `price` | number | `2800` |
| `category` | string | `shirts` |
| `gender` | string | `men` |
| `sizes` | array | `S`, `M`, `L`, `XL` |
| `stock` | number | `35` |
| `images` | array | Same URLs as above |
| `createdAt` | timestamp | Current time |
| `updatedAt` | timestamp | Current time |

#### Product 4: Classic Black Pants

| Field name | Type | Value |
|------------|------|-------|
| `name` | string | `Classic Black Pants` |
| `description` | string | `Essential black pants with premium materials. Perfect for all occasions.` |
| `price` | number | `4500` |
| `category` | string | `pants` |
| `gender` | string | `men` |
| `sizes` | array | `S`, `M`, `L`, `XL`, `XXL` |
| `stock` | number | `30` |
| `images` | array | `https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80`<br>`https://images.unsplash.com/photo-1624378515194-6b8c57a2a1aa?w=800&q=80`<br>`https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80` |
| `createdAt` | timestamp | Current time |
| `updatedAt` | timestamp | Current time |

#### Product 5: Essential Navy Pants

| Field name | Type | Value |
|------------|------|-------|
| `name` | string | `Essential Navy Pants` |
| `description` | string | `Stylish navy pants with clean lines. Comfortable and versatile.` |
| `price` | number | `4500` |
| `category` | string | `pants` |
| `gender` | string | `men` |
| `sizes` | array | `S`, `M`, `L`, `XL` |
| `stock` | number | `25` |
| `images` | array | Same as Classic Black Pants |
| `createdAt` | timestamp | Current time |
| `updatedAt` | timestamp | Current time |

#### Product 6: Premium Grey Pants

| Field name | Type | Value |
|------------|------|-------|
| `name` | string | `Premium Grey Pants` |
| `description` | string | `Modern grey pants with minimal design. Premium fit and quality.` |
| `price` | number | `4800` |
| `category` | string | `pants` |
| `gender` | string | `men` |
| `sizes` | array | `M`, `L`, `XL`, `XXL` |
| `stock` | number | `20` |
| `images` | array | Same as Classic Black Pants |
| `createdAt` | timestamp | Current time |
| `updatedAt` | timestamp | Current time |

#### Product 7: Classic Black Shorts

| Field name | Type | Value |
|------------|------|-------|
| `name` | string | `Classic Black Shorts` |
| `description` | string | `Comfortable black shorts perfect for casual wear. Premium materials.` |
| `price` | number | `2200` |
| `category` | string | `shorts` |
| `gender` | string | `men` |
| `sizes` | array | `S`, `M`, `L`, `XL` |
| `stock` | number | `40` |
| `images` | array | `https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80`<br>`https://images.unsplash.com/photo-1624378515194-6b8c57a2a1aa?w=800&q=80`<br>`https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80` |
| `createdAt` | timestamp | Current time |
| `updatedAt` | timestamp | Current time |

#### Product 8: Essential Navy Shorts

| Field name | Type | Value |
|------------|------|-------|
| `name` | string | `Essential Navy Shorts` |
| `description` | string | `Stylish navy shorts with clean design. Perfect for summer.` |
| `price` | number | `2200` |
| `category` | string | `shorts` |
| `gender` | string | `men` |
| `sizes` | array | `S`, `M`, `L`, `XL`, `XXL` |
| `stock` | number | `35` |
| `images` | array | Same as Classic Black Shorts |
| `createdAt` | timestamp | Current time |
| `updatedAt` | timestamp | Current time |

#### Product 9: Premium Khaki Shorts

| Field name | Type | Value |
|------------|------|-------|
| `name` | string | `Premium Khaki Shorts` |
| `description` | string | `Classic khaki shorts with minimal branding. Comfortable and versatile.` |
| `price` | number | `2400` |
| `category` | string | `shorts` |
| `gender` | string | `men` |
| `sizes` | array | `M`, `L`, `XL` |
| `stock` | number | `30` |
| `images` | array | Same as Classic Black Shorts |
| `createdAt` | timestamp | Current time |
| `updatedAt` | timestamp | Current time |

## ✅ Verification

After adding all data:
1. You should have:
   - `categories` collection with 3 documents
   - `products` collection with 9 documents
2. Go to your website and check if products appear!

## 💡 Tip

This method works because Firebase Console has admin privileges and bypasses security rules. Once data is added, your app will be able to read it (since read rules allow public access).

