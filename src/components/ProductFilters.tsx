import { CATEGORIES } from '@/data/products';
import type { PriceSort } from '@/types/product';
interface Props {
  query: string; category: string; inStockOnly: boolean; sort: PriceSort;
  onQueryChange: (value: string) => void; onCategoryChange: (value: string) => void;
  onStockChange: (value: boolean) => void; onSortChange: (value: PriceSort) => void;
}
const control = 'mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-xs';
export default function ProductFilters(props: Props) {
  return <div className="grid gap-5 border-b border-slate-200 p-5 sm:p-6 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-end">
    <label className="text-xs font-semibold text-slate-600">Search products
      <input type="search" value={props.query} onChange={event => props.onQueryChange(event.target.value)} placeholder="Search by name…" aria-describedby="search-hint" className={control} />
      <span id="search-hint" className="mt-2 block text-xs font-normal text-slate-500">Search is case-sensitive.</span>
    </label>
    <label className="text-xs font-semibold text-slate-600 lg:pb-6">Category
      <select value={props.category} onChange={event => props.onCategoryChange(event.target.value)} className={control}>
        <option value="">All Categories</option>{CATEGORIES.map(category => <option key={category}>{category}</option>)}
      </select>
    </label>
    <label className="text-xs font-semibold text-slate-600 lg:pb-6">Sort by
      <select value={props.sort} onChange={event => props.onSortChange(event.target.value as PriceSort)} className={control}>
        <option value="default">Default order</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option>
      </select>
    </label>
    <label className="flex h-11 items-center gap-2 text-sm text-slate-700 lg:mb-6"><input type="checkbox" checked={props.inStockOnly} onChange={event => props.onStockChange(event.target.checked)} className="h-4 w-4 accent-teal-700" />In stock only</label>
  </div>;
}
