import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import heroImage from "../assets/hero-setup.svg";
import ProductCard from "../components/ProductCard";
import ProductVisual from "../components/ProductVisual";
import { products } from "../data/products";

const categories = [
  {
    name: "Keyboards",
    productCategory: "Keyboard",
    description: "Precise, comfortable boards for faster desk setups.",
  },
  {
    name: "Mice",
    productCategory: "Mouse",
    description: "Lightweight control for clean tracking and quick reactions.",
  },
  {
    name: "Headsets",
    productCategory: "Headset",
    description: "Clear audio and comms for focused play.",
  },
  {
    name: "Monitors",
    productCategory: "Monitor",
    description: "Smooth displays that make every upgrade feel immediate.",
  },
  {
    name: "Controllers",
    productCategory: "Controller",
    description: "Console-style control for relaxed and precise sessions.",
  },
  {
    name: "Mousepads",
    productCategory: "Mousepad",
    description: "Desk surfaces made for smoother movement and cleaner setups.",
  },
  {
    name: "Laptops",
    productCategory: "Laptop",
    description: "Portable gaming systems for class, work, and late-night matches.",
  },
  {
    name: "Gaming PCs",
    productCategory: "Desktop PC",
    description: "Ready-built towers with clean airflow and upgrade paths.",
  },
  {
    name: "PC Parts",
    productCategory: "Graphics Card",
    description: "Core upgrades for faster frames, storage, and multitasking.",
  },
];

const bundleDeals = [
  {
    name: "Clean Desk Control Kit",
    items: "TKL keyboard, wireless mouse",
    price: "$180.38",
  },
  {
    name: "Console Night Bundle",
    items: "Wireless controller and Headset",
    price: "$193.48",
  },
  {
    name: "Portable Class-to-Game Kit",
    items: "Laptop, Storage, Mouse",
    price: "$1331.97",
  },
];

const featuredProductIds = [13, 17, 30, 21];
const featuredProducts = featuredProductIds.map((id) =>
  products.find((product) => product.id === id),
).filter(Boolean);

const performanceStats = [
  {
    title: "Fast response",
    description: "Low-latency gear keeps inputs feeling direct and dependable.",
  },
  {
    title: "Comfort-first design",
    description: "Shapes, surfaces, and controls are selected for long sessions.",
  },
  {
    title: "Setup-ready gear",
    description: "Accessories are easy to compare, choose, and add to your desk.",
  },
];

const visibleCategoryCount = 4;
const categoryTileStep = 274;

