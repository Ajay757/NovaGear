export function slugifyBundleName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function roundCurrency(value) {
  return Number(value.toFixed(2));
}

export function createBundleLineItem({
  id,
  bundleType,
  name,
  badge,
  description,
  price,
  regularPrice,
  savings,
  discount,
  products,
  code,
  perk,
}) {
  return {
    id,
    itemType: "bundle",
    bundleType,
    name,
    badge,
    description,
    price: roundCurrency(price),
    regularPrice: roundCurrency(regularPrice),
    savings: roundCurrency(savings),
    discount,
    products,
    code,
    perk,
  };
}

export function createPcBuildLineItem(build) {
  return createBundleLineItem({
    id: `pc-build-${slugifyBundleName(build.name)}`,
    bundleType: "PC Build",
    name: build.name,
    badge: build.badge,
    description: build.description,
    price: build.dealPrice,
    regularPrice: build.total,
    savings: build.savings,
    discount: build.discount,
    products: build.products,
    perk: build.useCase,
  });
}

export function createDealLineItem(campaign, products, totals) {
  return createBundleLineItem({
    id: `deal-${slugifyBundleName(campaign.name)}`,
    bundleType: "Deal",
    name: campaign.name,
    badge: campaign.label,
    description: campaign.description,
    price: totals.dealTotal,
    regularPrice: totals.regularTotal,
    savings: totals.savings,
    discount: campaign.discount,
    products,
    code: campaign.code,
    perk: campaign.perk,
  });
}

export function isBundleItem(item) {
  return item?.itemType === "bundle";
}

export function getItemMeta(item) {
  if (isBundleItem(item)) {
    const codeText = item.code ? ` / Code ${item.code}` : "";
    return `${item.bundleType}${codeText} / ${item.products.length} items`;
  }

  return `${item.brand} / ${item.category}`;
}
