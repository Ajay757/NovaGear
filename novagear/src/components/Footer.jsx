import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Products",
    items: ["Laptops", "Gaming PCs", "Monitors", "PC Parts", "Accessories"],
  },
  {
    title: "Support",
    items: ["Order Help", "Warranty", "Setup Guide", "Contact"],
  },
  {
    title: "Company",
    items: ["About NovaGear", "Sustainability", "Accessibility", "Privacy Policy"],
  },
];

function Footer() {
  return (
    <footer className="mt-10 border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 text-sm text-zinc-600 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.4fr]">
          <div>
            <p className="text-2xl font-black tracking-tight text-zinc-950">
              NovaGear
            </p>
            <p className="mt-2 text-sm font-bold text-violet-700">
              Level Up Your Setup.
            </p>
            <p className="mt-4 max-w-sm leading-7">
              Clean, performance-focused gaming accessories for focused,
              comfortable play.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/survey"
                className="btn-secondary-polish rounded-full border px-5 py-3 text-sm font-black uppercase tracking-wide"
              >
                Feedback
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerSections.map((section) => (
              <section key={section.title} aria-labelledby={`footer-${section.title}`}>
                <h2
                  id={`footer-${section.title}`}
                  className="text-sm font-black uppercase tracking-wide text-zinc-950"
                >
                  {section.title}
                </h2>
                <ul className="mt-4 space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="leading-6">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <section aria-labelledby="footer-newsletter">
              <h2
                id="footer-newsletter"
                className="text-sm font-black uppercase tracking-wide text-zinc-950"
              >
                Newsletter
              </h2>
              <p className="mt-4 leading-6">
                Get product drops, setup ideas, and student-friendly deals.
              </p>
              <form className="mt-4 flex rounded-full border border-zinc-200 bg-zinc-50 p-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email address"
                  className="min-w-0 flex-1 rounded-full bg-transparent px-3 py-2 text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-black uppercase tracking-wide text-white hover:bg-violet-700"
                >
                  Join
                </button>
              </form>
            </section>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-zinc-200 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 NovaGear. All rights reserved.</p>
          <p>support@novagear.example</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
