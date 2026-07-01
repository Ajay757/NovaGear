const visualPalettes = {
  Keyboard: {
    background: "linear-gradient(135deg, #ddd6fe, #f5f3ff 48%, #ffffff)",
    glow: "rgba(139, 92, 246, 0.18)",
  },
  Mouse: {
    background: "linear-gradient(135deg, #bae6fd, #f0f9ff 48%, #ffffff)",
    glow: "rgba(14, 165, 233, 0.18)",
  },
  Headset: {
    background: "linear-gradient(135deg, #99f6e4, #f0fdfa 50%, #ffffff)",
    glow: "rgba(20, 184, 166, 0.18)",
  },
  Monitor: {
    background: "linear-gradient(135deg, #bfdbfe, #eff6ff 50%, #ffffff)",
    glow: "rgba(59, 130, 246, 0.18)",
  },
  Controller: {
    background: "linear-gradient(135deg, #bbf7d0, #f0fdf4 50%, #ffffff)",
    glow: "rgba(34, 197, 94, 0.18)",
  },
  Mousepad: {
    background: "linear-gradient(135deg, #e9d5ff, #faf5ff 50%, #ffffff)",
    glow: "rgba(168, 85, 247, 0.18)",
  },
  Laptop: {
    background: "linear-gradient(135deg, #c7d2fe, #eef2ff 50%, #ffffff)",
    glow: "rgba(99, 102, 241, 0.18)",
  },
  "Desktop PC": {
    background: "linear-gradient(135deg, #e2e8f0, #f8fafc 52%, #ffffff)",
    glow: "rgba(100, 116, 139, 0.2)",
  },
  "Graphics Card": {
    background: "linear-gradient(135deg, #fed7aa, #fff7ed 50%, #ffffff)",
    glow: "rgba(249, 115, 22, 0.2)",
  },
  Processor: {
    background: "linear-gradient(135deg, #fecaca, #fff1f2 50%, #ffffff)",
    glow: "rgba(239, 68, 68, 0.18)",
  },
  Memory: {
    background: "linear-gradient(135deg, #a7f3d0, #ecfdf5 50%, #ffffff)",
    glow: "rgba(16, 185, 129, 0.18)",
  },
  Storage: {
    background: "linear-gradient(135deg, #a5f3fc, #ecfeff 50%, #ffffff)",
    glow: "rgba(6, 182, 212, 0.18)",
  },
};

