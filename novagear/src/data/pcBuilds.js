import { products } from "./products";

export const buildConfigs = [
  {
    name: "Dorm Ready 1080p",
    badge: "Compact Starter",
    discount: 0.08,
    description:
      "A clean, space-conscious setup for school desks, casual gaming, and everyday productivity.",
    useCase: "Best for class, esports, and small rooms",
    productIds: [20, 11, 1, 5, 3, 6],
    highlights: ["Small footprint", "Fast 25-inch display", "Complete desk gear"],
  },
  {
    name: "1440p Competitive Core",
    badge: "Most Balanced",
    discount: 0.1,
    description:
      "A full gaming station built around a ready-to-play tower, OLED display, and low-latency accessories.",
    useCase: "Best for high-refresh gaming and streaming",
    productIds: [17, 30, 2, 4, 7, 9],
    highlights: ["RTX-class performance", "Premium display", "RGB desk setup"],
  },
  {
    name: "Creator + Gaming Station",
    badge: "Premium Build",
    discount: 0.12,
    description:
      "A stronger workstation-style bundle for multitasking, content creation, and polished gaming performance.",
    useCase: "Best for creative work, gaming, and multitasking",
    productIds: [18, 29, 8, 25, 27, 12],
    highlights: ["High-end desktop", "Curved QHD monitor", "Fast memory and storage"],
  },
  {
    name: "Parts Upgrade Kit",
    badge: "DIY Path",
    discount: 0.07,
    description:
      "Core internal parts for shoppers who want to upgrade an existing PC instead of buying a full tower.",
    useCase: "Best for rebuilding or refreshing a current setup",
    productIds: [21, 24, 25, 27, 28],
    highlights: ["GPU upgrade", "Gaming CPU", "Storage expansion"],
  },
];

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

export const pcBuilds = buildConfigs.map((build) => {
  const includedProducts = build.productIds.map(getProduct).filter(Boolean);
  const total = includedProducts.reduce((sum, product) => sum + product.price, 0);
  const dealPrice = total * (1 - build.discount);
  const savings = total - dealPrice;

  return {
    ...build,
    products: includedProducts,
    total,
    dealPrice,
    savings,
  };
});
