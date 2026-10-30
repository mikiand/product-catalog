export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}
export type PriceSort = 'default' | 'price-asc' | 'price-desc';