function Home({ onAddToCart, onToggleFavourite, isFavourite }) {
  const [categoryStart, setCategoryStart] = useState(0);
  const categoryTrackRef = useRef(null);
  const maxCategoryStart = categories.length - visibleCategoryCount;
  const isAtCategoryStart = categoryStart === 0;
  const isAtCategoryEnd = categoryStart === maxCategoryStart;

  function scrollCategories(nextIndex) {
    setCategoryStart(nextIndex);
    categoryTrackRef.current?.scrollTo({
      left: nextIndex * categoryTileStep,
      behavior: "smooth",
    });
  }

  function showPreviousCategories() {
    scrollCategories(Math.max(categoryStart - 1, 0));
  }

  function showNextCategories() {
    scrollCategories(Math.min(categoryStart + 1, maxCategoryStart));
  }

  return (
    <div className="space-y-20">
      <section className="grid min-h-[680px] items-center gap-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-200 via-fuchsia-50 to-cyan-200 p-8 shadow-sm sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
        <div>
          <p className="mb-5 text-sm font-black uppercase tracking-wide text-violet-700">
            NovaGear
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-none tracking-tight text-zinc-950 sm:text-7xl">
            Gear that keeps up with your game.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Clean, responsive accessories for focused play, daily work, and
            every setup in between.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="btn-primary-glow rounded-full px-7 py-4 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Shop Now
            </Link>
            <Link
              to="/deals"
              className="btn-secondary-polish rounded-full border px-7 py-4 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Explore Deals
            </Link>
          </div>
        </div>

        <div className="relative flex min-h-[360px] items-center justify-center rounded-[2rem] bg-white/65 p-8">
          <div className="absolute inset-x-12 bottom-12 h-12 rounded-full bg-zinc-950/10 blur-2xl" />
          <img
            src={heroImage}
            alt="Clean NovaGear gaming setup with monitor, keyboard, mouse, and PC tower"
            className="relative max-h-[420px] w-full object-contain drop-shadow-[0_28px_35px_rgba(17,17,19,0.18)]"
          />
        </div>
      </section>

      <section
        aria-labelledby="featured-products-heading"
        className="rounded-[2rem] bg-gradient-to-br from-violet-100 to-fuchsia-100 p-6 shadow-sm sm:p-8 lg:p-10"
      >
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-violet-700">
              Featured Products
            </p>
            <h2
              id="featured-products-heading"
              className="mt-2 text-4xl font-black tracking-tight text-zinc-950"
            >
              Popular setup upgrades.
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-black uppercase tracking-wide text-zinc-950 hover:text-violet-700"
          >
            View full catalog
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
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

      <section className="rounded-[2rem] bg-gradient-to-br from-emerald-100 via-cyan-50 to-sky-100 p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-violet-700">
              Shop by Category
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-zinc-950">
              Build your setup by gear type.
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={showPreviousCategories}
              disabled={isAtCategoryStart}
              aria-label="Show previous product categories"
              className="h-12 w-12 rounded-full bg-white text-2xl font-black text-zinc-950 shadow-sm hover:bg-zinc-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:cursor-not-allowed disabled:bg-white/50 disabled:text-zinc-400 disabled:hover:bg-white/50"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={showNextCategories}
              disabled={isAtCategoryEnd}
              aria-label="Show next product categories"
              className="h-12 w-12 rounded-full bg-zinc-950 text-2xl font-black text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:hover:bg-zinc-300"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={categoryTrackRef}
          className="mx-auto max-w-[1072px] overflow-hidden scroll-smooth"
        >
          <div className="flex gap-6 pb-2">
            {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.productCategory)}`}
              aria-label={`Shop ${category.name}`}
              className="group min-w-[250px] text-center focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-4"
            >
              <div className="interactive-card mx-auto flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-white shadow-sm">
                <ProductVisual
                  product={{ name: category.name, category: category.productCategory }}
                  compact
                  circle
                  className="h-full w-full"
                />
              </div>
              <h3 className="mt-5 text-2xl font-black tracking-tight text-zinc-950">
                {category.name}
              </h3>
              <p className="mx-auto mt-3 max-w-[210px] leading-7 text-zinc-600">
                {category.description}
              </p>
            </Link>
          ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.32),transparent_24rem),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.34),transparent_22rem),linear-gradient(135deg,#063F3B,#0F2F4A_48%,#24114F)] p-8 text-white shadow-sm sm:p-10 lg:p-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-wide text-violet-200">
            Everyday Performance
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            Built for everyday performance.
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/80">
            We focus on practical details that make your setup feel cleaner,
            faster, and easier to use every day.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {performanceStats.map((stat) => (
            <article
              key={stat.title}
              className="rounded-3xl border border-white/15 bg-white/14 p-7 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur"
            >
              <h3 className="text-2xl font-black tracking-tight">{stat.title}</h3>
              <p className="mt-4 leading-7 text-white/78">{stat.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="deals"
        className="scroll-mt-28 rounded-[2rem] bg-gradient-to-br from-zinc-950 via-violet-950 to-zinc-900 p-8 text-white sm:p-10 lg:p-14"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-violet-300">
              Deals
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Cleaner gear. Better sessions. Less clutter.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {bundleDeals.map((bundle) => (
              <div
                key={bundle.name}
                className="rounded-3xl border border-white/10 bg-white/8 p-6 text-base leading-7 text-zinc-200"
              >
                <h3 className="text-xl font-black tracking-tight text-white">
                  {bundle.name}
                </h3>
                <p className="mt-3 font-semibold">{bundle.items}</p>
                <p className="mt-5 text-2xl font-black text-white">
                  {bundle.price}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Link
          to="/deals"
          className="mt-9 inline-flex rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-zinc-950 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-300"
        >
          See Current Deals
        </Link>
      </section>
    </div>
  );
}

export default Home;
