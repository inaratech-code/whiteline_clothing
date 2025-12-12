export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  images: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  gender?: 'men' | 'women' | 'unisex';
}

export interface CartItem {
  productId: string;
  product: Product;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    product: Product;
    size: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  address?: string;
  phone?: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