const productImages = {
  "NovaGear Phantom TKL": new URL(
    "../assets/products/novagear phantom keyboard tkl.jpg",
    import.meta.url,
  ).href,
  "Razer Viper V3 HyperSpeed": new URL(
    "../assets/products/Razer Viper V3 HyperSpeed.jpeg",
    import.meta.url,
  ).href,
  "Logitech G Pro X Lightspeed": new URL(
    "../assets/products/Logitech G Pro X Lightspeed.jpeg",
    import.meta.url,
  ).href,
  "SteelSeries Apex 7": new URL(
    "../assets/products/SteelSeries Apex 7.jpeg",
    import.meta.url,
  ).href,
  "HyperX Pulsefire Haste 2": new URL(
    "../assets/products/HyperX Pulsefire Haste 2.jpeg",
    import.meta.url,
  ).href,
  "NovaGear ArcPad XL": new URL(
    "../assets/products/NovaGear ArcPad XL.jpg",
    import.meta.url,
  ).href,
  "Razer Kaira Pro": new URL(
    "../assets/products/Razer Kaira Pro.jpeg",
    import.meta.url,
  ).href,
  "Logitech G923 Racing Wheel": new URL(
    "../assets/products/Logitech G923 Racing Wheel.jpeg",
    import.meta.url,
  ).href,
  "SteelSeries QcK Prism": new URL(
    "../assets/products/SteelSeries QcK Prism.jpeg",
    import.meta.url,
  ).href,
  "NovaGear Flux Controller": new URL(
    "../assets/products/NovaGear Flux Controller.jpeg",
    import.meta.url,
  ).href,
  "HyperX Armada 25": new URL(
    "../assets/products/HyperX Armada 25.jpeg",
    import.meta.url,
  ).href,
  "NovaGear Eclipse 27": new URL(
    "../assets/products/NovaGear Eclipse 27.jpeg",
    import.meta.url,
  ).href,
  "NovaGear Atlas 15": new URL(
    "../assets/products/NovaGear Atlas 15.jpeg",
    import.meta.url,
  ).href,
  "ASUS ROG Zephyr 14": new URL(
    "../assets/products/ASUS ROG Zephyr 14.jpeg",
    import.meta.url,
  ).href,
  "MSI Vector 16 HX": new URL(
    "../assets/products/MSI Vector 16 HX.jpeg",
    import.meta.url,
  ).href,
  "Lenovo Legion Slim 5": new URL(
    "../assets/products/Lenovo Legion Slim 5.jpeg",
    import.meta.url,
  ).href,
  "NovaGear Forge RTX 4070": new URL(
    "../assets/products/NovaGear Forge RTX 4070.jpeg",
    import.meta.url,
  ).href,
  "Corsair Vengeance i7400": new URL(
    "../assets/products/Corsair Vengeance i7400.jpeg",
    import.meta.url,
  ).href,
  "NZXT Player Two Prime": new URL(
    "../assets/products/NZXT Player Two Prime.jpeg",
    import.meta.url,
  ).href,
  "NovaGear Studio Mini": new URL(
    "../assets/products/NovaGear Studio Mini.jpeg",
    import.meta.url,
  ).href,
  "NVIDIA GeForce RTX 4070 Super": new URL(
    "../assets/products/NVIDIA GeForce RTX 4070 Super.jpeg",
    import.meta.url,
  ).href,
  "AMD Radeon RX 7800 XT": new URL(
    "../assets/products/AMD Radeon RX 7800 XT.jpeg",
    import.meta.url,
  ).href,
  "Intel Core i7-14700K": new URL(
    "../assets/products/Intel Core i7-14700K.jpeg",
    import.meta.url,
  ).href,
  "AMD Ryzen 7 7800X3D": new URL(
    "../assets/products/AMD Ryzen 7 7800X3D.jpeg",
    import.meta.url,
  ).href,
  "Corsair Vengeance RGB 32GB": new URL(
    "../assets/products/Corsair Vengeance RGB 32GB.jpeg",
    import.meta.url,
  ).href,
  "Kingston Fury Beast 32GB": new URL(
    "../assets/products/Kingston Fury Beast 32GB.jpeg",
    import.meta.url,
  ).href,
  "Samsung 990 Pro 2TB": new URL(
    "../assets/products/Samsung 990 Pro 2TB.jpeg",
    import.meta.url,
  ).href,
  "WD Black SN850X 1TB": new URL(
    "../assets/products/WD Black SN850X 1TB.jpeg",
    import.meta.url,
  ).href,
  "ASUS TUF 32 Curved QHD": new URL(
    "../assets/products/ASUS TUF 32 Curved QHD.jpeg",
    import.meta.url,
  ).href,
  "LG UltraGear OLED 27": new URL(
    "../assets/products/LG UltraGear OLED 27.jpeg",
    import.meta.url,
  ).href,
};

