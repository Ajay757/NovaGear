import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { getItemMeta, isBundleItem } from "../utils/bundleItems";

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function FavouriteBundleCard({
  item,
  onAddBundleToCart,
  onToggleFavourite,
  isFavourite,
}) {
  return (
    <article className="flex flex-col rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-violet-700">
            {getItemMeta(item)}
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950">
            {item.name}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onToggleFavourite(item)}
          aria-label={`Remove ${item.name} from favourites`}
          aria-pressed={isFavourite(item.id)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-700 bg-violet-700 text-lg font-black text-white transition hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          ♥
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-600">{item.description}</p>

      <div className="mt-5 rounded-2xl bg-zinc-50 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Included products
        </p>
        <div className="mt-3 space-y-2">
          {item.products.map((product) => (
            <div
              key={product.id}
              className="flex justify-between gap-4 text-sm"
            >
              <span className="font-bold text-zinc-700">{product.name}</span>
              <span className="font-black text-zinc-950">
                {formatPrice(product.price)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-zinc-500">
            Regular{" "}
            <span className="line-through">{formatPrice(item.regularPrice)}</span>
          </p>
          <p className="mt-1 text-3xl font-black text-zinc-950">
            {formatPrice(item.price)}
          </p>
          <p className="text-sm font-black text-violet-700">
            Save {formatPrice(item.savings)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onAddBundleToCart(item)}
          className="btn-primary-glow rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          Add Bundle
        </button>
      </div>
    </article>
  );
}

function Favourites({
  favouriteItems,
  onAddToCart,
  onAddBundleToCart,
  onToggleFavourite,
  isFavourite,
}) {
  if (favouriteItems.length === 0) {
    return (
      <div className="space-y-10">
        <section className="rounded-[2rem] bg-white p-10 text-center shadow-sm sm:p-12">
          <div
            aria-hidden="true"
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-3xl font-black text-violet-700"
          >
            ♥
          </div>
          <p className="text-sm font-black uppercase tracking-wide text-violet-700">
            Favourites
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-zinc-950">
            Save gear you want to revisit.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            Tap the heart on any product to build a shortlist for your next
            setup upgrade.
          </p>
          <Link
            to="/products"
            className="btn-primary-glow mt-8 inline-flex rounded-full px-7 py-4 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Browse Products
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10 lg:p-12">
        <p className="text-sm font-black uppercase tracking-wide text-violet-700">
          Favourites
        </p>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-zinc-950">
              Your saved gear.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
              Keep track of products you like, compare your shortlist, and add
              anything to cart when you are ready.
            </p>
          </div>
          <p className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white">
            {favouriteItems.length} saved
          </p>
        </div>
      </section>

      <section aria-label="Favourite products and bundles">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {favouriteItems.map((item) =>
            isBundleItem(item) ? (
              <FavouriteBundleCard
                key={item.id}
                item={item}
                onAddBundleToCart={onAddBundleToCart}
                onToggleFavourite={onToggleFavourite}
                isFavourite={isFavourite}
              />
            ) : (
              <ProductCard
                key={item.id}
                product={item}
                onAddToCart={onAddToCart}
                onToggleFavourite={onToggleFavourite}
                isFavourite={isFavourite(item.id)}
              />
            ),
          )}
        </div>
      </section>
    </div>
  );
}

export default Favourites;
