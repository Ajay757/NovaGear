import { Link } from "react-router-dom";

import { pcBuilds } from "../data/pcBuilds";

const partOrder = [
  "Desktop PC",
  "Laptop",
  "Graphics Card",
  "Processor",
  "Memory",
  "Storage",
  "Monitor",
  "Keyboard",
  "Mouse",
  "Headset",
  "Controller",
  "Mousepad",
];

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function getPartForCategory(build, category) {
  return build.products.find((product) => product.category === category);
}

function getBuildScore(build) {
  const averageRating =
    build.products.reduce((sum, product) => sum + product.rating, 0) /
    build.products.length;

  return averageRating.toFixed(1);
}

function formatBestFor(useCase) {
  return useCase.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function PCBuildCompare() {
  return (
    <div className="space-y-10">
      <Link
        to="/pc-builds"
        className="btn-secondary-polish inline-flex rounded-full border px-5 py-3 text-sm font-black uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        ← Back to PC Builds
      </Link>

      <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10 lg:p-12">
        <p className="text-sm font-black uppercase tracking-wide text-violet-700">
          Build Comparison
        </p>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-zinc-950">
              Compare builds and parts.
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600">
              See what each NovaGear PC build includes, how the bundle pricing
              compares, and which parts separate one setup path from another.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="build-summary-heading"
        className="rounded-[2rem] bg-zinc-950 p-6 text-white shadow-sm sm:p-8"
      >
        <h2 id="build-summary-heading" className="text-3xl font-black">
          Build Snapshot
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[820px] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-xs font-black uppercase tracking-wide text-violet-200">
                <th className="border-b border-white/15 p-4">Build</th>
                <th className="border-b border-white/15 p-4">Best For</th>
                <th className="border-b border-white/15 p-4">Items</th>
                <th className="border-b border-white/15 p-4">Avg Rating</th>
                <th className="border-b border-white/15 p-4">Regular Cost</th>
                <th className="border-b border-white/15 p-4">Deal Price</th>
                <th className="border-b border-white/15 p-4">Savings</th>
              </tr>
            </thead>
            <tbody>
              {pcBuilds.map((build) => (
                <tr key={build.name} className="align-top text-sm font-bold">
                  <td className="border-b border-white/10 p-4">
                    <span className="block text-lg font-black text-white">
                      {build.name}
                    </span>
                    <span className="mt-1 block text-violet-200">{build.badge}</span>
                  </td>
                  <td className="border-b border-white/10 p-4 text-white/78">
                    {formatBestFor(build.useCase)}
                  </td>
                  <td className="border-b border-white/10 p-4">
                    {build.products.length}
                  </td>
                  <td className="border-b border-white/10 p-4">
                    {getBuildScore(build)} / 5
                  </td>
                  <td className="border-b border-white/10 p-4 text-white/65 line-through">
                    {formatPrice(build.total)}
                  </td>
                  <td className="border-b border-white/10 p-4 text-xl font-black">
                    {formatPrice(build.dealPrice)}
                  </td>
                  <td className="border-b border-white/10 p-4 text-violet-200">
                    {formatPrice(build.savings)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="parts-comparison-heading"
        className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8"
      >
        <h2
          id="parts-comparison-heading"
          className="text-3xl font-black tracking-tight text-zinc-950"
        >
          Parts by build.
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-zinc-600">
          Use this table when you care about exactly what is included. Empty
          slots mean that build is focused on a different type of setup.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[980px] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-xs font-black uppercase tracking-wide text-zinc-500">
                <th className="border-b border-zinc-200 bg-zinc-50 p-4">Part Type</th>
                {pcBuilds.map((build) => (
                  <th
                    key={build.name}
                    className="border-b border-zinc-200 bg-zinc-50 p-4"
                  >
                    {build.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {partOrder.map((category) => (
                <tr key={category} className="align-top">
                  <th className="border-b border-zinc-100 p-4 text-sm font-black text-zinc-950">
                    {category}
                  </th>
                  {pcBuilds.map((build) => {
                    const part = getPartForCategory(build, category);

                    return (
                      <td
                        key={`${build.name}-${category}`}
                        className="border-b border-zinc-100 p-4 text-sm"
                      >
                        {part ? (
                          <div>
                            <p className="font-black text-zinc-950">{part.name}</p>
                            <p className="mt-1 font-semibold text-zinc-500">
                              {part.brand} / {formatPrice(part.price)}
                            </p>
                            <p className="mt-1 font-bold text-violet-700">
                              {part.rating.toFixed(1)} / 5
                            </p>
                          </div>
                        ) : (
                          <span className="font-semibold text-zinc-400">
                            Not included
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default PCBuildCompare;
