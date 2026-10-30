"use client";
import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { filterProducts } from "@/lib/filter-products";
import type { PriceSort } from "@/types/product";
import ProductFilters from "./ProductFilters";
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export default function ProductList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<PriceSort>("default");
  const products = filterProducts(PRODUCTS, {
    query,
    category,
    inStockOnly,
    sort,
  });
  const hasFilters =
    query !== "" || category !== "" || inStockOnly || sort !== "default";
  function reset() {
    setQuery("");
    setCategory("");
    setInStockOnly(false);
    setSort("default");
  }
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-5 sm:px-8">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-lg bg-teal-800 text-xl text-white"
          >
            ▦
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Workspace{" "}
            <span className="font-normal text-slate-400">/ Catalog</span>
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
          The essentials
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Product catalog
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
          A few good tools for a better workspace. Find what you need.
        </p>
        <section
          aria-label="Product catalog"
          className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs"
        >
          <ProductFilters
            query={query}
            category={category}
            inStockOnly={inStockOnly}
            sort={sort}
            onQueryChange={setQuery}
            onCategoryChange={setCategory}
            onStockChange={setInStockOnly}
            onSortChange={setSort}
          />
          <div className="flex min-h-16 items-center justify-between gap-4 px-5 sm:px-6">
            <p role="status" className="text-sm text-slate-500">
              <span className="font-semibold text-slate-800">
                {products.length}
              </span>{" "}
              of {PRODUCTS.length} products
            </p>
            {hasFilters && (
              <button
                onClick={reset}
                className="rounded px-1 py-2 text-sm font-medium text-teal-700 hover:text-teal-900"
              >
                Clear filters
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] text-left text-sm">
              <caption className="sr-only">
                Products with category, price, and stock availability
              </caption>
              <thead className="border-y border-slate-200 bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Product name
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Availability
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={
                      product.inStock
                        ? "hover:bg-slate-50"
                        : "bg-slate-50/60 text-slate-500"
                    }
                  >
                    <th scope="row" className="px-6 py-6 font-medium">
                      {product.name}
                    </th>
                    <td className="px-4 py-6 text-slate-500">
                      {product.category}
                    </td>
                    <td className="px-4 py-6 text-right tabular-nums">
                      {currency.format(product.price)}
                    </td>
                    <td className="px-6 py-6">
                      <span
                        className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${product.inStock ? "bg-teal-50 text-teal-800" : "bg-slate-100 text-slate-500"}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${product.inStock ? "bg-teal-600" : "bg-slate-400"}`}
                        />
                        {product.inStock ? "In stock" : "Out of stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="px-6 py-16 text-center">
              <h2 className="font-semibold">No products found</h2>
              <p className="mt-2 text-sm text-slate-500">
                Try another search or clear your filters to see all products.
              </p>
              <button
                onClick={reset}
                className="mt-5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
        <p className="mt-5 text-xs text-slate-400">All prices in USD.</p>
      </main>
    </div>
  );
}
