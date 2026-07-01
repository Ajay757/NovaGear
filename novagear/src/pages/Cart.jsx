import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { getItemMeta, isBundleItem } from "../utils/bundleItems";

const taxRate = 0.13;
const recommendedGear = products.slice(0, 3);

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function BundleContents({ item }) {
  return (
    <div className="mt-4 rounded-2xl bg-zinc-50 p-4">
      <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
        Included products
      </p>
      <div className="mt-3 grid gap-2">
        {item.products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="font-bold text-zinc-700">{product.name}</span>
            <span className="font-black text-zinc-950">
              {formatPrice(product.price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  onToggleFavourite,
  isFavourite,
}) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const estimatedTax = subtotal * taxRate;
  const total = subtotal + estimatedTax;

  if (cartItems.length === 0) {
    return (
      <div className="space-y-12">
        <section className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
          <div
            aria-hidden="true"
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-950 text-3xl font-black text-white"
          >
            +
          </div>
          <p className="text-sm font-black uppercase tracking-wide text-violet-700">
            Cart
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-zinc-950">
            Your cart is ready for gear.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            Start building your setup with keyboards, mice, headsets, monitors,
            controllers, and desk upgrades picked for smooth sessions.
          </p>
          <Link
            to="/products"
            className="btn-primary-glow mt-8 inline-flex rounded-full px-7 py-4 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Shop Products
          </Link>
        </section>

        <section aria-labelledby="recommended-gear-heading">
          <div className="mb-6">
            <p className="text-sm font-black uppercase tracking-wide text-violet-700">
              Recommended Gear
            </p>
            <h2
              id="recommended-gear-heading"
              className="mt-2 text-4xl font-black tracking-tight text-zinc-950"
            >
              Start with these setup staples.
            </h2>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {recommendedGear.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleFavourite={onToggleFavourite}
                isFavourite={isFavourite(product.id)}
              />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10 lg:p-12">
        <p className="text-sm font-black uppercase tracking-wide text-violet-700">
          Cart
        </p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-zinc-950">
              Review your loadout.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
              Tune quantities, remove anything you do not need, then head to
              checkout when your setup looks right.
            </p>
          </div>
          <p className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white">
            {cartItems.reduce((count, item) => count + item.quantity, 0)} items
          </p>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section aria-label="Cart items" className="space-y-5">
          {cartItems.map((item) => (
            <article
              key={item.id}
              aria-labelledby={`cart-item-${item.id}-title`}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <p className="text-sm font-bold text-zinc-500">
                    {getItemMeta(item)}
                  </p>
                  <h2
                    id={`cart-item-${item.id}-title`}
                    className="mt-2 text-2xl font-black tracking-tight text-zinc-950"
                  >
                    {item.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {item.description}
                  </p>
                  {isBundleItem(item) && <BundleContents item={item} />}
                </div>

                <div className="text-left md:text-right">
                  <p className="text-sm font-semibold text-zinc-500">
                    {isBundleItem(item) ? "Bundle price" : "Unit price"}
                  </p>
                  <p className="text-2xl font-black text-zinc-950">
                    {formatPrice(item.price)}
                  </p>
                  {isBundleItem(item) && (
                    <div className="mt-2 text-sm font-bold text-zinc-500">
                      <p>
                        Regular{" "}
                        <span className="line-through">
                          {formatPrice(item.regularPrice)}
                        </span>
                      </p>
                      <p className="text-violet-700">
                        Save {formatPrice(item.savings)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-zinc-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-zinc-600">
                    Quantity
                  </span>
                  <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-50">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-4 py-2 text-lg font-black text-zinc-700 hover:text-violet-700 focus:outline-none"
                      aria-label={`Decrease quantity for ${item.name}`}
                    >
                      -
                    </button>
                    <span
                      aria-live="polite"
                      aria-label={`${item.quantity} ${item.name} in cart`}
                      className="min-w-10 px-3 text-center font-black text-zinc-950"
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-4 py-2 text-lg font-black text-zinc-700 hover:text-violet-700 focus:outline-none"
                      aria-label={`Increase quantity for ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:items-end">
                  <p className="text-sm font-semibold text-zinc-600">
                    Line subtotal{" "}
                    <span className="text-lg font-black text-zinc-950">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="text-sm font-black uppercase tracking-wide text-zinc-500 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside
          aria-labelledby="cart-summary-heading"
          className="rounded-3xl bg-zinc-950 p-7 text-white shadow-sm lg:sticky lg:top-24 lg:self-start"
        >
          <h2 id="cart-summary-heading" className="text-2xl font-black">
            Order Summary
          </h2>
          <div className="mt-6 space-y-4 text-sm font-semibold">
            <div className="flex justify-between gap-4 text-zinc-300">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between gap-4 text-zinc-300">
              <span>Estimated tax</span>
              <span>{formatPrice(estimatedTax)}</span>
            </div>
            <div className="border-t border-white/15 pt-4">
              <div className="flex justify-between gap-4 text-2xl font-black text-white">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-7 flex w-full justify-center rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            Checkout
          </Link>
          <Link
            to="/products"
            className="mt-3 flex w-full justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-black uppercase tracking-wide text-white hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            Keep Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
