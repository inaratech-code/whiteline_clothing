# 🎯 Super Simple Manual Data Entry

Since rules aren't saving, let's add data manually. This is actually EASIER!

## ⚡ Quick Start - Just 2 Collections Needed

### Collection 1: `categories` (3 items)

#### Category 1: Shirts
1. Click **"+ Add collection"**
2. Collection ID: `categories`
3. Click **Next**
4. Document ID: Click **"Auto"** (or type `shirts`)
5. Add these 3 fields only:

   | Field | Type | Value |
   |-------|------|-------|
   | `name` | string | `Shirts` |
   | `slug` | string | `shirts` |
   | `description` | string | `Premium mens shirts` |

6. **Skip `createdAt` for now** (optional)
7. Click **Save**

#### Category 2: Pants
1. Click **"Add document"** (in categories collection)
2. Document ID: `pants` (or Auto)
3. Add fields:

   | Field | Type | Value |
   |-------|------|-------|
   | `name` | string | `Pants` |
   | `slug` | string | `pants` |
   | `description` | string | `Stylish mens pants` |

4. Click **Save**

#### Category 3: Shorts
1. Click **"Add document"**
2. Document ID: `shorts` (or Auto)
3. Add fields:

   | Field | Type | Value |
   |-------|------|-------|
   | `name` | string | `Shorts` |
   | `slug` | string | `shorts` |
   | `description` | string | `Comfortable mens shorts` |

4. Click **Save**

---

### Collection 2: `products` (Just add 3 products to test!)

#### Product 1: Classic White Shirt
1. Click **"+ Add collection"** (at top level)
2. Collection ID: `products`
3. Click **Next**
4. Document ID: Click **"Auto"**
5. Add these fields:

   | Field | Type | Value |
   |-------|------|-------|
   | `name` | string | `Classic White Shirt` |
   | `description` | string | `Premium cotton shirt` |
   | `price` | number | `2500` |
   | `category` | string | `shirts` |
   | `gender` | string | `men` |
   | `stock` | number | `50` |

6. **For `sizes` field:**
   - Type: Select **"array"**
   - Click **"Add item"** → Type `S`
   - Click **"Add item"** → Type `M`
   - Click **"Add item"** → Type `L`
   - Click **"Add item"** → Type `XL`

7. **For `images` field:**
   - Type: Select **"array"**
   - Click **"Add item"** → Paste: `https://images.unsplash.com/photo-1594938291221-94f5044435e1?w=800&q=80`
   - Click **"Add item"** → Paste: `https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&q=80`

8. Click **Save**

#### Product 2: Classic Black Pants
1. Click **"Add document"** (in products collection)
2. Document ID: Auto
3. Add fields:

   | Field | Type | Value |
   |-------|------|-------|
   | `name` | string | `Classic Black Pants` |
   | `description` | string | `Essential black pants` |
   | `price` | number | `4500` |
   | `category` | string | `pants` |
   | `gender` | string | `men` |
   | `stock` | number | `30` |
   | `sizes` | array | `S`, `M`, `L`, `XL` |
   | `images` | array | `https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80` |

4. Click **Save**

#### Product 3: Classic Black Shorts
1. Click **"Add document"**
2. Document ID: Auto
3. Add fields:

   | Field | Type | Value |
   |-------|------|-------|
   | `name` | string | `Classic Black Shorts` |
   | `description` | string | `Comfortable black shorts` |
   | `price` | number | `2200` |
   | `category` | string | `shorts` |
   | `gender` | string | `men` |
   | `stock` | number | `40` |
   | `sizes` | array | `S`, `M`, `L`, `XL` |
   | `images` | array | `https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80` |

4. Click **Save**

---

## ✅ Done! Test Your App

1. Go to your website: `http://localhost:3000`
2. Check if products appear on the shop page
3. If they do, you're all set!

## 💡 Tip

You only need these 3 products to test. You can add more later through:
- The admin panel (once you set it up)
- Or manually add more products the same way

**No rules needed for this to work!** The Firebase Console has admin access.

