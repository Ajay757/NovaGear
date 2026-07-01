import { useEffect } from "react";

import ProductVisual from "./ProductVisual";

const detailCopy = {
  Keyboard: {
    facts: ["Mechanical switch feel", "Compact desk-friendly layout", "Built for faster key response"],
    accessories: ["Wrist rest", "Keycap puller", "USB-C cable", "Desk mat"],
    parts: ["Switch plate", "Keycaps", "Stabilizers", "Detachable cable"],
  },
  Mouse: {
    facts: ["Lightweight aim control", "Low-friction glide", "Responsive sensor tracking"],
    accessories: ["Mouse bungee", "Replacement skates", "Grip tape", "Large mousepad"],
    parts: ["Sensor", "Scroll wheel", "Primary switches", "Glide feet"],
  },
  Headset: {
    facts: ["Clear voice capture", "Comfortable ear cushioning", "Tuned for game audio"],
    accessories: ["USB dongle", "Audio cable", "Replacement ear pads", "Headset stand"],
    parts: ["Microphone", "Ear cups", "Headband", "Audio drivers"],
  },
  Monitor: {
    facts: ["Smooth motion clarity", "Wide desk visibility", "Sharp picture for gaming and work"],
    accessories: ["Monitor arm", "Display cable", "Screen cleaner", "Cable clips"],
    parts: ["Panel", "Stand", "Display inputs", "Power adapter"],
  },
  Controller: {
    facts: ["Comfortable grip shape", "Responsive triggers", "Console-style control"],
    accessories: ["Charging cable", "Wireless adapter", "Thumbstick caps", "Carrying case"],
    parts: ["Thumbsticks", "Triggers", "D-pad", "Face buttons"],
  },
  Mousepad: {
    facts: ["Smooth tracking surface", "Stable desk grip", "Sized for broad mouse movement"],
    accessories: ["Mouse skates", "Cable clips", "Keyboard wrist rest", "Cleaning cloth"],
    parts: ["Cloth surface", "Rubber base", "Stitched edge", "Control texture"],
  },
  Laptop: {
    facts: ["Portable gaming performance", "Fast display for daily play", "Ready for class and setup travel"],
    accessories: ["Laptop stand", "Cooling pad", "USB-C hub", "Travel sleeve"],
    parts: ["Display", "Keyboard deck", "Cooling system", "Storage drive"],
  },
  "Desktop PC": {
    facts: ["Ready-built performance", "Upgrade-friendly case", "Designed for airflow"],
    accessories: ["Gaming monitor", "Keyboard and mouse", "Surge protector", "Cable kit"],
    parts: ["GPU", "CPU", "Memory", "Storage", "Cooling fans"],
  },
  "Graphics Card": {
    facts: ["High-frame-rate graphics", "Built for modern games", "Supports creative workloads"],
    accessories: ["PCIe power cable", "GPU support bracket", "Display cable", "Anti-static strap"],
    parts: ["Cooling fans", "Heat sink", "Video memory", "Display outputs"],
  },
  Processor: {
    facts: ["Fast game logic performance", "Strong multitasking", "Good for streaming and editing"],
    accessories: ["CPU cooler", "Thermal paste", "Compatible motherboard", "Anti-static strap"],
    parts: ["CPU package", "Contact pads", "Cache", "Processing cores"],
  },
  Memory: {
    facts: ["Smooth multitasking", "Fast game asset loading", "Useful for modern builds"],
    accessories: ["Compatible motherboard", "Anti-static strap", "Cable combs", "Case lighting"],
    parts: ["Memory modules", "Heat spreader", "RGB light bar", "Gold contacts"],
  },
  Storage: {
    facts: ["Quick load times", "Room for game libraries", "Compact internal upgrade"],
    accessories: ["M.2 screw kit", "Heat sink", "External enclosure", "Anti-static strap"],
    parts: ["NAND flash", "Controller", "M.2 connector", "Label plate"],
  },
};

