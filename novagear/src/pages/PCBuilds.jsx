import { Link } from "react-router-dom";

import ProductVisual from "../components/ProductVisual";
import { pcBuilds } from "../data/pcBuilds";
import { createPcBuildLineItem } from "../utils/bundleItems";

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function formatBestFor(useCase) {
  return useCase
    .replace("Best for ", "")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function PCBuilds({ onAddBundleToCart, onToggleFavourite, isFavourite }) {
  function addBuildToCart(build) {
    onAddBundleToCart(createPcBuildLineItem(build));
  }

  function toggleBuildFavourite(build) {
    onToggleFavourite(createPcBuildLineItem(build));
  }

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.26),transparent_22rem),linear-gradient(135deg,#111113,#20202A_48%,#F4F2F8)] p-8 text-white shadow-sm sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-violet-200">
              PC Builds
            </p>
            <h1 className="mt-3 max-w-3xl text-5xl font-black leading-none tracking-tight sm:text-6xl">
              Complete setups, not loose parts.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
              Choose a curated NovaGear build, then add the full bundle to cart
              in one click. Each build uses products already available in the
              shop, grouped by real setup goals.
            </p>
            <Link
              to="/pc-builds/compare"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-zinc-950 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              Compare Builds and Parts
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pcBuilds.slice(0, 4).map((build) => (
              <div
                key={build.name}
                className="rounded-3xl border border-white/10 bg-white/12 p-5 backdrop-blur"
              >
                <p className="text-xs font-black uppercase tracking-wide text-violet-200">
                  {build.badge}
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">
                  {build.name}
                </h2>
                <p className="mt-4 text-3xl font-black">
                  {formatPrice(build.dealPrice)}
                </p>
                <p className="mt-1 text-sm font-bold text-white/70 line-through">
                  {formatPrice(build.total)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="builds-heading" className="space-y-7">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-violet-700">
            Build Lineup
          </p>
          <h2
            id="builds-heading"
            className="mt-2 text-4xl font-black tracking-tight text-zinc-950"
          >
            Pick a setup path.
          </h2>
        </div>

        <div className="grid gap-8">
          {pcBuilds.map((build) => (
            <article
              key={build.name}
              className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm"
            >
              <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="bg-gradient-to-br from-zinc-950 via-violet-950 to-zinc-900 p-7 text-white sm:p-8">
                  <p className="inline-flex rounded-full bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-wide text-violet-100">
                    {build.badge}
                  </p>
                  <h3 className="mt-5 text-4xl font-black tracking-tight">
                    {build.name}
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-white/78">
                    {build.description}
                  </p>
                  <p className="mt-5 rounded-2xl bg-white/10 p-4 text-sm font-black uppercase tracking-wide text-white">
                    {build.useCase}
                  </p>

                  <div className="mt-6 grid gap-3">
                    {build.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-bold text-white/85"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-black uppercase tracking-wide text-zinc-500">
                        Build Deal
                      </p>
                      <div className="mt-2 flex flex-wrap items-end gap-3">
                        <p className="text-3xl font-black tracking-tight text-zinc-950">
                          {formatPrice(build.dealPrice)}
                        </p>
                        <p className="pb-1 text-lg font-black text-zinc-400 line-through">
                          {formatPrice(build.total)}
                        </p>
                      </div>
                      <p className="mt-2 inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-black text-violet-800">
                        Save {formatPrice(build.savings)} with this build
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => toggleBuildFavourite(build)}
                        aria-label={
                          isFavourite(createPcBuildLineItem(build).id)
                            ? `Remove ${build.name} from favourites`
                            : `Save ${build.name} to favourites`
                        }
                        aria-pressed={isFavourite(createPcBuildLineItem(build).id)}
                        className={`flex h-12 w-12 items-center justify-center rounded-full border text-xl font-black transition focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          isFavourite(createPcBuildLineItem(build).id)
                            ? "border-violet-700 bg-violet-700 text-white"
                            : "border-zinc-200 bg-white text-zinc-950 hover:border-violet-300 hover:bg-violet-50"
                        }`}
                      >
                        ♥
                      </button>
                      <button
                        type="button"
                        onClick={() => addBuildToCart(build)}
                        className="btn-primary-glow rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        Add Full Build
                      </button>
                    </div>
                  </div>

                  <div className="mt-7 rounded-3xl border border-violet-100 bg-violet-50 p-5">
                    <div className="grid gap-4 text-sm font-bold text-zinc-700 md:grid-cols-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
                          Included Items
                        </p>
                        <p className="mt-1 text-xl font-black text-zinc-950">
                          {build.products.length}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
                          Best For
                        </p>
                        <p className="mt-1 text-sm font-black leading-5 text-zinc-950">
                          {formatBestFor(build.useCase)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
                          Discount
                        </p>
                        <p className="mt-1 text-xl font-black text-zinc-950">
                          {Math.round(build.discount * 100)}% off
                        </p>
                      </div>
                      <Link
                        to="/pc-builds/compare"
                        className="btn-secondary-polish flex items-center justify-center rounded-full border px-4 py-3 text-center text-xs font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        Compare Parts
                      </Link>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {build.products.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products?product=${product.id}`}
                        state={{ returnTo: "/pc-builds" }}
                        className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4"
                      >
                        <ProductVisual product={product} compact className="h-40" />
                        <p className="mt-4 text-xs font-black uppercase tracking-wide text-violet-700">
                          {product.category}
                        </p>
                        <h4 className="mt-1 font-black leading-tight text-zinc-950">
                          {product.name}
                        </h4>
                        <p className="mt-2 text-sm font-bold text-zinc-500">
                          {formatPrice(product.price)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PCBuilds;
