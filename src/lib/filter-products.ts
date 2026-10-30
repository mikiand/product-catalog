import type { PriceSort, Product } from "@/types/product";
interface Filters {
  query: string;
  category: string;
  inStockOnly: boolean;
  sort: PriceSort;
}
export function filterProducts(
  products: readonly Product[],
  { query, category, inStockOnly, sort }: Filters,
): Product[] {
  // includes is intentionally case-sensitive, as required by the exercise.
  const result = products.filter(
    (product) =>
      product.name.includes(query) &&
      (!category || product.category === category) &&
      (!inStockOnly || product.inStock),
  );
  // filter creates a new array, so sorting it leaves the source untouched.
  if (sort !== "default")
    result.sort((a, b) =>
      sort === "price-asc" ? a.price - b.price : b.price - a.price,
    );
  return result;
}
