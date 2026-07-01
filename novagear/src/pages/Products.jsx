import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import ProductDetailsModal from "../components/ProductDetailsModal";
import { products } from "../data/products";

const initialFilters = {
  categories: [],
  brands: [],
  priceRange: "all",
  connections: [],
  rgb: "all",
  rating: "0",
};

function getInitialFiltersFromSearch(searchParams) {
  const productId = Number(searchParams.get("product"));
  const selectedProduct = products.find((product) => product.id === productId);
  const category = searchParams.get("category");

  if (selectedProduct) {
    return {
      ...initialFilters,
      categories: [selectedProduct.category],
    };
  }

  if (!category) {
    return initialFilters;
  }

  return {
    ...initialFilters,
    categories: [category],
  };
}

function getUniqueValues(key) {
  return [...new Set(products.map((product) => product[key]))].sort();
}

function isInPriceRange(price, range) {
  if (range === "under100") {
    return price < 100;
  }

  if (range === "100to199") {
    return price >= 100 && price < 200;
  }

  if (range === "200plus") {
    return price >= 200;
  }

  return true;
}

function matchesSearch(product, searchTerm) {
  if (!searchTerm) {
    return true;
  }

  const normalizedSearch = searchTerm.toLowerCase();

  return [
    product.name,
    product.brand,
    product.category,
    product.connection,
    product.description,
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalizedSearch);
}

function Products({ onAddToCart, onToggleFavourite, isFavourite }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.trim() ?? "";
  const [filters, setFilters] = useState(() =>
    getInitialFiltersFromSearch(searchParams),
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    setFilters(getInitialFiltersFromSearch(searchParams));

    const productId = Number(searchParams.get("product"));
    const productFromUrl = products.find((product) => product.id === productId);
    setSelectedProduct(productFromUrl ?? null);
  }, [searchParams]);

  const filterOptions = useMemo(
    () => ({
      categories: getUniqueValues("category"),
      brands: getUniqueValues("brand"),
      connections: getUniqueValues("connection"),
    }),
    [],
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const categoryMatch =
          filters.categories.length === 0 ||
          filters.categories.includes(product.category);
        const brandMatch =
          filters.brands.length === 0 || filters.brands.includes(product.brand);
        const connectionMatch =
          filters.connections.length === 0 ||
          filters.connections.includes(product.connection);
        const priceMatch = isInPriceRange(product.price, filters.priceRange);
        const rgbMatch =
          filters.rgb === "all" ||
          (filters.rgb === "yes" && product.rgb) ||
          (filters.rgb === "no" && !product.rgb);
        const ratingMatch = product.rating >= Number(filters.rating);
        const searchMatch = matchesSearch(product, searchTerm);

        return (
          categoryMatch &&
          brandMatch &&
          connectionMatch &&
          priceMatch &&
          rgbMatch &&
          ratingMatch &&
          searchMatch
        );
      }),
    [filters, searchTerm],
  );

  const sortedProducts = useMemo(() => {
    const nextProducts = [...filteredProducts];

    if (sortBy === "priceLow") {
      return nextProducts.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "priceHigh") {
      return nextProducts.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      return nextProducts.sort((a, b) => b.rating - a.rating);
    }

    return nextProducts;
  }, [filteredProducts, sortBy]);

  function toggleFilter(group, value) {
    setFilters((currentFilters) => {
      const selected = currentFilters[group];
      const nextSelected = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      return {
        ...currentFilters,
        [group]: nextSelected,
      };
    });
  }

  function setFilter(group, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [group]: value,
    }));
  }

  function clearFilters() {
    setFilters(initialFilters);
  }

  function clearSearch() {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("search");
    setSearchParams(nextParams);
  }

  function closeProductDetails() {
    if (location.state?.returnTo) {
      navigate(location.state.returnTo);
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("product");
    setSelectedProduct(null);
    setSearchParams(nextParams);
  }

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10 lg:p-12">
        <p className="text-sm font-black uppercase tracking-wide text-violet-700">
          Products
        </p>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-zinc-950">
              Shop gaming gear
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
              Filter by category, brand, connection, RGB lighting, price, and
              rating{searchTerm ? ` while searching for "${searchTerm}".` : "."}
            </p>
          </div>
          <div
            aria-live="polite"
            className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white"
          >
            {sortedProducts.length} of {products.length} products
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
        <FilterSidebar
          filters={filters}
          options={filterOptions}
          onToggleFilter={toggleFilter}
          onSetFilter={setFilter}
          onClearFilters={clearFilters}
        />

        <section
          aria-labelledby="product-results-heading"
          className="space-y-6"
        >
          <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <h2 id="product-results-heading" className="font-black text-zinc-950">
              Showing {sortedProducts.length} result
              {sortedProducts.length === 1 ? "" : "s"}
              {searchTerm ? ` for "${searchTerm}"` : ""}
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex items-center gap-3 text-sm font-black text-zinc-700">
                Sort
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm font-bold text-zinc-950 outline-none focus:border-violet-500"
                >
                  <option value="featured">Featured</option>
                  <option value="priceLow">Price: low to high</option>
                  <option value="priceHigh">Price: high to low</option>
                  <option value="rating">Highest rated</option>
                </select>
              </label>
              <button
                type="button"
                onClick={clearFilters}
                aria-label="Clear all filters and show every product"
                className="btn-secondary-polish rounded-full border px-5 py-2.5 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                Clear filters
              </button>
              {searchTerm ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search query"
                  className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-black uppercase tracking-wide text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  Clear search
                </button>
              ) : null}
            </div>
          </div>

          {sortedProducts.length > 0 ? (
            <div
              aria-live="polite"
              className="grid gap-7 md:grid-cols-2 xl:grid-cols-3"
            >
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleFavourite={onToggleFavourite}
                  isFavourite={isFavourite(product.id)}
                />
              ))}
            </div>
          ) : (
            <div
              role="status"
              aria-live="polite"
              className="rounded-3xl border border-zinc-200 bg-white p-12 text-center shadow-sm"
            >
              <div
                aria-hidden="true"
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-2xl font-black text-violet-700"
              >
                ?
              </div>
              <h2 className="text-2xl font-black text-zinc-950">No gear found</h2>
              <p className="mt-3 text-zinc-600">
                {searchTerm
                  ? `No products match "${searchTerm}" right now. Try a different search or clear your filters.`
                  : "Clear a filter or widen your search to bring more upgrades back into view."}
              </p>
            </div>
          )}
        </section>
      </div>

      {selectedProduct ? (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={closeProductDetails}
          onAddToCart={onAddToCart}
          onToggleFavourite={onToggleFavourite}
          isFavourite={isFavourite(selectedProduct.id)}
        />
      ) : null}
    </div>
  );
}

export default Products;