function renderProductShape(category) {
  switch (category) {
    case "Keyboard":
      return (
        <>
          <rect x="28" y="72" width="184" height="58" rx="12" />
          {Array.from({ length: 36 }).map((_, index) => {
            const row = Math.floor(index / 9);
            const column = index % 9;

            return (
              <rect
                key={index}
                x={45 + column * 17}
                y={86 + row * 9}
                width={11}
                height={6}
                rx="2"
              />
            );
          })}
          <rect x="69" y="122" width="86" height="6" rx="3" />
        </>
      );
    case "Mouse":
      return (
        <>
          <path d="M120 40c31 0 52 27 52 66 0 34-21 58-52 58s-52-24-52-58c0-39 21-66 52-66Z" />
          <path d="M120 44v50" />
          <path d="M99 67c7-12 14-19 21-23 7 4 14 11 21 23" />
          <circle cx="120" cy="96" r="6" />
        </>
      );
    case "Headset":
      return (
        <>
          <path
            d="M62 111c0-45 24-75 58-75s58 30 58 75h-16c0-35-17-58-42-58s-42 23-42 58H62Z"
            fill="rgba(13, 148, 136, 0.16)"
          />
          <rect x="47" y="100" width="36" height="48" rx="13" fill="#ffffff" />
          <rect x="157" y="100" width="36" height="48" rx="13" fill="#ffffff" />
          <path d="M174 139c-9 18-25 28-47 28" fill="none" />
          <circle cx="124" cy="166" r="6" />
        </>
      );
    case "Monitor":
      return (
        <>
          <rect x="38" y="42" width="164" height="94" rx="10" />
          <path d="M95 154h50" />
          <path d="M120 136v18" />
          <path d="M68 69h82" />
          <path d="M68 89h50" />
        </>
      );
    case "Laptop":
      return (
        <>
          <rect x="48" y="46" width="144" height="86" rx="9" />
          <path d="M34 148h172l-17-20H51l-17 20Z" />
          <path d="M75 71h74" />
          <path d="M75 91h42" />
        </>
      );
    case "Desktop PC":
      return (
        <>
          <rect x="66" y="34" width="108" height="132" rx="16" />
          <rect x="84" y="52" width="56" height="92" rx="10" fill="rgba(255,255,255,0.58)" />
          <path d="M154 54v90" fill="none" />
          <path d="M177 66h12M177 90h12M177 114h12" fill="none" />
          <circle cx="112" cy="102" r="22" />
          <circle cx="112" cy="102" r="8" />
          <path d="M91 156h58" fill="none" />
          <path d="M84 169h18M138 169h18" fill="none" />
        </>
      );
    case "Graphics Card":
      return (
        <>
          <rect x="38" y="66" width="164" height="70" rx="12" />
          <circle cx="88" cy="101" r="22" />
          <circle cx="150" cy="101" r="22" />
          <path d="M202 84h18v34h-18" />
          <path d="M52 145h96" />
        </>
      );
    case "Processor":
      return (
        <>
          <rect x="72" y="54" width="96" height="96" rx="14" />
          <rect x="92" y="74" width="56" height="56" rx="8" />
          <path d="M54 74h18M54 102h18M54 130h18M168 74h18M168 102h18M168 130h18" />
          <path d="M92 36v18M120 36v18M148 36v18M92 150v18M120 150v18M148 150v18" />
        </>
      );
    case "Memory":
      return (
        <>
          <rect x="36" y="78" width="168" height="50" rx="10" />
          <path d="M58 128v14M82 128v14M106 128v14M130 128v14M154 128v14M178 128v14" />
          <rect x="58" y="92" width="22" height="18" rx="3" />
          <rect x="92" y="92" width="22" height="18" rx="3" />
          <rect x="126" y="92" width="22" height="18" rx="3" />
          <rect x="160" y="92" width="22" height="18" rx="3" />
        </>
      );
    case "Storage":
      return (
        <>
          <rect x="58" y="58" width="124" height="92" rx="14" />
          <circle cx="91" cy="91" r="12" />
          <path d="M116 88h38" />
          <path d="M82 124h76" />
        </>
      );
    case "Controller":
      return (
        <>
          <path d="M70 76c18-11 36-4 50 8 14-12 32-19 50-8 16 9 23 32 28 58 3 15-11 25-24 16l-21-17H87l-21 17c-13 9-27-1-24-16 5-26 12-49 28-58Z" />
          <path d="M78 110h34" />
          <path d="M95 93v34" />
          <circle cx="153" cy="101" r="6" />
          <circle cx="172" cy="118" r="6" />
        </>
      );
    case "Mousepad":
      return (
        <>
          <path d="M43 78 182 51c14-3 27 6 30 20l12 55c3 14-6 27-20 30L65 183c-14 3-27-6-30-20L23 108c-3-14 6-27 20-30Z" />
          <path d="M52 95 185 70" fill="none" />
          <path d="M58 161 199 134" fill="none" />
          <path
            d="M158 113c17 0 29 13 29 31 0 15-12 26-29 26s-29-11-29-26c0-18 12-31 29-31Z"
            fill="#ffffff"
          />
          <path d="M158 116v24" fill="none" />
        </>
      );
    default:
      return <rect x="52" y="42" width="136" height="96" rx="18" />;
  }
}

function ProductVisual({ product, compact = false, circle = false, className = "" }) {
  const palette = visualPalettes[product.category] ?? visualPalettes.Keyboard;
  const productImage = productImages[product.name];

  return (
    <div
      data-product-visual
      role="img"
      aria-label={`${product.name} ${product.category} illustration`}
      style={{ background: palette.background }}
      className={`product-visual-shell relative isolate overflow-hidden ${circle ? "rounded-full" : "rounded-2xl"} ${compact ? "h-56" : "h-64"} ${className}`}
    >
      <div className="absolute inset-x-10 bottom-8 h-8 rounded-full bg-zinc-950/10 blur-xl" />
      <div
        style={{ backgroundColor: palette.glow }}
        className="absolute right-6 top-6 h-20 w-20 rounded-full blur-2xl"
      />
      {productImage ? (
        <img
          src={productImage}
          alt=""
          aria-hidden="true"
          className="relative z-10 h-full w-full object-contain p-5 mix-blend-multiply drop-shadow-[0_20px_24px_rgba(17,17,19,0.16)]"
        />
      ) : (
        <svg
          viewBox="0 0 240 190"
          aria-hidden="true"
          className="relative z-10 h-full w-full text-zinc-800 drop-shadow-[0_22px_24px_rgba(17,17,19,0.16)]"
          fill="rgba(255,255,255,0.92)"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        >
          {renderProductShape(product.category)}
        </svg>
      )}
    </div>
  );
}

export default ProductVisual;
