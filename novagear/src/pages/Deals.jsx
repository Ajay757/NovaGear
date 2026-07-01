import { Link } from "react-router-dom";

import ProductVisual from "../components/ProductVisual";
import { products } from "../data/products";
import { createDealLineItem } from "../utils/bundleItems";

const dealCampaigns = [
  {
    name: "Clean Desk Control Kit",
    label: "Setup Bundle",
    code: "DESK18",
    discount: 0.18,
    productIds: [1, 2],
    description:
      "A keyboard and wireless mouse bundled for a cleaner daily gaming desk.",
    perk: "Best for a first desk upgrade or replacing mismatched peripherals.",
  },
  {
    name: "Console Night Bundle",
    label: "Living Room Deal",
    code: "COUCH14",
    discount: 0.14,
    productIds: [10, 7],
    description:
      "A wireless controller and console-ready headset for relaxed play away from the main desk.",
    perk: "Best for casual sessions, party games, and shared-space gaming.",
  },
  {
    name: "Display + Comms Upgrade",
    label: "Big Screen Deal",
    code: "PIXEL12",
    discount: 0.12,
    productIds: [29, 3, 2],
    description:
      "A curved QHD monitor, wireless headset, and fast wireless mouse for players upgrading their core competitive setup.",
    perk: "Best for improving visuals, aim, and team communication together.",
  },
  {
    name: "Portable Class-to-Game Kit",
    label: "Student Deal",
    code: "CAMPUS10",
    discount: 0.1,
    productIds: [13, 28, 5],
    description:
      "A slim gaming laptop, extra fast storage, and lightweight wired mouse for students moving between class and games.",
    perk: "Best for portable performance without buying a desktop setup.",
  },
];

const dealZones = [
  {
    title: "Small Upgrades",
    description: "Single-item picks under $100 for improving a setup without rebuilding it.",
    productIds: [5, 6, 9, 10],
  },
  {
    title: "Complete Desk Starters",
    description: "Core desk items customers commonly buy together when starting fresh.",
    productIds: [1, 2, 3, 6],
  },
  {
    title: "Builder Essentials",
    description: "Internal parts that make sense for a PC refresh or staged upgrade.",
    productIds: [22, 24, 26, 27],
  },
];

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

function getCampaignProducts(campaign) {
  return campaign.productIds.map(getProduct).filter(Boolean);
}

