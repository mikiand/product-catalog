# Product catalog

A small, responsive product listing exercise with immediate search, category and stock filtering, price sorting, product counts, and an empty state. Uses the five supplied products; no API, backend, or external data.

## Stack

Next.js App Router, React, strict TypeScript, Tailwind CSS, ESLint, Vitest, and React Testing Library. Use Node.js 22 or newer and npm.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` followed by `npm start`.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run test:watch` runs Vitest in watch mode. Tests cover initial rendering, case-sensitive search, category and stock filters, combined filters, both sort directions, default order, empty results, and resetting controls.

## Structure

```text
src/
  app/                    # Server page, root layout, global styles
  components/
    ProductList.tsx        # Client state, count, semantic table, empty state
    ProductFilters.tsx     # Controlled and labeled filter inputs
    ProductList.test.tsx   # User-visible interaction tests
  data/products.ts        # Exact dataset and derived categories
  lib/filter-products.ts  # Pure filtering and sorting function
  types/product.ts        # Product and sorting types
```

## Decisions

- Only the interactive catalog is a client boundary; the page and root layout remain server components. ProductFilters is part of that client component tree.
- Four `useState` values hold the user choices. Filtered products are derived on each render rather than stored in additional state, avoiding synchronization bugs and redundant state. Five products do not warrant `useMemo` or an effect.
- Name filtering is deliberately **case-sensitive**, because the exercise requires it. It uses `includes()` directly without normalization.
- Categories come from the dataset. Filtering creates a new array before sorting, preserving the source array and default ordering.
- A semantic table uses row and column headers. On narrow screens it scrolls horizontally; controls stack. Stock indicators include text, and controls have labels and visible keyboard focus.
- No imagery, global state library, custom hook, or extra commerce features are needed for this exercise.
