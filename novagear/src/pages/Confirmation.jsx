import { Link } from "react-router-dom";

import { getItemMeta, isBundleItem } from "../utils/bundleItems";

const taxRate = 0.13;
const orderNumber = "NG-48219";

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function Confirmation({ cartItems }) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const estimatedTax = subtotal * taxRate;
  const total = subtotal + estimatedTax;

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-10 text-center shadow-sm lg:p-14">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-4xl font-black text-white">
          ✓
        </div>
        <p className="mt-6 text-sm font-black uppercase tracking-wide text-violet-700">
          Order {orderNumber}
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-zinc-950">
          Order Confirmed!
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
          Thanks for shopping with NovaGear. Your setup upgrade is locked in and
          getting ready for launch.
        </p>
        <p className="mt-4 font-black text-zinc-950">
          Estimated delivery: 3-5 business days.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 lg:p-9">
          <h2 className="text-3xl font-black tracking-tight text-zinc-950">
            Order Summary
          </h2>
          {cartItems.length > 0 ? (
            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 border-b border-zinc-200 pb-5 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <p className="font-black text-zinc-950">{item.name}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {getItemMeta(item)} / Qty {item.quantity}
                    </p>
                    {isBundleItem(item) && (
                      <p className="mt-2 text-sm font-semibold text-zinc-600">
                        Includes {item.products.map((product) => product.name).join(", ")}
                      </p>
                    )}
                  </div>
                  <p className="text-lg font-black text-zinc-950">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-600">
              This demo confirmation does not have cart items attached yet.
            </p>
          )}
        </section>

        <aside className="rounded-3xl bg-zinc-950 p-7 text-white shadow-sm">
          <h2 className="text-2xl font-black">Receipt</h2>
          <div className="mt-6 space-y-3 text-sm font-semibold">
            <div className="flex justify-between text-zinc-300">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-300">
              <span>Estimated tax</span>
              <span>{formatPrice(estimatedTax)}</span>
            </div>
            <div className="border-t border-white/15 pt-4">
              <div className="flex justify-between text-2xl font-black text-white">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-4 text-sm font-semibold text-zinc-300">
            <div className="flex justify-between gap-4">
              <span>Order number</span>
              <span className="font-black text-white">{orderNumber}</span>
            </div>
            <div className="mt-3 flex justify-between gap-4">
              <span>Status</span>
              <span className="font-black text-emerald-300">Processing</span>
            </div>
            <div className="mt-3 flex justify-between gap-4">
              <span>Delivery</span>
              <span className="font-black text-white">3-5 business days</span>
            </div>
          </div>

          <div className="mt-7 grid gap-3">
            <Link
              to="/products"
              className="flex justify-center rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>

      <section className="rounded-[2rem] bg-gradient-to-br from-violet-200 to-fuchsia-200 p-8 shadow-sm sm:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-violet-700">
              Post-Purchase Feedback
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-950">
              Help us improve your next upgrade.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-zinc-700">
              Now that your order is complete, you can leave quick feedback
              without interrupting the shopping or checkout process.
            </p>
          </div>
          <Link
            to="/survey"
            className="btn-primary-glow inline-flex justify-center rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Open Survey
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Confirmation;