function createReviews(product) {
  const roundedRating = product.rating.toFixed(1);
  const reviewRatings = [
    Math.min(5, product.rating + 0.1),
    product.rating,
    Math.max(3.8, product.rating - 0.2),
  ];

  return [
    {
      name: "Alex M.",
      rating: reviewRatings[0],
      text: `${product.name} feels polished right away. The ${product.category.toLowerCase()} quality matches the ${roundedRating} rating.`,
    },
    {
      name: "Priya S.",
      rating: reviewRatings[1],
      text: `Easy to fit into my setup, and the ${product.connection.toLowerCase()} setup feels dependable during longer sessions.`,
    },
    {
      name: "Jordan K.",
      rating: reviewRatings[2],
      text: product.sale
        ? "Great value on sale. I would recommend it for anyone upgrading without overcomplicating their desk."
        : "A solid premium pick. The price feels fair for the build and day-to-day performance.",
    },
  ];
}

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function DetailList({ title, items }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
      <h3 className="text-sm font-black uppercase tracking-wide text-zinc-950">
        {title}
      </h3>
      <ul className="mt-4 space-y-2 text-sm font-semibold leading-6 text-zinc-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="text-violet-700">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
  onToggleFavourite,
  isFavourite,
}) {
  const details = detailCopy[product.category] ?? detailCopy.Keyboard;
  const reviews = createReviews(product);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`product-detail-${product.id}-title`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/55 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 text-2xl font-black text-zinc-950 hover:bg-zinc-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            ×
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <ProductVisual product={product} className="min-h-80" />

          <div>
            <p className="text-sm font-black uppercase tracking-wide text-violet-700">
              {product.brand} / {product.category}
            </p>
            <h2
              id={`product-detail-${product.id}-title`}
              className="mt-3 text-4xl font-black tracking-tight text-zinc-950"
            >
              {product.name}
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              {product.description} Selected for NovaGear shoppers who want a
              cleaner, more capable gaming setup without extra guesswork.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-zinc-100 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
                  Price
                </p>
                <p className="mt-1 text-2xl font-black text-zinc-950">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="rounded-2xl bg-zinc-100 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
                  Rating
                </p>
                <p className="mt-1 text-2xl font-black text-zinc-950">
                  {product.rating.toFixed(1)} / 5
                </p>
              </div>
              <div className="rounded-2xl bg-zinc-100 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
                  Setup
                </p>
                <p className="mt-1 text-lg font-black text-zinc-950">
                  {product.connection}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="btn-primary-glow rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                Add to Cart
              </button>
              {onToggleFavourite ? (
                <button
                  type="button"
                  onClick={() => onToggleFavourite(product)}
                  aria-pressed={isFavourite}
                  aria-label={
                    isFavourite
                      ? `Remove ${product.name} from favourites`
                      : `Add ${product.name} to favourites`
                  }
                  className={`flex h-12 w-12 items-center justify-center rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    isFavourite
                      ? "border-violet-200 bg-violet-700 text-white hover:bg-zinc-950"
                      : "border-zinc-200 bg-white text-zinc-950 hover:border-violet-300 hover:text-violet-700"
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
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <DetailList title="Quick Facts" items={details.facts} />
          <DetailList title="Accessories" items={details.accessories} />
          <DetailList title="Parts" items={details.parts} />
        </div>

        <section className="mt-8 rounded-3xl bg-zinc-950 p-6 text-white">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-violet-200">
                Reviews
              </p>
              <h3 className="mt-2 text-3xl font-black tracking-tight">
                What players are saying.
              </h3>
            </div>
            <p className="text-sm font-black text-white/80">
              Average {product.rating.toFixed(1)} / 5
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="rounded-3xl border border-white/10 bg-white/10 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-black">{review.name}</h4>
                  <p className="rounded-full bg-white px-3 py-1 text-xs font-black text-zinc-950">
                    {review.rating.toFixed(1)} / 5
                  </p>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/80">
                  {review.text}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductDetailsModal;
