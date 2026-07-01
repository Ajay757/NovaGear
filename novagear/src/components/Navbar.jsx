import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { products } from "../data/products";

const links = [
  { to: "/products", label: "Shop" },
  { to: "/pc-builds", label: "PC Builds" },
  { to: "/deals", label: "Deals" },
];

function Icon({ name }) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </>
    ),
    heart: (
      <path d="M20 8.5c0 5.1-8 9.5-8 9.5s-8-4.4-8-9.5A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 8 3.5Z" />
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 20c1.5-4 13.5-4 15 0" />
      </>
    ),
    cart: (
      <>
        <path d="M4 5h2l2.2 10.2a2 2 0 0 0 2 1.6h6.9a2 2 0 0 0 1.9-1.4L21 9H8" />
        <circle cx="10" cy="21" r="1" />
        <circle cx="18" cy="21" r="1" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
    >
      {paths[name]}
    </svg>
  );
}

function Navbar({ cartItemCount, favouriteItemCount, accountUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const trimmedQuery = searchQuery.trim();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("search") ?? "");
  }, [location.search]);

  const searchSuggestions = useMemo(() => {
    if (trimmedQuery.length < 2) {
      return [];
    }

    const normalizedQuery = trimmedQuery.toLowerCase();

    return products
      .filter((product) =>
        [
          product.name,
          product.brand,
          product.category,
          product.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .slice(0, 5);
  }, [trimmedQuery]);

  function submitSearch(event) {
    event.preventDefault();

    if (!trimmedQuery) {
      navigate("/products");
      setShowSuggestions(false);
      return;
    }

    navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`);
    setShowSuggestions(false);
  }

  function chooseSuggestion(product) {
    navigate(`/products?search=${encodeURIComponent(product.name)}`);
    setSearchQuery(product.name);
    setShowSuggestions(false);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-300/80 bg-[#F3EFF8]/95 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8"
      >
        <Link
          to="/"
          className="group inline-flex items-center gap-3 text-2xl font-black tracking-tight text-zinc-950 hover:text-violet-700"
        >
          <span className="h-9 w-9 rounded-full bg-zinc-950 text-center text-lg leading-9 text-white transition group-hover:bg-violet-700">
            N
          </span>
          <span>NovaGear</span>
        </Link>

        <div className="flex flex-wrap gap-8 lg:mr-auto lg:ml-10">
          {links.map((link) => (
            link.to.startsWith("/") && !link.to.includes("#") ? (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-4 ${
                    isActive
                      ? "bg-zinc-950 text-white"
                      : "text-zinc-800 hover:text-violet-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="rounded-full px-3 py-1.5 text-lg font-bold text-zinc-800 hover:text-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-4"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <form
            role="search"
            aria-label="Product search"
            onSubmit={submitSearch}
            className="relative min-w-64"
          >
            <label htmlFor="site-product-search" className="sr-only">
              Search gear
            </label>
            <div className="flex items-center gap-3 rounded-full bg-zinc-100 px-4 py-2 text-zinc-950 focus-within:ring-2 focus-within:ring-violet-500">
              <input
                id="site-product-search"
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => window.setTimeout(() => setShowSuggestions(false), 120)}
                placeholder="Search gear"
                autoComplete="off"
                aria-controls="product-search-suggestions"
                aria-expanded={showSuggestions && trimmedQuery.length > 1}
                className="w-full bg-transparent text-sm font-bold text-zinc-950 outline-none placeholder:text-zinc-500"
              />
              <button
                type="submit"
                aria-label="Search products"
                className="text-zinc-950 hover:text-violet-700 focus:outline-none"
              >
                <Icon name="search" />
              </button>
            </div>

            {showSuggestions && trimmedQuery.length > 1 ? (
              <div
                id="product-search-suggestions"
                className="absolute right-0 top-full z-30 mt-3 w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl"
              >
                {searchSuggestions.length > 0 ? (
                  <ul className="py-2">
                    {searchSuggestions.map((product) => (
                      <li key={product.id}>
                        <button
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => chooseSuggestion(product)}
                          className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-violet-50 focus:bg-violet-50 focus:outline-none"
                        >
                          <span>
                            <span className="block text-sm font-black text-zinc-950">
                              {product.name}
                            </span>
                            <span className="block text-xs font-bold text-zinc-500">
                              {product.brand} / {product.category}
                            </span>
                          </span>
                          <span className="text-sm font-black text-violet-700">
                            ${product.price.toFixed(2)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-4 text-sm font-bold text-zinc-600">
                    No matching products found. Press Enter to search anyway.
                  </p>
                )}
              </div>
            ) : null}
          </form>
          <Link
            to="/favourites"
            aria-label={`${favouriteItemCount} saved favourite products`}
            className="relative text-zinc-950 hover:text-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <Icon name="heart" />
            <span
              aria-hidden="true"
              style={{ color: "#ffffff" }}
              className="absolute -right-3 -top-2 min-w-5 rounded-full bg-violet-700 px-1.5 py-0.5 text-center text-xs font-black text-white"
            >
              {favouriteItemCount}
            </span>
          </Link>
          <Link
            to="/account"
            aria-label={
              accountUser
                ? `Account for ${accountUser.fullName}`
                : "Log in or create an account"
            }
            className={`text-zinc-950 hover:text-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
              accountUser ? "text-violet-700" : ""
            }`}
          >
            <Icon name="user" />
          </Link>
          <Link
            to="/cart"
            aria-label={`${cartItemCount} items in cart`}
            className="relative text-zinc-950 hover:text-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <Icon name="cart" />
            <span
              aria-hidden="true"
              className="absolute -right-3 -top-2 min-w-5 rounded-full bg-violet-700 px-1.5 py-0.5 text-center text-xs font-black text-white"
            >
              {cartItemCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
