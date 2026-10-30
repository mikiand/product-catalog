import type { Product } from '@/types/product';
export const PRODUCTS: readonly Product[] = [
  { id: 1, name: "Wireless Mouse", category: "Accessories", price: 19.99, inStock: true },
  { id: 2, name: "Mechanical Keyboard", category: "Accessories", price: 59.99, inStock: false },
  { id: 3, name: "4K Monitor", category: "Displays", price: 299.99, inStock: true },
  { id: 4, name: "USB C Hub", category: "Accessories", price: 29.99, inStock: true },
  { id: 5, name: "Laptop Stand", category: "Accessories", price: 39.99, inStock: false },
];
export const CATEGORIES = [...new Set(PRODUCTS.map(product => product.category))];
