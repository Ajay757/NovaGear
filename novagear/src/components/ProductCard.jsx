import { useState } from "react";

import ProductDetailsModal from "./ProductDetailsModal";
import ProductVisual from "./ProductVisual";

function ProductCard({
  product,
  onAddToCart,
  onToggleFavourite,
  isFavourite = false,
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const titleId = `product-${product.id}-title`;
  const descriptionId = `product-${product.id}-description`;
  const badges = [
    product.sale ? "Sale" : null,
    product.connection === "Wireless" ? "Wireless" : null,
    product.rgb ? "RGB" : null,
  ].filter(Boolean);

  function openDetails() {
    setIsDetailsOpen(true);
  }

  function handleCardKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetails();
    }
  }

  return (
    <>
      <article
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onClick={openDetails}
        onKeyDown={handleCardKeyDown}
        className="interactive-card group relative flex h-full cursor-pointer flex-col rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-4"
      >
        {onToggleFavourite ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggleFavourite(product);
            }}
            aria-pressed={isFavourite}
            aria-label={
              isFavourite
                ? `Remove ${product.name} from favourites`
                : `Add ${product.name} to favourites`
            }
            className={`absolute right-8 top-8 z-10 flex h-11 w-11 items-center justify-center rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
              isFavourite
                ? "border-violet-200 bg-violet-700 text-white hover:bg-zinc-950"
                : "border-zinc-200 bg-white/95 text-zinc-950 hover:border-violet-300 hover:text-violet-700"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill={isFavourite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.3"
            >
              <path d="M20 8.5c0 5.1-8 9.5-8 9.5s-8-4.4-8-9.5A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 8 3.5Z" />
            </svg>
          </button>
        ) : null}
        <ProductVisual product={product} className="mb-6" />

        <div className="mb-4 flex min-h-7 flex-wrap gap-2">
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-zinc-700">
            {product.category}
          </span>
          {badges.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
                badge === "Sale"
                  ? "bg-violet-100 text-violet-800"
                  : "bg-zinc-100 text-zinc-700"
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        <p className="text-sm font-bold text-zinc-500">{product.brand}</p>
        <h3
          id={titleId}
          className="mt-2 text-xl font-black leading-tight tracking-tight text-zinc-950"
        >
          {product.name}
        </h3>
        <p id={descriptionId} className="mt-3 text-sm leading-6 text-zinc-600">
          {product.description}
        </p>

        <div className="mt-auto pt-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <p className="text-2xl font-black tracking-tight text-zinc-950">
              ${product.price.toFixed(2)}
            </p>
            <p
              aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}
              className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-black text-zinc-800"
            >
              {product.rating.toFixed(1)} / 5
            </p>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onAddToCart(product);
            }}
            aria-label={`Add ${product.name} to cart`}
            className="btn-primary-glow w-full rounded-full px-5 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white"
          >
            Add to Cart
          </button>
        </div>
      </article>

      {isDetailsOpen ? (
        <ProductDetailsModal
          product={product}
          onClose={() => setIsDetailsOpen(false)}
          onAddToCart={onAddToCart}
          onToggleFavourite={onToggleFavourite}
          isFavourite={isFavourite}
        />
      ) : null}
    </>
  );
}

export default ProductCard;