function getDealTotal(items, discount) {
  const regularTotal = items.reduce((total, product) => total + product.price, 0);
  const dealTotal = regularTotal * (1 - discount);

  return {
    regularTotal,
    dealTotal,
    savings: regularTotal - dealTotal,
  };
}

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function Deals({ onAddBundleToCart, onToggleFavourite, isFavourite }) {
  function createCampaignLineItem(campaign) {
    const items = getCampaignProducts(campaign);
    const totals = getDealTotal(items, campaign.discount);

    return createDealLineItem(campaign, items, totals);
  }

  function addCampaign(campaign) {
    onAddBundleToCart(createCampaignLineItem(campaign));
  }

  function toggleCampaignFavourite(campaign) {
    onToggleFavourite(createCampaignLineItem(campaign));
  }

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.38),transparent_18rem),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.34),transparent_24rem),linear-gradient(135deg,#111113,#2F183F_55%,#F8F5FF)] p-8 text-white shadow-sm sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-amber-200">
              Deals
            </p>
            <h1 className="mt-3 max-w-3xl text-5xl font-black leading-none tracking-tight sm:text-6xl">
              Offers built around how you upgrade.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
              This is not the regular shop shelf. Browse timed drops, coupon
              bundles, and curated deal zones that group gear by upgrade goal.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {dealCampaigns.map((campaign) => {
              const items = getCampaignProducts(campaign);
              const totals = getDealTotal(items, campaign.discount);

              return (
                <div
                  key={campaign.name}
                  className="rounded-3xl border border-white/10 bg-white/12 p-5 backdrop-blur"
                >
                  <p className="text-xs font-black uppercase tracking-wide text-amber-200">
                    {campaign.label}
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight">
                    {campaign.name}
                  </h2>
                  <p className="mt-4 text-3xl font-black">
                    {formatPrice(totals.dealTotal)}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white/70">
                    Code {campaign.code} / Save {formatPrice(totals.savings)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="campaign-heading" className="space-y-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-violet-700">
              Active Offers
            </p>
            <h2
              id="campaign-heading"
              className="mt-2 text-4xl font-black tracking-tight text-zinc-950"
            >
              Claim a curated deal.
            </h2>
          </div>
          <Link
            to="/products"
            className="btn-secondary-polish rounded-full border px-5 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Browse Full Shop
          </Link>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {dealCampaigns.map((campaign) => {
            const items = getCampaignProducts(campaign);
            const totals = getDealTotal(items, campaign.discount);
            const lineItem = createDealLineItem(campaign, items, totals);

            return (
              <article
                key={campaign.name}
                className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm"
              >
                <div className="border-b border-zinc-200 bg-gradient-to-br from-amber-100 via-white to-violet-100 p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="inline-flex rounded-full bg-zinc-950 px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
                        {campaign.label}
                      </p>
                      <h3 className="mt-4 text-3xl font-black tracking-tight text-zinc-950">
                        {campaign.name}
                      </h3>
                      <p className="mt-3 leading-7 text-zinc-600">
                        {campaign.description}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-white/80 p-5 text-right shadow-sm">
                      <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
                        Deal Price
                      </p>
                      <p className="mt-1 text-3xl font-black text-zinc-950">
                        {formatPrice(totals.dealTotal)}
                      </p>
                      <p className="mt-1 text-sm font-bold text-zinc-500">
                        <span className="line-through">
                          {formatPrice(totals.regularTotal)}
                        </span>{" "}
                        regular
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <p className="rounded-full bg-white px-4 py-2 text-sm font-black text-violet-800">
                      Code {campaign.code}
                    </p>
                    <p className="rounded-full bg-white px-4 py-2 text-sm font-black text-zinc-950">
                      Save {formatPrice(totals.savings)}
                    </p>
                    <p className="rounded-full bg-white px-4 py-2 text-sm font-black text-zinc-700">
                      {campaign.perk}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {items.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products?product=${product.id}`}
                        state={{ returnTo: "/deals" }}
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

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => toggleCampaignFavourite(campaign)}
                      aria-label={
                        isFavourite(lineItem.id)
                          ? `Remove ${campaign.name} from favourites`
                          : `Save ${campaign.name} to favourites`
                      }
                      aria-pressed={isFavourite(lineItem.id)}
                      className={`flex h-12 w-full items-center justify-center rounded-full border text-xl font-black transition focus:outline-none focus:ring-2 focus:ring-violet-500 sm:w-14 ${
                        isFavourite(lineItem.id)
                          ? "border-violet-700 bg-violet-700 text-white"
                          : "border-zinc-200 bg-white text-zinc-950 hover:border-violet-300 hover:bg-violet-50"
                      }`}
                    >
                      ♥
                    </button>
                    <button
                      type="button"
                      onClick={() => addCampaign(campaign)}
                      className="btn-primary-glow w-full rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      Add Deal Bundle
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="deal-zones-heading"
        className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8"
      >
        <p className="text-sm font-black uppercase tracking-wide text-violet-700">
          Deal Zones
        </p>
        <h2
          id="deal-zones-heading"
          className="mt-2 text-4xl font-black tracking-tight text-zinc-950"
        >
          Shop offers by intent.
        </h2>

        <div className="mt-7 grid gap-6 lg:grid-cols-3">
          {dealZones.map((zone) => (
            <article
              key={zone.title}
              className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5"
            >
              <h3 className="text-2xl font-black tracking-tight text-zinc-950">
                {zone.title}
              </h3>
              <p className="mt-3 leading-7 text-zinc-600">{zone.description}</p>
              <div className="mt-5 space-y-3">
                {zone.productIds.map(getProduct).filter(Boolean).map((product) => (
                  <Link
                    key={product.id}
                    to={`/products?product=${product.id}`}
                    state={{ returnTo: "/deals" }}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-zinc-700 hover:text-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <span>{product.name}</span>
                    <span className="font-black text-zinc-950">
                      {formatPrice(product.price)}
                    </span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Deals;
